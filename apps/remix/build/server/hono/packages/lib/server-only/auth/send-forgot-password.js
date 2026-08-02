import { mailer } from '../../../email/mailer.js';
import { ForgotPasswordTemplate } from '../../../email/templates/forgot-password.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { createElement } from 'react';
import { getI18nInstance } from '../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app.js';
import { env } from '../../utils/env.js';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n.js';

const sendForgotPassword = async ({
  userId
}) => {
  const user = await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    },
    include: {
      passwordResetTokens: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    }
  });
  if (!user) {
    throw new Error('User not found');
  }
  const token = user.passwordResetTokens[0]?.token;
  if (!token) {
    throw new Error('Password reset token not found for user');
  }
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';
  const resetPasswordLink = `${assetBaseUrl}/reset-password/${token}`;
  const template = /*#__PURE__*/createElement(ForgotPasswordTemplate, {
    assetBaseUrl,
    resetPasswordLink
  });
  const [html, text] = await Promise.all([renderEmailWithI18N(template), renderEmailWithI18N(template, {
    plainText: true
  })]);
  const i18n = await getI18nInstance();
  return await mailer.sendMail({
    to: {
      address: user.email,
      name: user.name || ''
    },
    from: {
      name: env('NEXT_PRIVATE_SMTP_FROM_NAME') || 'Omni Sign',
      address: env('NEXT_PRIVATE_SMTP_FROM_ADDRESS') || 'noreply@documenso.com'
    },
    subject: i18n._(
    /*i18n*/
    {
      id: "jDFIo5"
    }),
    html,
    text
  });
};

export { sendForgotPassword };
//# sourceMappingURL=send-forgot-password.js.map
