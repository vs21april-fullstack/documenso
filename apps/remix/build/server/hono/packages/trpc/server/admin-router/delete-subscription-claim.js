import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZDeleteSubscriptionClaimRequestSchema, ZDeleteSubscriptionClaimResponseSchema } from './delete-subscription-claim.types.js';

const deleteSubscriptionClaimRoute = adminProcedure.input(ZDeleteSubscriptionClaimRequestSchema).output(ZDeleteSubscriptionClaimResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    id
  } = input;
  ctx.logger.info({
    input: {
      id
    }
  });
  const existingClaim = await prismaWithReplicas.subscriptionClaim.findFirst({
    where: {
      id
    }
  });
  if (!existingClaim) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Subscription claim not found'
    });
  }
  if (existingClaim.locked) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'Cannot delete locked subscription claim'
    });
  }
  await prismaWithReplicas.subscriptionClaim.delete({
    where: {
      id
    }
  });
});

export { deleteSubscriptionClaimRoute };
//# sourceMappingURL=delete-subscription-claim.js.map
