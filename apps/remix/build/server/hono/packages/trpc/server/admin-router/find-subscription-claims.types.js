import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { SubscriptionClaimSchema } from '../../../prisma/generated/zod/modelSchema/SubscriptionClaimSchema.js';

const ZFindSubscriptionClaimsRequestSchema = ZFindSearchParamsSchema.extend({});
const ZFindSubscriptionClaimsResponseSchema = ZFindResultResponse.extend({
  data: SubscriptionClaimSchema.pick({
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    teamCount: true,
    memberCount: true,
    envelopeItemCount: true,
    recipientCount: true,
    locked: true,
    flags: true,
    documentRateLimits: true,
    documentQuota: true,
    emailRateLimits: true,
    emailQuota: true,
    apiRateLimits: true,
    apiQuota: true,
    emailTransportId: true
  }).array()
});

export { ZFindSubscriptionClaimsRequestSchema, ZFindSubscriptionClaimsResponseSchema };
//# sourceMappingURL=find-subscription-claims.types.js.map
