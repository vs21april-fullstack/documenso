import { generateHOTP } from 'oslo/otp';
import { generateTwoFactorCredentialsFromEmail } from './generate-2fa-credentials-from-email.js';

const validateTwoFactorTokenFromEmail = async ({
  envelopeId,
  email,
  code,
  period = 30_000,
  window = 1
}) => {
  const {
    secret
  } = generateTwoFactorCredentialsFromEmail({
    email,
    envelopeId
  });
  let now = Date.now();
  for (let i = 0; i < window; i++) {
    const counter = Math.floor(now / period);
    const hotp = await generateHOTP(secret, counter);
    if (code === hotp) {
      return true;
    }
    now -= period;
  }
  return false;
};

export { validateTwoFactorTokenFromEmail };
//# sourceMappingURL=validate-2fa-token-from-email.js.map
