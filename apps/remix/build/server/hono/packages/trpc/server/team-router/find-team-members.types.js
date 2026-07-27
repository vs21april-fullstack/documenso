import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { OrganisationMemberRole, TeamMemberRole } from '../../../prisma/generated/types.js';
import { OrganisationMemberSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationMemberSchema.js';
import { z } from 'zod';

const ZFindTeamMembersRequestSchema = ZFindSearchParamsSchema.extend({
  teamId: z.number()
});
const ZFindTeamMembersResponseSchema = ZFindResultResponse.extend({
  data: OrganisationMemberSchema.pick({
    id: true,
    createdAt: true,
    userId: true
  }).extend({
    teamRole: z.nativeEnum(TeamMemberRole),
    organisationRole: z.nativeEnum(OrganisationMemberRole),
    email: z.string(),
    name: z.string().nullable(),
    avatarImageId: z.string().nullable()
  }).array()
});

export { ZFindTeamMembersRequestSchema, ZFindTeamMembersResponseSchema };
//# sourceMappingURL=find-team-members.types.js.map
