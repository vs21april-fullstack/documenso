import { DocumentCancelTemplate } from '../../../email/templates/document-cancel.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { DocumentStatus, SendStatus } from '@prisma/client';
import { createElement } from 'react';
import { getI18nInstance } from '../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { extractDerivedDocumentEmailSettings } from '../../types/document-email.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { isRecipientEmailValidForSending } from '../../utils/recipients.js';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n.js';
import { getEmailContext } from '../email/get-email-context.js';

const adminSuperDeleteDocument = async ({
  envelopeId,
  requestMetadata
}) => {
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: {
      id: envelopeId
    },
    include: {
      recipients: true,
      documentMeta: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Document not found'
    });
  }
  const {
    branding,
    settings,
    senderEmail,
    replyToEmail,
    emailTransport
  } = await getEmailContext({
    emailType: 'RECIPIENT',
    source: {
      type: 'team',
      teamId: envelope.teamId
    },
    meta: envelope.documentMeta
  });
  const {
    status,
    user
  } = envelope;
  const isDocumentDeletedEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).documentDeleted;
  const recipientsToNotify = envelope.recipients.filter(recipient => isRecipientEmailValidForSending(recipient));
  // if the document is pending, send cancellation emails to all recipients
  if (status === DocumentStatus.PENDING && recipientsToNotify.length > 0 && isDocumentDeletedEmailEnabled) {
    await Promise.all(recipientsToNotify.map(async recipient => {
      if (recipient.sendStatus !== SendStatus.SENT) {
        return;
      }
      const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';
      const template = /*#__PURE__*/createElement(DocumentCancelTemplate, {
        documentName: envelope.title,
        inviterName: user.name || undefined,
        inviterEmail: user.email,
        assetBaseUrl
      });
      const lang = envelope.documentMeta?.language ?? settings.documentLanguage;
      const [html, text] = await Promise.all([renderEmailWithI18N(template, {
        lang,
        branding
      }), renderEmailWithI18N(template, {
        lang,
        branding,
        plainText: true
      })]);
      const i18n = await getI18nInstance(lang);
      await emailTransport.sendMail({
        to: {
          address: recipient.email,
          name: recipient.name
        },
        from: senderEmail,
        replyTo: replyToEmail,
        subject: i18n._(
        /*i18n*/
        {
          id: "Kvf7iA"
        }),
        html,
        text
      });
    }));
  }
  // always hard delete if deleted from admin
  return await prismaWithReplicas.$transaction(async tx => {
    await tx.documentAuditLog.create({
      data: createDocumentAuditLogData({
        envelopeId,
        type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_DELETED,
        user,
        requestMetadata,
        data: {
          type: 'HARD'
        }
      })
    });
    return await tx.envelope.delete({
      where: {
        id: envelopeId
      }
    });
  });
};

export { adminSuperDeleteDocument };
//# sourceMappingURL=admin-super-delete-document.js.map
