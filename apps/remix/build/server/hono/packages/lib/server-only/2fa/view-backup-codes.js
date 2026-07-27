import { AppError } from '../../errors/app-error.js';
import { getBackupCodes } from './get-backup-code.js';
import { validateTwoFactorAuthentication } from './validate-2fa.js';

const viewBackupCodes = async ({
  token,
  user
}) => {
  let isValid = await validateTwoFactorAuthentication({
    totpCode: token,
    user
  });
  if (!isValid) {
    isValid = await validateTwoFactorAuthentication({
      backupCode: token,
      user
    });
  }
  if (!isValid) {
    throw new AppError('INCORRECT_TWO_FACTOR_CODE');
  }
  const backupCodes = getBackupCodes({
    user
  });
  if (!backupCodes) {
    throw new AppError('MISSING_BACKUP_CODE');
  }
  return backupCodes;
};

export { viewBackupCodes };
//# sourceMappingURL=view-backup-codes.js.map
