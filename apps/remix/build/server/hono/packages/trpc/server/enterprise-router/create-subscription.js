import { createCheckoutSession } from '../../../ee/server-only/stripe/create-checkout-session.js';
import { createCustomer } from '../../../ee/server-only/stripe/create-customer.js';
import { IS_BILLING_ENABLED, NEXT_PUBLIC_WEBAPP_URL } from '../../../lib/constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZCreateSubscriptionRequestSchema } from './create-subscription.types.js';

const createSubscriptionRoute = authenticatedProcedure.input(ZCreateSubscriptionRequestSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    organisationId,
    priceId,
    isPersonalLayoutMode
  } = input;
  ctx.logger.info({
    input: {
      organisationId,
      priceId
    }
  });
  const userId = ctx.user.id;
  if (!IS_BILLING_ENABLED()) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Billing is not enabled'
    });
  }
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_BILLING']
    }),
    include: {
      subscription: true,
      owner: {
        select: {
          email: true,
          name: true
        }
      }
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
  }
  let customerId = organisation.customerId;
  if (!customerId) {
    const customer = await createCustomer({
      name: organisation.owner.name || organisation.owner.email,
      email: organisation.owner.email
    });
    customerId = customer.id;
    await prismaWithReplicas.organisation.update({
      where: {
        id: organisationId
      },
      data: {
        customerId: customer.id
      }
    });
  }
  const returnUrl = isPersonalLayoutMode ? `${NEXT_PUBLIC_WEBAPP_URL()}/settings/billing-personal` : `${NEXT_PUBLIC_WEBAPP_URL()}/o/${organisation.url}/settings/billing`;
  const redirectUrl = await createCheckoutSession({
    customerId,
    priceId,
    returnUrl
  });
  if (!redirectUrl) {
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Failed to create checkout session'
    });
  }
  return {
    redirectUrl
  };
});

export { createSubscriptionRoute };
//# sourceMappingURL=create-subscription.js.map
