import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { UserSecurityAuditLogType } from '@prisma/client';

const deletePasskey = async ({
  userId,
  passkeyId,
  requestMetadata
}) => {
  await prismaWithReplicas.passkey.findFirstOrThrow({
    where: {
      id: passkeyId,
      userId
    }
  });
  await prismaWithReplicas.$transaction(async tx => {
    await tx.passkey.delete({
      where: {
        id: passkeyId,
        userId
      }
    });
    await tx.userSecurityAuditLog.create({
      data: {
        userId,
        type: UserSecurityAuditLogType.PASSKEY_DELETED,
        userAgent: requestMetadata?.userAgent,
        ipAddress: requestMetadata?.ipAddress
      }
    });
  });
};

export { deletePasskey };
//# sourceMappingURL=delete-passkey.js.map
