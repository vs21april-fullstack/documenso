import { z } from 'zod';
import { DOCUMENSO_ENCRYPTION_KEY } from '../../constants/crypto.js';
import { symmetricDecrypt } from '../../universal/crypto.js';

const ZBackupCodeSchema = z.array(z.string());
const getBackupCodes = ({
  user
}) => {
  const key = DOCUMENSO_ENCRYPTION_KEY;
  if (!key) {
    throw new Error('Missing DOCUMENSO_ENCRYPTION_KEY');
  }
  if (!user.twoFactorEnabled) {
    throw new Error('User has not enabled 2FA');
  }
  if (!user.twoFactorBackupCodes) {
    throw new Error('User has no backup codes');
  }
  const secret = Buffer.from(symmetricDecrypt({
    key,
    data: user.twoFactorBackupCodes
  })).toString('utf-8');
  const data = JSON.parse(secret);
  const result = ZBackupCodeSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  return null;
};

export { getBackupCodes };
//# sourceMappingURL=get-backup-code.js.map
