import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { TeamGroupSchema } from '../../../prisma/generated/zod/modelSchema/TeamGroupSchema.js';
import { OrganisationGroupType, OrganisationMemberRole } from '@prisma/client';
import { z } from 'zod';

// export const getTeamGroupsMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'GET',
//     path: '/team/{teamId}/groups',
//     summary: 'Get team groups',
//     description: 'Get all groups for a team',
//     tags: ['Team'],
//   },
// };
const ZFindTeamGroupsRequestSchema = ZFindSearchParamsSchema.extend({
  teamId: z.number(),
  teamGroupId: z.string().optional(),
  organisationRoles: z.nativeEnum(OrganisationMemberRole).array().optional(),
  types: z.nativeEnum(OrganisationGroupType).array().optional()
});
const ZFindTeamGroupsResponseSchema = ZFindResultResponse.extend({
  data: TeamGroupSchema.pick({
    teamRole: true,
    id: true,
    teamId: true
  }).extend({
    name: z.string(),
    organisationGroupId: z.string(),
    organisationGroupType: z.nativeEnum(OrganisationGroupType),
    members: z.object({
      id: z.string(),
      userId: z.number(),
      name: z.string(),
      email: z.string(),
      avatarImageId: z.string().nullable()
    }).array()
  }).array()
});

export { ZFindTeamGroupsRequestSchema, ZFindTeamGroupsResponseSchema };
//# sourceMappingURL=find-team-groups.types.js.map
