import { RecipientExpiredTemplate } from '../../../../email/templates/recipient-expired.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../../constants/app.js';
import { getEmailContext } from '../../../server-only/email/get-email-context.js';
import { extractDerivedDocumentEmailSettings } from '../../../types/document-email.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';
import { formatDocumentsPath } from '../../../utils/teams.js';

const run = async ({
  payload,
  io
}) => {
  const {
    recipientId,
    envelopeId
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      id: envelopeId
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      documentMeta: true,
      team: {
        select: {
          teamEmail: true,
          name: true,
          url: true
        }
      }
    }
  });
  if (!envelope) {
    throw new Error(`Envelope ${envelopeId} not found`);
  }
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      id: recipientId,
      envelopeId
    }
  });
  if (!recipient) {
    throw new Error(`Recipient ${recipientId} not found on envelope ${envelopeId}`);
  }
  const {
    documentMeta,
    user: documentOwner
  } = envelope;
  const isEmailEnabled = extractDerivedDocumentEmailSettings(documentMeta).ownerRecipientExpired;
  if (!isEmailEnabled) {
    return;
  }
  const {
    branding,
    emailLanguage,
    senderEmail,
    emailsDisabled,
    emailTransport
  } = await getEmailContext({
    emailType: 'RECIPIENT',
    source: {
      type: 'team',
      teamId: envelope.teamId
    },
    meta: documentMeta
  });
  // Don't send any emails if the organisation has email sending disabled.
  if (emailsDisabled) {
    return;
  }
  const i18n = await getI18nInstance(emailLanguage);
  const documentLink = `${NEXT_PUBLIC_WEBAPP_URL()}${formatDocumentsPath(envelope.team.url)}/${envelope.id}`;
  const template = /*#__PURE__*/createElement(RecipientExpiredTemplate, {
    documentName: envelope.title,
    recipientName: recipient.name || recipient.email,
    recipientEmail: recipient.email,
    documentLink,
    assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL()
  });
  await io.runTask('send-owner-recipient-expired-email', async () => {
    const [html, text] = await Promise.all([renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding
    }), renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding,
      plainText: true
    })]);
    await emailTransport.sendMail({
      to: {
        name: documentOwner.name || '',
        address: documentOwner.email
      },
      from: senderEmail,
      subject: i18n._(
      /*i18n*/
      {
        id: "9pcLFb",
        values: {
          0: recipient.name || recipient.email,
          1: envelope.title
        }
      }),
      html,
      text
    });
  });
};

export { run };
//# sourceMappingURL=send-owner-recipient-expired-email.handler.js.map
