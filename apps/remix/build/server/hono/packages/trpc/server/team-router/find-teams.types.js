import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { TeamSchema } from '../../../prisma/generated/zod/modelSchema/TeamSchema.js';
import { TeamMemberRole } from '@prisma/client';
import { z } from 'zod';

// export const getTeamsMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'GET',
//     path: '/team/teams',
//     summary: 'Get teams',
//     description: 'Get all teams you are a member of',
//     tags: ['team'],
//   },
// };
const ZFindTeamsRequestSchema = ZFindSearchParamsSchema.extend({
  organisationId: z.string()
});
const ZFindTeamsResponseSchema = ZFindResultResponse.extend({
  data: TeamSchema.pick({
    id: true,
    name: true,
    url: true,
    createdAt: true,
    avatarImageId: true,
    organisationId: true
  }).extend({
    currentTeamRole: z.nativeEnum(TeamMemberRole)
  }).array()
});

export { ZFindTeamsRequestSchema, ZFindTeamsResponseSchema };
//# sourceMappingURL=find-teams.types.js.map
