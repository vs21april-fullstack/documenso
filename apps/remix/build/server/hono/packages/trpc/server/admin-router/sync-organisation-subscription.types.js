import { z } from 'zod';

const ZSyncOrganisationSubscriptionRequestSchema = z.object({
  organisationId: z.string(),
  syncClaims: z.boolean()
});
const ZSyncOrganisationSubscriptionResponseSchema = z.void();

export { ZSyncOrganisationSubscriptionRequestSchema, ZSyncOrganisationSubscriptionResponseSchema };
//# sourceMappingURL=sync-organisation-subscription.types.js.map
