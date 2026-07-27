import { DocumentSuperDeleteEmailTemplate } from '../../../email/templates/document-super-delete.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { createElement } from 'react';
import { getI18nInstance } from '../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { extractDerivedDocumentEmailSettings } from '../../types/document-email.js';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n.js';
import { getEmailContext } from '../email/get-email-context.js';

// Note: Currently only sent by Admin function
const sendDeleteEmail = async ({
  envelopeId,
  reason
}) => {
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
      documentMeta: true
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Document not found'
    });
  }
  const isDocumentDeletedEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).documentDeleted;
  if (!isDocumentDeletedEmailEnabled) {
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
  const {
    email,
    name
  } = envelope.user;
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';
  const template = /*#__PURE__*/createElement(DocumentSuperDeleteEmailTemplate, {
    documentName: envelope.title,
    reason,
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
      name: name || ''
    },
    from: senderEmail,
    subject: i18n._(
    /*i18n*/
    {
      id: "kNNH2n"
    }),
    html,
    text
  });
};

export { sendDeleteEmail };
//# sourceMappingURL=send-delete-email.js.map
