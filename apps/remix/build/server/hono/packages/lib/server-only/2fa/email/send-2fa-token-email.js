import { AccessAuth2FAEmailTemplate } from '../../../../email/templates/access-auth-2fa.js';
import { isRecipientEmailValidForSending } from '../../../utils/recipients.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../../constants/app.js';
import { AppError, AppErrorCode } from '../../../errors/app-error.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../../types/document-audit-logs.js';
import { createDocumentAuditLogData } from '../../../utils/document-audit-logs.js';
import { unsafeBuildEnvelopeIdQuery } from '../../../utils/envelope.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';
import { getEmailContext } from '../../email/get-email-context.js';
import { TWO_FACTOR_EMAIL_EXPIRATION_MINUTES } from './constants.js';
import { generateTwoFactorTokenFromEmail } from './generate-2fa-token-from-email.js';

const send2FATokenEmail = async ({
  token,
  envelopeId
}) => {
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      ...unsafeBuildEnvelopeIdQuery({
        type: 'envelopeId',
        id: envelopeId
      }, EnvelopeType.DOCUMENT),
      recipients: {
        some: {
          token
        }
      }
    },
    include: {
      recipients: {
        where: {
          token
        }
      },
      documentMeta: true,
      team: {
        select: {
          teamEmail: true,
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
  const [recipient] = envelope.recipients;
  if (!recipient) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Recipient not found'
    });
  }
  if (!isRecipientEmailValidForSending(recipient)) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Recipient is missing email address'
    });
  }
  const twoFactorTokenToken = await generateTwoFactorTokenFromEmail({
    envelopeId,
    email: recipient.email
  });
  const {
    branding,
    emailLanguage,
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
  const i18n = await getI18nInstance(emailLanguage);
  const subject = i18n._(
  /*i18n*/
  {
    id: "avO3So"
  });
  const template = /*#__PURE__*/createElement(AccessAuth2FAEmailTemplate, {
    documentTitle: envelope.title,
    userName: recipient.name,
    userEmail: recipient.email,
    code: twoFactorTokenToken,
    expiresInMinutes: TWO_FACTOR_EMAIL_EXPIRATION_MINUTES,
    assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL()
  });
  const [html, text] = await Promise.all([renderEmailWithI18N(template, {
    lang: emailLanguage,
    branding
  }), renderEmailWithI18N(template, {
    lang: emailLanguage,
    branding,
    plainText: true
  })]);
  // Send email outside any transaction to avoid holding a connection
  // open during network I/O.
  await emailTransport.sendMail({
    to: {
      address: recipient.email,
      name: recipient.name
    },
    from: senderEmail,
    replyTo: replyToEmail,
    subject,
    html,
    text
  });
  await prismaWithReplicas.documentAuditLog.create({
    data: createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_ACCESS_AUTH_2FA_REQUESTED,
      envelopeId: envelope.id,
      data: {
        recipientEmail: recipient.email,
        recipientName: recipient.name,
        recipientId: recipient.id
      }
    })
  });
};

export { send2FATokenEmail };
//# sourceMappingURL=send-2fa-token-email.js.map
