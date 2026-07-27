import { createOrganisation } from '../../../lib/server-only/organisation/create-organisation.js';
import { getSubscriptionClaim } from '../../../lib/server-only/subscription/get-subscription-claim.js';
import { INTERNAL_CLAIM_ID } from '../../../lib/types/subscription.js';
import { OrganisationType } from '@prisma/client';
import { adminProcedure } from '../trpc.js';
import { ZCreateAdminOrganisationRequestSchema, ZCreateAdminOrganisationResponseSchema } from './create-admin-organisation.types.js';

const createAdminOrganisationRoute = adminProcedure.input(ZCreateAdminOrganisationRequestSchema).output(ZCreateAdminOrganisationResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    ownerUserId,
    data
  } = input;
  ctx.logger.info({
    input: {
      ownerUserId
    }
  });
  const freeSubscriptionClaim = await getSubscriptionClaim(INTERNAL_CLAIM_ID.FREE);
  const organisation = await createOrganisation({
    userId: ownerUserId,
    name: data.name,
    type: OrganisationType.ORGANISATION,
    claim: freeSubscriptionClaim
  });
  return {
    organisationId: organisation.id
  };
});

export { createAdminOrganisationRoute };
//# sourceMappingURL=create-admin-organisation.js.map
