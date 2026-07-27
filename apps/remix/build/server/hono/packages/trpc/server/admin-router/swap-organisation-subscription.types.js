import { z } from 'zod';

const ZSwapOrganisationSubscriptionRequestSchema = z.object({
  sourceOrganisationId: z.string(),
  targetOrganisationId: z.string()
});
const ZSwapOrganisationSubscriptionResponseSchema = z.void();

export { ZSwapOrganisationSubscriptionRequestSchema, ZSwapOrganisationSubscriptionResponseSchema };
//# sourceMappingURL=swap-organisation-subscription.types.js.map
