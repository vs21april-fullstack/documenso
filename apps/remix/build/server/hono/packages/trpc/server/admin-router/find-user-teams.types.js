import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { TeamMemberRoleSchema } from '../../../prisma/generated/zod/inputTypeSchemas/TeamMemberRoleSchema.js';
import { OrganisationSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationSchema.js';
import { TeamSchema } from '../../../prisma/generated/zod/modelSchema/TeamSchema.js';
import { z } from 'zod';

const ZFindUserTeamsRequestSchema = ZFindSearchParamsSchema.extend({
  userId: z.number()
});
const ZFindUserTeamsResponseSchema = ZFindResultResponse.extend({
  data: TeamSchema.pick({
    id: true,
    name: true,
    url: true,
    createdAt: true
  }).extend({
    teamRole: TeamMemberRoleSchema,
    organisation: OrganisationSchema.pick({
      id: true,
      name: true,
      url: true
    })
  }).array()
});

export { ZFindUserTeamsRequestSchema, ZFindUserTeamsResponseSchema };
//# sourceMappingURL=find-user-teams.types.js.map
