import { ZOrganisationSchema } from '../../../lib/types/organisation.js';
import { OrganisationClaimSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationClaimSchema.js';
import { OrganisationGlobalSettingsSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationGlobalSettingsSchema.js';
import { OrganisationMemberSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationMemberSchema.js';
import { SubscriptionSchema } from '../../../prisma/generated/zod/modelSchema/SubscriptionSchema.js';
import { TeamSchema } from '../../../prisma/generated/zod/modelSchema/TeamSchema.js';
import { z } from 'zod';

// export const getOrganisationMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'GET',
//     path: '/organisation/{teamReference}',
//     summary: 'Get organisation',
//     description: 'Get an organisation by ID or URL',
//     tags: ['Organisation'],
//   },
// };
const ZGetOrganisationRequestSchema = z.object({
  organisationReference: z.string().describe('The ID or URL of the organisation.')
});
const ZGetOrganisationResponseSchema = ZOrganisationSchema.extend({
  organisationGlobalSettings: OrganisationGlobalSettingsSchema,
  organisationClaim: OrganisationClaimSchema,
  subscription: SubscriptionSchema.nullable(),
  members: z.array(OrganisationMemberSchema.pick({
    id: true
  })),
  teams: z.array(TeamSchema.pick({
    id: true,
    name: true,
    url: true,
    createdAt: true,
    avatarImageId: true,
    organisationId: true
  }))
});

export { ZGetOrganisationRequestSchema, ZGetOrganisationResponseSchema };
//# sourceMappingURL=get-organisation.types.js.map
