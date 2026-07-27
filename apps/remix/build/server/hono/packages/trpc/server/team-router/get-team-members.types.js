import { OrganisationMemberRole, TeamMemberRole } from '../../../prisma/generated/types.js';
import { OrganisationMemberSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationMemberSchema.js';
import { z } from 'zod';

// export const getTeamMembersMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'GET',
//     path: '/team/{teamId}/members',
//     summary: 'Get team members',
//     description: 'Get all members of a team',
//     tags: ['team'],
//   },
// };
const ZGetTeamMembersRequestSchema = z.object({
  teamId: z.number()
});
const ZGetTeamMembersResponseSchema = OrganisationMemberSchema.pick({
  id: true,
  createdAt: true,
  userId: true
}).extend({
  teamRole: z.nativeEnum(TeamMemberRole),
  organisationRole: z.nativeEnum(OrganisationMemberRole),
  email: z.string(),
  name: z.string().nullable(),
  avatarImageId: z.string().nullable()
}).array();

export { ZGetTeamMembersRequestSchema, ZGetTeamMembersResponseSchema };
//# sourceMappingURL=get-team-members.types.js.map
