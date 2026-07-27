import { z } from 'zod';

const ZDeleteSubscriptionClaimRequestSchema = z.object({
  id: z.string().cuid()
});
const ZDeleteSubscriptionClaimResponseSchema = z.void();

export { ZDeleteSubscriptionClaimRequestSchema, ZDeleteSubscriptionClaimResponseSchema };
//# sourceMappingURL=delete-subscription-claim.types.js.map
