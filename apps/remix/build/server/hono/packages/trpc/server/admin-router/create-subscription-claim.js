import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZCreateSubscriptionClaimRequestSchema, ZCreateSubscriptionClaimResponseSchema } from './create-subscription-claim.types.js';

const createSubscriptionClaimRoute = adminProcedure.input(ZCreateSubscriptionClaimRequestSchema).output(ZCreateSubscriptionClaimResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    name,
    teamCount,
    memberCount,
    envelopeItemCount,
    recipientCount,
    flags,
    documentRateLimits,
    documentQuota,
    emailRateLimits,
    emailQuota,
    apiRateLimits,
    apiQuota,
    emailTransportId
  } = input;
  ctx.logger.info({
    input
  });
  await prismaWithReplicas.subscriptionClaim.create({
    data: {
      name,
      teamCount,
      envelopeItemCount,
      recipientCount,
      memberCount,
      flags,
      documentRateLimits,
      documentQuota,
      emailRateLimits,
      emailQuota,
      apiRateLimits,
      apiQuota,
      emailTransportId
    }
  });
});

export { createSubscriptionClaimRoute };
//# sourceMappingURL=create-subscription-claim.js.map
