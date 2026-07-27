import { AppError } from '../../errors/app-error.js';
import { verifyTwoFactorAuthenticationToken } from './verify-2fa-token.js';
import { verifyBackupCode } from './verify-backup-code.js';

const validateTwoFactorAuthentication = async ({
  backupCode,
  totpCode,
  user
}) => {
  if (!user.twoFactorEnabled) {
    throw new AppError('TWO_FACTOR_SETUP_REQUIRED');
  }
  if (!user.twoFactorSecret) {
    throw new AppError('TWO_FACTOR_MISSING_SECRET');
  }
  if (totpCode) {
    return await verifyTwoFactorAuthenticationToken({
      user,
      totpCode
    });
  }
  if (backupCode) {
    return verifyBackupCode({
      user,
      backupCode
    });
  }
  throw new AppError('TWO_FACTOR_MISSING_CREDENTIALS');
};

export { validateTwoFactorAuthentication };
//# sourceMappingURL=validate-2fa.js.map
