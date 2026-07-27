import { getInternalClaimPlans } from '../../../ee/server-only/stripe/get-internal-claim-plans.js';
import { getSubscription } from '../../../ee/server-only/stripe/get-subscription.js';
import { syncStripeCustomerSubscription } from '../../../ee/server-only/stripe/sync-stripe-customer-subscription.js';
import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import '../../../lib/server-only/stripe/index.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetSubscriptionRequestSchema } from './get-subscription.types.js';
import Stripe from 'stripe';

const getSubscriptionRoute = authenticatedProcedure.input(ZGetSubscriptionRequestSchema).query(async ({
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
  const [subscription, plans] = await Promise.all([
  // If the subscription is not found or there's an error, we return null to
  // avoid failing the entire request.
  getSubscription({
    organisationId,
    userId
  }).catch(async e => {
    ctx.logger.error(`Failed to get subscription for organisation ${organisationId}`, e);
    await reconcileMissingStripeSubscription({
      logger: ctx.logger,
      organisationId,
      userId,
      error: e
    });
    return null;
  }), getInternalClaimPlans()]);
  return {
    subscription,
    plans
  };
});
/**
 * When the Stripe subscription no longer exists (e.g. deleted by Stripe's
 * test-mode retention policy, or removed manually), fire-and-forget a reconcile
 * so the stale local subscription row and any billing banner converge on the
 * next load. Reconcile failures must never break the read path that calls this.
 */
const reconcileMissingStripeSubscription = async ({
  logger,
  organisationId,
  userId,
  error
}) => {
  if (!(error instanceof Stripe.errors.StripeInvalidRequestError) || error.code !== 'resource_missing') {
    return;
  }
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    }),
    select: {
      customerId: true
    }
  });
  if (!organisation?.customerId) {
    return;
  }
  void syncStripeCustomerSubscription({
    customerId: organisation.customerId
  }).catch(syncError => {
    logger.error(`Failed to reconcile subscription after resource_missing for organisation ${organisationId}`, syncError);
  });
};

export { getSubscriptionRoute };
//# sourceMappingURL=get-subscription.js.map
