import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { UserSecurityAuditLogType } from '@prisma/client';

const updatePasskey = async ({
  userId,
  passkeyId,
  name,
  requestMetadata
}) => {
  const passkey = await prismaWithReplicas.passkey.findFirstOrThrow({
    where: {
      id: passkeyId,
      userId
    }
  });
  if (passkey.name === name) {
    return;
  }
  await prismaWithReplicas.$transaction(async tx => {
    await tx.passkey.update({
      where: {
        id: passkeyId,
        userId
      },
      data: {
        name,
        updatedAt: new Date()
      }
    });
    await tx.userSecurityAuditLog.create({
      data: {
        userId,
        type: UserSecurityAuditLogType.PASSKEY_UPDATED,
        userAgent: requestMetadata?.userAgent,
        ipAddress: requestMetadata?.ipAddress
      }
    });
  });
};

export { updatePasskey };
//# sourceMappingURL=update-passkey.js.map
