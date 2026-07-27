import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { UserSecurityAuditLogType } from '@prisma/client';
import { AppError } from '../../errors/app-error.js';
import { getBackupCodes } from './get-backup-code.js';
import { verifyTwoFactorAuthenticationToken } from './verify-2fa-token.js';

const enableTwoFactorAuthentication = async ({
  user,
  code,
  requestMetadata
}) => {
  if (user.twoFactorEnabled) {
    throw new AppError('TWO_FACTOR_ALREADY_ENABLED');
  }
  if (!user.twoFactorSecret) {
    throw new AppError('TWO_FACTOR_SETUP_REQUIRED');
  }
  const isValidToken = await verifyTwoFactorAuthenticationToken({
    user,
    totpCode: code
  });
  if (!isValidToken) {
    throw new AppError('INCORRECT_TWO_FACTOR_CODE');
  }
  let recoveryCodes = [];
  await prismaWithReplicas.$transaction(async tx => {
    const updatedUser = await tx.user.update({
      where: {
        id: user.id
      },
      data: {
        twoFactorEnabled: true
      }
    });
    recoveryCodes = getBackupCodes({
      user: updatedUser
    }) ?? [];
    if (recoveryCodes.length === 0) {
      throw new AppError('MISSING_BACKUP_CODE');
    }
    await tx.userSecurityAuditLog.create({
      data: {
        userId: user.id,
        type: UserSecurityAuditLogType.AUTH_2FA_ENABLE,
        userAgent: requestMetadata?.userAgent,
        ipAddress: requestMetadata?.ipAddress
      }
    });
  });
  return {
    recoveryCodes
  };
};

export { enableTwoFactorAuthentication };
//# sourceMappingURL=enable-2fa.js.map
