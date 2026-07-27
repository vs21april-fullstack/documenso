import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { OrganisationMemberInviteSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationMemberInviteSchema.js';
import { OrganisationMemberInviteStatus } from '@prisma/client';
import { z } from 'zod';

// export const getOrganisationMemberInvitesMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'GET',
//     path: '/organisation/{teamId}/members/pending',
//     summary: 'Find organisation members pending',
//     description: 'Find all members of a organisation pending',
//     tags: ['Organisation'],
//   },
// };
const ZFindOrganisationMemberInvitesRequestSchema = ZFindSearchParamsSchema.extend({
  organisationId: z.string(),
  status: z.nativeEnum(OrganisationMemberInviteStatus).optional()
});
const ZFindOrganisationMemberInvitesResponseSchema = ZFindResultResponse.extend({
  data: OrganisationMemberInviteSchema.pick({
    id: true,
    organisationId: true,
    email: true,
    createdAt: true,
    organisationRole: true,
    status: true
  }).array()
});

export { ZFindOrganisationMemberInvitesRequestSchema, ZFindOrganisationMemberInvitesResponseSchema };
//# sourceMappingURL=find-organisation-member-invites.types.js.map
