import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { UserSecurityAuditLogType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { validateTwoFactorAuthentication } from './validate-2fa.js';

const disableTwoFactorAuthentication = async ({
  totpCode,
  backupCode,
  user,
  requestMetadata
}) => {
  let isValid = false;
  if (!totpCode && !backupCode) {
    throw new AppError(AppErrorCode.INVALID_REQUEST);
  }
  if (totpCode) {
    isValid = await validateTwoFactorAuthentication({
      totpCode,
      user
    });
  } else if (backupCode) {
    isValid = await validateTwoFactorAuthentication({
      backupCode,
      user
    });
  }
  if (!isValid) {
    throw new AppError('INCORRECT_TWO_FACTOR_CODE');
  }
  await prismaWithReplicas.$transaction(async tx => {
    await tx.user.update({
      where: {
        id: user.id
      },
      data: {
        twoFactorEnabled: false,
        twoFactorBackupCodes: null,
        twoFactorSecret: null
      }
    });
    await tx.userSecurityAuditLog.create({
      data: {
        userId: user.id,
        type: UserSecurityAuditLogType.AUTH_2FA_DISABLE,
        userAgent: requestMetadata?.userAgent,
        ipAddress: requestMetadata?.ipAddress
      }
    });
  });
  return true;
};

export { disableTwoFactorAuthentication };
//# sourceMappingURL=disable-2fa.js.map
