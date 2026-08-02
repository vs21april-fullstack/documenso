import { mailer } from '../../../email/mailer.js';
import { ResetPasswordTemplate } from '../../../email/templates/reset-password.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { createElement } from 'react';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app.js';
import { env } from '../../utils/env.js';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n.js';

const sendResetPassword = async ({
  userId
}) => {
  const user = await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    }
  });
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';
  const template = /*#__PURE__*/createElement(ResetPasswordTemplate, {
    assetBaseUrl,
    userEmail: user.email,
    userName: user.name || ''
  });
  const [html, text] = await Promise.all([renderEmailWithI18N(template), renderEmailWithI18N(template, {
    plainText: true
  })]);
  return await mailer.sendMail({
    to: {
      address: user.email,
      name: user.name || ''
    },
    from: {
      name: env('NEXT_PRIVATE_SMTP_FROM_NAME') || 'Omni Sign',
      address: env('NEXT_PRIVATE_SMTP_FROM_ADDRESS') || 'noreply@documenso.com'
    },
    subject: 'Password Reset Success!',
    html,
    text
  });
};

export { sendResetPassword };
//# sourceMappingURL=send-reset-password.js.map
