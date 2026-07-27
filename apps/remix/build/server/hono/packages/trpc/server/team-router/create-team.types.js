import { ZNameSchema } from '../../../lib/types/name.js';
import { z } from 'zod';
import { ZTeamUrlSchema } from './schema.js';

// export const createTeamMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/team/create',
//     summary: 'Create team',
//     description: 'Create a new team',
//     tags: ['Team'],
//   },
// };
const ZCreateTeamRequestSchema = z.object({
  organisationId: z.string(),
  teamName: ZNameSchema,
  teamUrl: ZTeamUrlSchema,
  inheritMembers: z.boolean().describe('Whether to automatically assign all current and future organisation members to the new team. Defaults to true.')
});
const ZCreateTeamResponseSchema = z.void();

export { ZCreateTeamRequestSchema, ZCreateTeamResponseSchema };
//# sourceMappingURL=create-team.types.js.map
