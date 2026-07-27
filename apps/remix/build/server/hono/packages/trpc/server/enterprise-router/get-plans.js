import { getInternalClaimPlans } from '../../../ee/server-only/stripe/get-internal-claim-plans.js';
import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';

const getPlansRoute = authenticatedProcedure.query(async ({
  ctx
}) => {
  const userId = ctx.user.id;
  const plans = await getInternalClaimPlans();
  let canCreateFreeOrganisation = false;
  if (IS_BILLING_ENABLED()) {
    const numberOfFreeOrganisations = await prismaWithReplicas.organisation.count({
      where: {
        ownerUserId: userId,
        subscription: {
          is: null
        }
      }
    });
    canCreateFreeOrganisation = numberOfFreeOrganisations === 0;
  }
  return {
    plans,
    canCreateFreeOrganisation
  };
});

export { getPlansRoute };
//# sourceMappingURL=get-plans.js.map
