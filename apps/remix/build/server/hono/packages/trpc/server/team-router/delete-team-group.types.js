import { z } from 'zod';

// export const deleteTeamGroupMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/team/groups/{id}/delete',
//     summary: 'Delete team group',
//     description: 'Delete an existing group for a team',
//     tags: ['Team'],
//   },
// };
const ZDeleteTeamGroupRequestSchema = z.object({
  teamId: z.number(),
  teamGroupId: z.string()
});
const ZDeleteTeamGroupResponseSchema = z.void();

export { ZDeleteTeamGroupRequestSchema, ZDeleteTeamGroupResponseSchema };
//# sourceMappingURL=delete-team-group.types.js.map
