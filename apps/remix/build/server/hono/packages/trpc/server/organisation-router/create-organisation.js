import { createCheckoutSession } from '../../../ee/server-only/stripe/create-checkout-session.js';
import { createCustomer } from '../../../ee/server-only/stripe/create-customer.js';
import { IS_BILLING_ENABLED, NEXT_PUBLIC_WEBAPP_URL } from '../../../lib/constants/app.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { createOrganisation } from '../../../lib/server-only/organisation/create-organisation.js';
import { getSubscriptionClaim } from '../../../lib/server-only/subscription/get-subscription-claim.js';
import { INTERNAL_CLAIM_ID } from '../../../lib/types/subscription.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { SubscriptionStatus, OrganisationType } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZCreateOrganisationRequestSchema, ZCreateOrganisationResponseSchema } from './create-organisation.types.js';

const createOrganisationRoute = authenticatedProcedure
// .meta(createOrganisationMeta)
.input(ZCreateOrganisationRequestSchema).output(ZCreateOrganisationResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    name,
    priceId
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      priceId
    }
  });
  // Check if user can create a free organiastion.
  if (IS_BILLING_ENABLED() && !priceId) {
    const userOrganisations = await prismaWithReplicas.organisation.findMany({
      where: {
        ownerUserId: user.id,
        subscription: {
          is: null
        }
      }
    });
    if (userOrganisations.length >= 1) {
      throw new AppError(AppErrorCode.LIMIT_EXCEEDED, {
        message: 'You have reached the maximum number of free organisations.'
      });
    }
  }
  // Create the organisation upfront, then redirect to checkout for payment.
  // The webhook sync will attach the real subscription and claim after payment.
  if (IS_BILLING_ENABLED() && priceId) {
    const pendingOrganisation = await prismaWithReplicas.organisation.findFirst({
      where: {
        ownerUserId: user.id,
        type: OrganisationType.ORGANISATION,
        OR: [{
          subscription: {
            is: null
          }
        }, {
          subscription: {
            status: SubscriptionStatus.INACTIVE
          }
        }]
      }
    });
    if (pendingOrganisation) {
      throw new AppError(AppErrorCode.LIMIT_EXCEEDED, {
        message: 'You have a pending organisation awaiting payment. Complete or remove it before creating a new one.'
      });
    }
    const freeSubscriptionClaim = await getSubscriptionClaim(INTERNAL_CLAIM_ID.FREE);
    const organisation = await createOrganisation({
      userId: user.id,
      name,
      type: OrganisationType.ORGANISATION,
      claim: freeSubscriptionClaim
    });
    let customerId = organisation.customerId;
    if (!customerId) {
      const customer = await createCustomer({
        email: user.email,
        name: user.name || user.email
      });
      customerId = customer.id;
      await prismaWithReplicas.organisation.update({
        where: {
          id: organisation.id
        },
        data: {
          customerId
        }
      });
    }
    const checkoutUrl = await createCheckoutSession({
      priceId,
      customerId,
      returnUrl: `${NEXT_PUBLIC_WEBAPP_URL()}/o/${organisation.url}/settings/billing`
    });
    return {
      paymentRequired: true,
      checkoutUrl
    };
  }
  // Free organisations should be Personal by default.
  const organisationType = IS_BILLING_ENABLED() ? OrganisationType.PERSONAL : OrganisationType.ORGANISATION;
  const freeSubscriptionClaim = await getSubscriptionClaim(INTERNAL_CLAIM_ID.FREE);
  await createOrganisation({
    userId: user.id,
    name,
    type: organisationType,
    claim: freeSubscriptionClaim
  });
  return {
    paymentRequired: false
  };
});

export { createOrganisationRoute };
//# sourceMappingURL=create-organisation.js.map
