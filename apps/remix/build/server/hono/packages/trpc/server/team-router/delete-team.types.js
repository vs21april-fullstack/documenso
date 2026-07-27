import { z } from 'zod';

// export const deleteTeamMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'DELETE',
//     path: '/team/{teamId}',
//     summary: 'Delete team',
//     description: 'Delete an existing team',
//     tags: ['Team'],
//   },
// };
const ZDeleteTeamRequestSchema = z.object({
  teamId: z.number(),
  transferTeamId: z.number().optional()
});
const ZDeleteTeamResponseSchema = z.void();

export { ZDeleteTeamRequestSchema, ZDeleteTeamResponseSchema };
//# sourceMappingURL=delete-team.types.js.map
