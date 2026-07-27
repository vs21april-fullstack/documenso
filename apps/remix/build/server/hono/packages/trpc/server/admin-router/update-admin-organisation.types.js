import { ZNameSchema } from '../../../lib/types/name.js';
import { z } from 'zod';
import { ZTeamUrlSchema } from '../team-router/schema.js';
import { ZCreateSubscriptionClaimRequestSchema } from './create-subscription-claim.types.js';

const ZUpdateAdminOrganisationRequestSchema = z.object({
  organisationId: z.string(),
  data: z.object({
    name: ZNameSchema.optional(),
    url: ZTeamUrlSchema.optional(),
    claims: ZCreateSubscriptionClaimRequestSchema.pick({
      teamCount: true,
      memberCount: true,
      envelopeItemCount: true,
      recipientCount: true,
      flags: true,
      documentRateLimits: true,
      documentQuota: true,
      emailRateLimits: true,
      emailQuota: true,
      apiRateLimits: true,
      apiQuota: true,
      emailTransportId: true
    }).optional(),
    customerId: z.string().optional(),
    originalSubscriptionClaimId: z.string().optional()
  })
});
const ZUpdateAdminOrganisationResponseSchema = z.void();

export { ZUpdateAdminOrganisationRequestSchema, ZUpdateAdminOrganisationResponseSchema };
//# sourceMappingURL=update-admin-organisation.types.js.map
