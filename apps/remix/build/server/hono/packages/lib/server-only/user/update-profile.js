import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { UserSecurityAuditLogType } from '@prisma/client';

const updateProfile = async ({
  userId,
  name,
  signature,
  requestMetadata
}) => {
  // Existence check
  await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    }
  });
  await prismaWithReplicas.$transaction(async tx => {
    await tx.userSecurityAuditLog.create({
      data: {
        userId,
        type: UserSecurityAuditLogType.ACCOUNT_PROFILE_UPDATE,
        userAgent: requestMetadata?.userAgent,
        ipAddress: requestMetadata?.ipAddress
      }
    });
    await tx.user.update({
      where: {
        id: userId
      },
      data: {
        name,
        signature
      }
    });
  });
};

export { updateProfile };
//# sourceMappingURL=update-profile.js.map
