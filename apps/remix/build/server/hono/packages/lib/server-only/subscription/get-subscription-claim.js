import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';

const getSubscriptionClaim = async claimId => {
  const subscriptionClaim = await prismaWithReplicas.subscriptionClaim.findFirst({
    where: {
      id: claimId
    }
  });
  if (!subscriptionClaim) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: `Subscription claim ${claimId} not found`
    });
  }
  return subscriptionClaim;
};

export { getSubscriptionClaim };
//# sourceMappingURL=get-subscription-claim.js.map
