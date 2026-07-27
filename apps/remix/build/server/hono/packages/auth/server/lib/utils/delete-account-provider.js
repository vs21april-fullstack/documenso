import { ORGANISATION_USER_ACCOUNT_TYPE } from '../../../../lib/constants/organisations.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { UserSecurityAuditLogType } from '@prisma/client';
import { getSession } from './get-session.js';

const deleteAccountProvider = async (c, accountId) => {
  const {
    user
  } = await getSession(c);
  const requestMeta = c.get('requestMetadata');
  await prismaWithReplicas.$transaction(async tx => {
    const deletedAccountProvider = await tx.account.delete({
      where: {
        id: accountId,
        userId: user.id
      },
      select: {
        type: true
      }
    });
    await tx.userSecurityAuditLog.create({
      data: {
        userId: user.id,
        ipAddress: requestMeta.ipAddress,
        userAgent: requestMeta.userAgent,
        type: deletedAccountProvider.type === ORGANISATION_USER_ACCOUNT_TYPE ? UserSecurityAuditLogType.ORGANISATION_SSO_UNLINK : UserSecurityAuditLogType.ACCOUNT_SSO_UNLINK
      }
    });
  });
};

export { deleteAccountProvider };
//# sourceMappingURL=delete-account-provider.js.map
