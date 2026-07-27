import { DocumentPendingEmailTemplate } from '../../../../email/templates/document-pending.js';
import { unsafeBuildEnvelopeIdQuery } from '../../../utils/envelope.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../../constants/app.js';
import { getEmailContext } from '../../../server-only/email/get-email-context.js';
import { extractDerivedDocumentEmailSettings } from '../../../types/document-email.js';
import { isRecipientEmailValidForSending } from '../../../utils/recipients.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';

const run = async ({
  payload
}) => {
  const {
    envelopeId,
    recipientId
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      ...unsafeBuildEnvelopeIdQuery({
        type: 'envelopeId',
        id: envelopeId
      }, EnvelopeType.DOCUMENT),
      recipients: {
        some: {
          id: recipientId
        }
      }
    },
    include: {
      recipients: {
        where: {
          id: recipientId
        }
      },
      documentMeta: true
    }
  });
  if (!envelope || envelope.recipients.length === 0) {
    return;
  }
  const {
    branding,
    emailLanguage,
    senderEmail,
    replyToEmail,
    emailsDisabled,
    emailTransport
  } = await getEmailContext({
    emailType: 'RECIPIENT',
    source: {
      type: 'team',
      teamId: envelope.teamId
    },
    meta: envelope.documentMeta
  });
  // Don't send any emails if the organisation has email sending disabled.
  if (emailsDisabled) {
    return;
  }
  const isDocumentPendingEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).documentPending;
  if (!isDocumentPendingEmailEnabled) {
    return;
  }
  const [recipient] = envelope.recipients;
  const {
    email,
    name
  } = recipient;
  // Skip sending email if recipient has no email address
  if (!isRecipientEmailValidForSending(recipient)) {
    return;
  }
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';
  const template = /*#__PURE__*/createElement(DocumentPendingEmailTemplate, {
    documentName: envelope.title,
    assetBaseUrl
  });
  const [html, text] = await Promise.all([renderEmailWithI18N(template, {
    lang: emailLanguage,
    branding
  }), renderEmailWithI18N(template, {
    lang: emailLanguage,
    branding,
    plainText: true
  })]);
  const i18n = await getI18nInstance(emailLanguage);
  await emailTransport.sendMail({
    to: {
      address: email,
      name
    },
    from: senderEmail,
    replyTo: replyToEmail,
    subject: i18n._(
    /*i18n*/
    {
      id: "nCH0KD"
    }),
    html,
    text
  });
};

export { run };
//# sourceMappingURL=send-document-pending-email.handler.js.map
