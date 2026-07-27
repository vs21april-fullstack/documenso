import { generateHOTP } from 'oslo/otp';
import { generateTwoFactorCredentialsFromEmail } from './generate-2fa-credentials-from-email.js';

const generateTwoFactorTokenFromEmail = async ({
  email,
  envelopeId,
  period = 30_000
}) => {
  const {
    secret
  } = generateTwoFactorCredentialsFromEmail({
    email,
    envelopeId
  });
  const counter = Math.floor(Date.now() / period);
  const token = await generateHOTP(secret, counter);
  return token;
};

export { generateTwoFactorTokenFromEmail };
//# sourceMappingURL=generate-2fa-token-from-email.js.map
