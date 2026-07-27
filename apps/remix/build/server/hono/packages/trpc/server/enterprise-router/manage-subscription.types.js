import { z } from 'zod';

const ZManageSubscriptionRequestSchema = z.object({
  organisationId: z.string().describe('The organisation to manage the subscription for'),
  isPersonalLayoutMode: z.boolean().optional()
});

export { ZManageSubscriptionRequestSchema };
//# sourceMappingURL=manage-subscription.types.js.map
