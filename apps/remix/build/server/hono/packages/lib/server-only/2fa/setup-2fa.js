import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { base32 } from '@scure/base';
import crypto from 'crypto';
import { createTOTPKeyURI } from 'oslo/otp';
import { DOCUMENSO_ENCRYPTION_KEY } from '../../constants/crypto.js';
import { symmetricEncrypt } from '../../universal/crypto.js';

const ISSUER = 'Documenso';
const setupTwoFactorAuthentication = async ({
  user
}) => {
  const key = DOCUMENSO_ENCRYPTION_KEY;
  if (!key) {
    throw new Error('MISSING_ENCRYPTION_KEY');
  }
  const secret = crypto.randomBytes(10);
  const backupCodes = Array.from({
    length: 10
  }).fill(null).map(() => crypto.randomBytes(5).toString('hex')).map(code => `${code.slice(0, 5)}-${code.slice(5)}`.toUpperCase());
  const accountName = user.email;
  const uri = createTOTPKeyURI(ISSUER, accountName, secret);
  const encodedSecret = base32.encode(new Uint8Array(secret));
  await prismaWithReplicas.user.update({
    where: {
      id: user.id
    },
    data: {
      twoFactorEnabled: false,
      twoFactorBackupCodes: symmetricEncrypt({
        data: JSON.stringify(backupCodes),
        key: key
      }),
      twoFactorSecret: symmetricEncrypt({
        data: encodedSecret,
        key: key
      })
    }
  });
  return {
    secret: encodedSecret,
    uri
  };
};

export { setupTwoFactorAuthentication };
//# sourceMappingURL=setup-2fa.js.map
