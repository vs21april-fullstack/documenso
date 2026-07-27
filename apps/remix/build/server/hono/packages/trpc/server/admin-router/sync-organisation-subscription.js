import { syncStripeCustomerSubscription } from '../../../ee/server-only/stripe/sync-stripe-customer-subscription.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZSyncOrganisationSubscriptionRequestSchema, ZSyncOrganisationSubscriptionResponseSchema } from './sync-organisation-subscription.types.js';

const syncOrganisationSubscriptionRoute = adminProcedure.input(ZSyncOrganisationSubscriptionRequestSchema).output(ZSyncOrganisationSubscriptionResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    organisationId,
    syncClaims
  } = input;
  ctx.logger.info({
    input: {
      organisationId,
      syncClaims
    }
  });
  const organisation = await prismaWithReplicas.organisation.findUnique({
    where: {
      id: organisationId
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Organisation not found'
    });
  }
  if (!organisation.customerId) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Organisation has no Stripe customer to sync from'
    });
  }
  await syncStripeCustomerSubscription({
    customerId: organisation.customerId,
    bypassClaimUpdate: !syncClaims
  });
});

export { syncOrganisationSubscriptionRoute };
//# sourceMappingURL=sync-organisation-subscription.js.map
