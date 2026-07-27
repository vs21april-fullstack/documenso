import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { jobsClient } from '../../../lib/jobs/client.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZUpdateSubscriptionClaimRequestSchema, ZUpdateSubscriptionClaimResponseSchema } from './update-subscription-claim.types.js';

const updateSubscriptionClaimRoute = adminProcedure.input(ZUpdateSubscriptionClaimRequestSchema).output(ZUpdateSubscriptionClaimResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    id,
    data,
    backportEmailTransport
  } = input;
  ctx.logger.info({
    input
  });
  const existingClaim = await prismaWithReplicas.subscriptionClaim.findUnique({
    where: {
      id
    }
  });
  if (!existingClaim) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Subscription claim not found'
    });
  }
  const newlyEnabledFlags = getNewTruthyFlags(existingClaim.flags, data.flags);
  await prismaWithReplicas.subscriptionClaim.update({
    where: {
      id
    },
    data
  });
  if (backportEmailTransport) {
    await prismaWithReplicas.organisationClaim.updateMany({
      where: {
        originalSubscriptionClaimId: id
      },
      data: {
        emailTransportId: data.emailTransportId ?? null
      }
    });
  }
  if (Object.keys(newlyEnabledFlags).length > 0) {
    await jobsClient.triggerJob({
      name: 'internal.backport-subscription-claims',
      payload: {
        subscriptionClaimId: id,
        flags: newlyEnabledFlags
      }
    });
  }
});
function getNewTruthyFlags(a, b) {
  const flags = {};
  for (const key in b) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const typedKey = key;
    if (b[typedKey] === true && a[typedKey] !== true) {
      flags[typedKey] = true;
    }
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return flags;
}

export { updateSubscriptionClaimRoute };
//# sourceMappingURL=update-subscription-claim.js.map
