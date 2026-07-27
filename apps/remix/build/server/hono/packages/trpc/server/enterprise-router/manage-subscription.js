import { createCustomer } from '../../../ee/server-only/stripe/create-customer.js';
import { getPortalSession } from '../../../ee/server-only/stripe/get-portal-session.js';
import { IS_BILLING_ENABLED, NEXT_PUBLIC_WEBAPP_URL } from '../../../lib/constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZManageSubscriptionRequestSchema } from './manage-subscription.types.js';

const manageSubscriptionRoute = authenticatedProcedure.input(ZManageSubscriptionRequestSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    organisationId,
    isPersonalLayoutMode
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
  // If for some reason customer ID is missing in the organisation but
  // exists in the subscription take it from the subscription.
  if (!customerId && organisation.subscription?.customerId) {
    customerId = organisation.subscription.customerId;
    await prismaWithReplicas.organisation.update({
      where: {
        id: organisationId
      },
      data: {
        customerId
      }
    }).catch(err => {
      // Todo: Logger
      console.error('Critical error, potential conflicting data');
      console.error(err.message);
      throw err;
    });
  }
  // If the customer ID is still missing create a new customer.
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
  const redirectUrl = await getPortalSession({
    customerId,
    returnUrl
  });
  return {
    redirectUrl
  };
});

export { manageSubscriptionRoute };
//# sourceMappingURL=manage-subscription.js.map
