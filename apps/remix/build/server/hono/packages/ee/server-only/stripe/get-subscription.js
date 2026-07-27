import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { stripe } from '../../../lib/server-only/stripe/index.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const getSubscription = async ({
  organisationId,
  userId
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    }),
    include: {
      subscription: true
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Organisation not found'
    });
  }
  if (!organisation.subscription) {
    return null;
  }
  const stripeSubscription = await stripe.subscriptions.retrieve(organisation.subscription.planId, {
    expand: ['items.data.price.product']
  });
  return {
    organisationSubscription: organisation.subscription,
    stripeSubscription
  };
};

export { getSubscription };
//# sourceMappingURL=get-subscription.js.map
