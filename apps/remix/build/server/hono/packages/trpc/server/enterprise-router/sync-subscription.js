import { syncStripeCustomerSubscription } from '../../../ee/server-only/stripe/sync-stripe-customer-subscription.js';
import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { assertRateLimit } from '../../../lib/server-only/rate-limit/rate-limit-middleware.js';
import { syncSubscriptionRateLimit } from '../../../lib/server-only/rate-limit/rate-limits.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZSyncSubscriptionRequestSchema, ZSyncSubscriptionResponseSchema } from './sync-subscription.types.js';

const syncSubscriptionRoute = authenticatedProcedure.input(ZSyncSubscriptionRequestSchema).output(ZSyncSubscriptionResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    organisationId
  } = input;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  const userId = ctx.user.id;
  if (!IS_BILLING_ENABLED()) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Billing is not enabled'
    });
  }
  const rateLimitResult = await syncSubscriptionRateLimit.check({
    ip: ctx.metadata.requestMetadata.ipAddress ?? 'unknown',
    identifier: `${userId}`
  });
  assertRateLimit(rateLimitResult);
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP.MANAGE_BILLING
    })
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
  }
  if (!organisation.customerId) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Organisation has no billing customer'
    });
  }
  await syncStripeCustomerSubscription({
    customerId: organisation.customerId
  }).catch(error => {
    ctx.logger.error({
      msg: 'Failed to sync the subscription from Stripe',
      error
    });
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Failed to sync the subscription from Stripe'
    });
  });
});

export { syncSubscriptionRoute };
//# sourceMappingURL=sync-subscription.js.map
