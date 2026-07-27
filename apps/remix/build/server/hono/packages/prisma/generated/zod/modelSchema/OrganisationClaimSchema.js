import { z } from 'zod';
import { ZRateLimitArraySchema, ZClaimFlagsSchema } from '../../../../lib/types/subscription.js';

/////////////////////////////////////////
// ORGANISATION CLAIM SCHEMA
/////////////////////////////////////////
const OrganisationClaimSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  originalSubscriptionClaimId: z.string().nullable(),
  teamCount: z.number(),
  memberCount: z.number(),
  envelopeItemCount: z.number(),
  recipientCount: z.number(),
  /**
   * [ClaimFlags]
   */
  flags: ZClaimFlagsSchema,
  /**
   * [RateLimitArray]
   */
  documentRateLimits: ZRateLimitArraySchema,
  documentQuota: z.number().nullable(),
  /**
   * [RateLimitArray]
   */
  emailRateLimits: ZRateLimitArraySchema,
  emailQuota: z.number().nullable(),
  /**
   * [RateLimitArray]
   */
  apiRateLimits: ZRateLimitArraySchema,
  apiQuota: z.number().nullable(),
  emailTransportId: z.string().nullable()
});

export { OrganisationClaimSchema, OrganisationClaimSchema as default };
//# sourceMappingURL=OrganisationClaimSchema.js.map
