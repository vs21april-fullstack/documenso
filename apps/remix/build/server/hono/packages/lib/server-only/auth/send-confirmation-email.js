import { mailer } from '../../../email/mailer.js';
import { ConfirmEmailTemplate } from '../../../email/templates/confirm-email.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { createElement } from 'react';
import { getI18nInstance } from '../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app.js';
import { USER_SIGNUP_VERIFICATION_TOKEN_IDENTIFIER, DOCUMENSO_INTERNAL_EMAIL } from '../../constants/email.js';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n.js';

const sendConfirmationEmail = async ({
  userId
}) => {
  const user = await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    },
    include: {
      verificationTokens: {
        where: {
          identifier: USER_SIGNUP_VERIFICATION_TOKEN_IDENTIFIER
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    }
  });
  const [verificationToken] = user.verificationTokens;
  if (!verificationToken?.token) {
    throw new Error('Verification token not found for the user');
  }
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';
  const confirmationLink = `${assetBaseUrl}/verify-email/${verificationToken.token}`;
  const confirmationTemplate = /*#__PURE__*/createElement(ConfirmEmailTemplate, {
    assetBaseUrl,
    confirmationLink
  });
  const [html, text] = await Promise.all([renderEmailWithI18N(confirmationTemplate), renderEmailWithI18N(confirmationTemplate, {
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
      id: "bLI0xp"
    }),
    html,
    text
  });
};

export { sendConfirmationEmail };
//# sourceMappingURL=send-confirmation-email.js.map
