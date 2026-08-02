import { mailer } from '../../../../email/mailer.js';
import { AdminUserCreatedTemplate } from '../../../../email/templates/admin-user-created.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import crypto from 'crypto';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../../constants/app.js';
import { DOCUMENSO_INTERNAL_EMAIL } from '../../../constants/email.js';
import { ONE_DAY } from '../../../constants/time.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';

/**
 * Send notification email for admin-created users with password reset link.
 *
 * Creates a password reset token and sends an email explaining:
 * - An administrator created their account
 * - They need to set their password
 * - Support contact if they didn't expect this
 */
const run = async ({
  payload,
  io
}) => {
  const user = await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: payload.userId
    }
  });
  const token = await io.runTask(`create-password-reset-token`, async () => {
    const passwordResetToken = await prismaWithReplicas.passwordResetToken.create({
      data: {
        token: crypto.randomBytes(18).toString('hex'),
        expiry: new Date(Date.now() + ONE_DAY),
        userId: user.id
      }
    });
    return passwordResetToken.token;
  });
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';
  const resetPasswordLink = `${assetBaseUrl}/reset-password/${token}`;
  const emailTemplate = /*#__PURE__*/createElement(AdminUserCreatedTemplate, {
    assetBaseUrl,
    resetPasswordLink
  });
  const [html, text] = await Promise.all([renderEmailWithI18N(emailTemplate), renderEmailWithI18N(emailTemplate, {
    plainText: true
  })]);
  const i18n = await getI18nInstance();
  return mailer.sendMail({
    to: {
      address: user.email,
      name: user.name || ''
    },
    from: DOCUMENSO_INTERNAL_EMAIL,
    subject: i18n._(
    /*i18n*/
    {
      id: "pEVI4O"
    }),
    html,
    text
  });
};

export { run };
//# sourceMappingURL=send-admin-user-created-email.handler.js.map
