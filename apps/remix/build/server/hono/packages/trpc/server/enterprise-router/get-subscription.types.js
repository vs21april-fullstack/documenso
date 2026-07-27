import { z } from 'zod';

const ZGetSubscriptionRequestSchema = z.object({
  organisationId: z.string().describe('The organisation to get the subscription for')
});

export { ZGetSubscriptionRequestSchema };
//# sourceMappingURL=get-subscription.types.js.map
