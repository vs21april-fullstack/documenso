import { DocumentRecipientSignedEmailTemplate } from '../../../../email/templates/document-recipient-signed.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../../constants/app.js';
import { getEmailContext } from '../../../server-only/email/get-email-context.js';
import { extractDerivedDocumentEmailSettings } from '../../../types/document-email.js';
import { unsafeBuildEnvelopeIdQuery } from '../../../utils/envelope.js';
import { isRecipientEmailValidForSending } from '../../../utils/recipients.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';

const run = async ({
  payload,
  io
}) => {
  const {
    documentId,
    recipientId
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      ...unsafeBuildEnvelopeIdQuery({
        type: 'documentId',
        id: documentId
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
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      documentMeta: true
    }
  });
  if (!envelope) {
    throw new Error('Document not found');
  }
  if (envelope.recipients.length === 0) {
    throw new Error('Document has no recipients');
  }
  const isRecipientSignedEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).recipientSigned;
  if (!isRecipientSignedEmailEnabled) {
    return;
  }
  const [recipient] = envelope.recipients;
  const {
    email: recipientEmail,
    name: recipientName
  } = recipient;
  const {
    user: owner
  } = envelope;
  const recipientReference = recipientName || recipientEmail;
  // Don't send notification if the owner is the one who signed.
  if (owner.email === recipientEmail || !isRecipientEmailValidForSending(recipient)) {
    return;
  }
  const {
    branding,
    emailLanguage,
    senderEmail,
    emailTransport
  } = await getEmailContext({
    emailType: 'INTERNAL',
    source: {
      type: 'team',
      teamId: envelope.teamId
    },
    meta: envelope.documentMeta
  });
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';
  const i18n = await getI18nInstance(emailLanguage);
  const template = /*#__PURE__*/createElement(DocumentRecipientSignedEmailTemplate, {
    documentName: envelope.title,
    recipientName,
    recipientEmail,
    assetBaseUrl
  });
  await io.runTask('send-recipient-signed-email', async () => {
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
        name: owner.name ?? '',
        address: owner.email
      },
      from: senderEmail,
      subject: i18n._(
      /*i18n*/
      {
        id: "5tKJAh",
        values: {
          0: envelope.title,
          recipientReference: recipientReference
        }
      }),
      html,
      text
    });
  });
};

export { run };
//# sourceMappingURL=send-recipient-signed-email.handler.js.map
