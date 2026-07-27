import { getBackupCodes } from './get-backup-code.js';

const verifyBackupCode = ({
  user,
  backupCode
}) => {
  const userBackupCodes = getBackupCodes({
    user
  });
  if (!userBackupCodes) {
    throw new Error('User has no backup codes');
  }
  return userBackupCodes.includes(backupCode);
};

export { verifyBackupCode };
//# sourceMappingURL=verify-backup-code.js.map
