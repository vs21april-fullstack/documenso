import { TeamMemberRole } from '@prisma/client';
import { z } from 'zod';

// export const updateTeamGroupMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/team/groups/{id}',
//     summary: 'Update team group',
//     description: 'Update an existing group for a team',
//     tags: ['Team'],
//     requiredScopes: ['personal:team:write'],
//   },
// };
const ZUpdateTeamGroupRequestSchema = z.object({
  id: z.string(),
  data: z.object({
    teamRole: z.nativeEnum(TeamMemberRole)
  })
});
const ZUpdateTeamGroupResponseSchema = z.void();

export { ZUpdateTeamGroupRequestSchema, ZUpdateTeamGroupResponseSchema };
//# sourceMappingURL=update-team-group.types.js.map
