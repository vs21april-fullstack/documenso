import { base32 } from '@scure/base';
import { generateHOTP } from 'oslo/otp';
import { DOCUMENSO_ENCRYPTION_KEY } from '../../constants/crypto.js';
import { symmetricDecrypt } from '../../universal/crypto.js';

const verifyTwoFactorAuthenticationToken = async ({
  user,
  totpCode,
  window = 1,
  period = 30_000
}) => {
  const key = DOCUMENSO_ENCRYPTION_KEY;
  if (!key) {
    throw new Error('Missing DOCUMENSO_ENCRYPTION_KEY');
  }
  if (!user.twoFactorSecret) {
    throw new Error('user missing 2fa secret');
  }
  const secret = Buffer.from(symmetricDecrypt({
    key,
    data: user.twoFactorSecret
  })).toString('utf-8');
  const decodedSecret = base32.decode(secret);
  let now = Date.now();
  for (let i = 0; i < window; i++) {
    const counter = Math.floor(now / period);
    const hotp = await generateHOTP(decodedSecret, counter);
    if (totpCode === hotp) {
      return true;
    }
    now -= period;
  }
  return false;
};

export { verifyTwoFactorAuthenticationToken };
//# sourceMappingURL=verify-2fa-token.js.map
