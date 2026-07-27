import { DocumentCreatedFromDirectTemplateEmailTemplate } from '../../../../email/templates/document-created-from-direct-template.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../../constants/app.js';
import { getEmailContext } from '../../../server-only/email/get-email-context.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';
import { formatDocumentsPath } from '../../../utils/teams.js';

const run = async ({
  payload
}) => {
  const {
    envelopeId,
    recipientId
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      id: envelopeId
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
      team: {
        select: {
          url: true
        }
      },
      documentMeta: true
    }
  });
  if (!envelope) {
    throw new Error('Envelope not found');
  }
  if (envelope.recipients.length === 0) {
    throw new Error('Recipient not found');
  }
  const [recipient] = envelope.recipients;
  const {
    user: templateOwner
  } = envelope;
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
  const documentLink = `${NEXT_PUBLIC_WEBAPP_URL()}${formatDocumentsPath(envelope.team?.url ?? '')}/${envelope.id}`;
  const emailTemplate = /*#__PURE__*/createElement(DocumentCreatedFromDirectTemplateEmailTemplate, {
    recipientName: recipient.email,
    recipientRole: recipient.role,
    documentLink,
    documentName: envelope.title,
    assetBaseUrl
  });
  const i18n = await getI18nInstance(emailLanguage);
  const [html, text] = await Promise.all([renderEmailWithI18N(emailTemplate, {
    lang: emailLanguage,
    branding
  }), renderEmailWithI18N(emailTemplate, {
    lang: emailLanguage,
    branding,
    plainText: true
  })]);
  await emailTransport.sendMail({
    to: [{
      name: templateOwner.name || '',
      address: templateOwner.email
    }],
    from: senderEmail,
    subject: i18n._(
    /*i18n*/
    {
      id: "XiDxHt"
    }),
    html,
    text
  });
};

export { run };
//# sourceMappingURL=send-document-created-from-direct-template-email.handler.js.map
