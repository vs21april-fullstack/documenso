import { createOrganisationClaimUpsertData } from '../../../lib/server-only/organisation/create-organisation.js';
import { stripe } from '../../../lib/server-only/stripe/index.js';
import { getSubscriptionClaim } from '../../../lib/server-only/subscription/get-subscription-claim.js';
import { INTERNAL_CLAIM_ID } from '../../../lib/types/subscription.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { SubscriptionStatus, OrganisationType } from '@prisma/client';
import { match } from 'ts-pattern';

const LIVE_SUBSCRIPTION_STATUSES = ['active', 'trialing', 'past_due'];
/**
 * Idempotent, convergent sync of a Stripe customer's subscription state into the local database.
 *
 * Fetches the current truth from Stripe and writes it locally, regardless of which
 * webhook event (or manual trigger) initiated the sync. Safe to run at any time,
 * any number of times.
 *
 * This function never creates organisations.
 */
const syncStripeCustomerSubscription = async ({
  customerId,
  bypassClaimUpdate = false
}) => {
  // Note: `data.items.data.price.product` would exceed Stripe's 4-level expansion
  // limit on list endpoints, so the product is fetched separately when needed.
  const stripeSubscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 100
  });
  const liveSubscriptions = stripeSubscriptions.data.filter(subscription => LIVE_SUBSCRIPTION_STATUSES.includes(subscription.status));
  if (liveSubscriptions.length > 1) {
    console.error(`Customer ${customerId} has ${liveSubscriptions.length} live subscriptions, expected at most 1`);
    throw new Error(`Customer ${customerId} has multiple live subscriptions`);
  }
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: {
      customerId
    },
    include: {
      organisationClaim: true,
      subscription: true
    }
  });
  if (!organisation) {
    console.error(`Organisation not found for customer ${customerId}, nothing to sync`);
    return;
  }
  const liveSubscription = liveSubscriptions[0];
  if (!liveSubscription) {
    await handleNoLiveSubscription({
      organisation
    });
    return;
  }
  await handleLiveSubscription({
    organisation,
    subscription: liveSubscription,
    customerId,
    bypassClaimUpdate
  });
};
const handleNoLiveSubscription = async ({
  organisation
}) => {
  // Individuals get their subscription deleted so they can return to the free plan.
  if (organisation.organisationClaim.originalSubscriptionClaimId === INTERNAL_CLAIM_ID.INDIVIDUAL) {
    const freeSubscriptionClaim = await getSubscriptionClaim(INTERNAL_CLAIM_ID.FREE);
    await prismaWithReplicas.$transaction(async tx => {
      if (organisation.subscription) {
        await tx.subscription.delete({
          where: {
            id: organisation.subscription.id
          }
        });
      }
      await tx.organisationClaim.update({
        where: {
          id: organisation.organisationClaim.id
        },
        data: {
          originalSubscriptionClaimId: INTERNAL_CLAIM_ID.FREE,
          ...createOrganisationClaimUpsertData(freeSubscriptionClaim)
        }
      });
    });
    return;
  }
  // For all other cases, mark the subscription as inactive if a row exists.
  if (organisation.subscription) {
    await prismaWithReplicas.subscription.update({
      where: {
        id: organisation.subscription.id
      },
      data: {
        status: SubscriptionStatus.INACTIVE
      }
    });
  }
};
const handleLiveSubscription = async ({
  organisation,
  subscription,
  customerId,
  bypassClaimUpdate
}) => {
  if (subscription.items.data.length !== 1) {
    console.error(`No support for multiple subscription items on subscription ${subscription.id}`);
    throw new Error(`No support for multiple subscription items on subscription ${subscription.id}`);
  }
  const subscriptionItem = subscription.items.data[0];
  const claim = await extractStripeClaim(subscriptionItem.price);
  if (!claim) {
    console.error(`Subscription claim on ${subscriptionItem.price.id} not found`);
    throw new Error(`Subscription claim on ${subscriptionItem.price.id} not found`);
  }
  const status = match(subscription.status).with('active', () => SubscriptionStatus.ACTIVE).with('trialing', () => SubscriptionStatus.ACTIVE).with('past_due', () => SubscriptionStatus.PAST_DUE).otherwise(() => SubscriptionStatus.INACTIVE);
  const periodEnd = subscription.status === 'trialing' && subscription.trial_end ? new Date(subscription.trial_end * 1000) : new Date(subscription.current_period_end * 1000);
  const shouldUpdateClaim = !bypassClaimUpdate && organisation.organisationClaim.originalSubscriptionClaimId !== claim.id;
  // Migrate the organisation type if it is no longer an individual/free plan.
  // Never demote an ORGANISATION back to PERSONAL.
  const shouldMigrateOrganisationType = organisation.type === OrganisationType.PERSONAL && claim.id !== INTERNAL_CLAIM_ID.INDIVIDUAL && claim.id !== INTERNAL_CLAIM_ID.FREE;
  await prismaWithReplicas.$transaction(async tx => {
    await tx.subscription.upsert({
      where: {
        organisationId: organisation.id
      },
      create: {
        organisationId: organisation.id,
        status,
        customerId,
        planId: subscription.id,
        priceId: subscriptionItem.price.id,
        periodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end
      },
      update: {
        status,
        customerId,
        planId: subscription.id,
        priceId: subscriptionItem.price.id,
        periodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end
      }
    });
    if (shouldUpdateClaim) {
      await tx.organisationClaim.update({
        where: {
          id: organisation.organisationClaim.id
        },
        data: {
          originalSubscriptionClaimId: claim.id,
          ...createOrganisationClaimUpsertData(claim)
        }
      });
    }
    if (shouldMigrateOrganisationType) {
      await tx.organisation.update({
        where: {
          id: organisation.id
        },
        data: {
          type: OrganisationType.ORGANISATION
        }
      });
    }
  });
};
/**
 * Checks the price metadata for a claimId, if it is missing it will fetch
 * and check the product metadata for a claimId.
 *
 * The order of priority is:
 * 1. Price metadata
 * 2. Product metadata
 *
 * @returns The claimId or null if no claimId is found.
 */
const extractStripeClaimId = async priceId => {
  if (priceId.metadata.claimId) {
    return priceId.metadata.claimId;
  }
  // Use the expanded product when available to avoid an extra API call.
  if (typeof priceId.product !== 'string' && 'metadata' in priceId.product) {
    return priceId.product.metadata.claimId || null;
  }
  const productId = typeof priceId.product === 'string' ? priceId.product : priceId.product.id;
  const product = await stripe.products.retrieve(productId);
  return product.metadata.claimId || null;
};
/**
 * Checks the price metadata for a claimId, if it is missing it will fetch
 * and check the product metadata for a claimId.
 *
 */
const extractStripeClaim = async priceId => {
  const claimId = await extractStripeClaimId(priceId);
  if (!claimId) {
    return null;
  }
  const subscriptionClaim = await prismaWithReplicas.subscriptionClaim.findFirst({
    where: {
      id: claimId
    }
  });
  if (!subscriptionClaim) {
    console.error(`Subscription claim ${claimId} not found`);
    return null;
  }
  return subscriptionClaim;
};

export { extractStripeClaim, extractStripeClaimId, syncStripeCustomerSubscription };
//# sourceMappingURL=sync-stripe-customer-subscription.js.map
