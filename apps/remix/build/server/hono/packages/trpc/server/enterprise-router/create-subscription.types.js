import { z } from 'zod';

const ZCreateSubscriptionRequestSchema = z.object({
  organisationId: z.string().describe('The organisation to create the subscription for'),
  priceId: z.string().describe('The price to create the subscription for'),
  isPersonalLayoutMode: z.boolean().optional()
});

export { ZCreateSubscriptionRequestSchema };
//# sourceMappingURL=create-subscription.types.js.map
