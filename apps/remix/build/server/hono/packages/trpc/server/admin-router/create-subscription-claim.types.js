import { ZNameSchema } from '../../../lib/types/name.js';
import { ZRateLimitArraySchema, ZClaimFlagsSchema } from '../../../lib/types/subscription.js';
import { z } from 'zod';

const ZCreateSubscriptionClaimRequestSchema = z.object({
  name: ZNameSchema,
  teamCount: z.number().int().min(0),
  memberCount: z.number().int().min(0),
  envelopeItemCount: z.number().int().min(1),
  recipientCount: z.number().int().min(0),
  flags: ZClaimFlagsSchema,
  documentRateLimits: ZRateLimitArraySchema,
  documentQuota: z.number().int().min(0).nullable(),
  emailRateLimits: ZRateLimitArraySchema,
  emailQuota: z.number().int().min(0).nullable(),
  apiRateLimits: ZRateLimitArraySchema,
  apiQuota: z.number().int().min(0).nullable(),
  emailTransportId: z.string().nullable()
});
const ZCreateSubscriptionClaimResponseSchema = z.void();

export { ZCreateSubscriptionClaimRequestSchema, ZCreateSubscriptionClaimResponseSchema };
//# sourceMappingURL=create-subscription-claim.types.js.map
