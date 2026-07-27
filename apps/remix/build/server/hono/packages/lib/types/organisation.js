import { OrganisationClaimSchema } from '../../prisma/generated/zod/modelSchema/OrganisationClaimSchema.js';
import { OrganisationSchema } from '../../prisma/generated/zod/modelSchema/OrganisationSchema.js';
import { z } from 'zod';

const ZOrganisationSchema = OrganisationSchema.pick({
  id: true,
  createdAt: true,
  updatedAt: true,
  type: true,
  name: true,
  url: true,
  avatarImageId: true,
  customerId: true,
  ownerUserId: true
}).extend({
  organisationClaim: OrganisationClaimSchema.pick({
    id: true,
    createdAt: true,
    updatedAt: true,
    originalSubscriptionClaimId: true,
    teamCount: true,
    memberCount: true,
    recipientCount: true,
    flags: true
  })
});
const ZOrganisationLiteSchema = OrganisationSchema.pick({
  id: true,
  createdAt: true,
  updatedAt: true,
  type: true,
  name: true,
  url: true,
  avatarImageId: true,
  customerId: true,
  ownerUserId: true
});
/**
 * A version of the organisation response schema when returning multiple organisations at once from a single API endpoint.
 */
const ZOrganisationManySchema = ZOrganisationLiteSchema;
const ZOrganisationAccountLinkMetadataSchema = z.object({
  type: z.enum(['link', 'create']),
  userId: z.number(),
  organisationId: z.string(),
  oauthConfig: z.object({
    providerAccountId: z.string(),
    accessToken: z.string(),
    expiresAt: z.number(),
    idToken: z.string()
  })
});

export { ZOrganisationAccountLinkMetadataSchema, ZOrganisationLiteSchema, ZOrganisationManySchema, ZOrganisationSchema };
//# sourceMappingURL=organisation.js.map
