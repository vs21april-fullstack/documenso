import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../../errors/app-error.js';

const run = async ({
  payload,
  io
}) => {
  const {
    subscriptionClaimId,
    flags
  } = payload;
  const subscriptionClaim = await prismaWithReplicas.subscriptionClaim.findFirst({
    where: {
      id: subscriptionClaimId
    }
  });
  if (!subscriptionClaim) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Subscription claim not found'
    });
  }
  await io.runTask('backport-claims', async () => {
    const newFlagsJson = JSON.stringify(flags);
    await prismaWithReplicas.$executeRaw`
      UPDATE OrganisationClaim
      SET flags = JSON_MERGE_PATCH(flags, ${newFlagsJson})
      WHERE originalSubscriptionClaimId = ${subscriptionClaimId}
    `;
  });
};

export { run };
//# sourceMappingURL=backport-subscription-claims.handler.js.map
