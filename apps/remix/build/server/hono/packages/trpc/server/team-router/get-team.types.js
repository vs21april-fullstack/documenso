import { TeamMemberRole } from '../../../prisma/generated/types.js';
import { OrganisationGlobalSettingsSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationGlobalSettingsSchema.js';
import { TeamGlobalSettingsSchema } from '../../../prisma/generated/zod/modelSchema/TeamGlobalSettingsSchema.js';
import { TeamSchema } from '../../../prisma/generated/zod/modelSchema/TeamSchema.js';
import { z } from 'zod';

// export const getTeamMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'GET',
//     path: '/team/{teamReference}',
//     summary: 'Get team',
//     description: 'Get a team by ID or URL',
//     tags: ['team'],
//   },
// };
const ZGetTeamRequestSchema = z.object({
  teamReference: z.union([z.string(), z.number()])
});
const ZGetTeamResponseSchema = TeamSchema.pick({
  id: true,
  name: true,
  url: true,
  createdAt: true,
  avatarImageId: true,
  organisationId: true
}).extend({
  currentTeamRole: z.nativeEnum(TeamMemberRole),
  teamSettings: TeamGlobalSettingsSchema.omit({
    id: true
  }),
  derivedSettings: OrganisationGlobalSettingsSchema.omit({
    id: true
  })
});

export { ZGetTeamRequestSchema, ZGetTeamResponseSchema };
//# sourceMappingURL=get-team.types.js.map
