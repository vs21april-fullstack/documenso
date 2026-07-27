import { z } from 'zod';
import { ZCreateSubscriptionClaimRequestSchema } from './create-subscription-claim.types.js';

const ZUpdateSubscriptionClaimRequestSchema = z.object({
  id: z.string(),
  data: ZCreateSubscriptionClaimRequestSchema,
  // When enabled, the claim's email transport is propagated to all organisations
  // currently using this claim.
  backportEmailTransport: z.boolean().default(false)
});
const ZUpdateSubscriptionClaimResponseSchema = z.void();

export { ZUpdateSubscriptionClaimRequestSchema, ZUpdateSubscriptionClaimResponseSchema };
//# sourceMappingURL=update-subscription-claim.types.js.map
