import { z } from 'zod';

const ZSyncSubscriptionRequestSchema = z.object({
  organisationId: z.string().describe('The organisation to sync the subscription for')
});
const ZSyncSubscriptionResponseSchema = z.void();

export { ZSyncSubscriptionRequestSchema, ZSyncSubscriptionResponseSchema };
//# sourceMappingURL=sync-subscription.types.js.map
