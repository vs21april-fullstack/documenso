import { ZOrganisationManySchema } from '../../../lib/types/organisation.js';
import { OrganisationMemberRoleSchema } from '../../../prisma/generated/zod/inputTypeSchemas/OrganisationMemberRoleSchema.js';
import { z } from 'zod';

// export const getOrganisationsMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'GET',
//     path: '/organisation/teams',
//     summary: 'Get teams',
//     description: 'Get all teams you are a member of',
//     tags: ['Organisation'],
//   },
// };
const ZGetOrganisationsRequestSchema = z.void();
const ZGetOrganisationsResponseSchema = ZOrganisationManySchema.extend({
  currentOrganisationRole: OrganisationMemberRoleSchema,
  currentMemberId: z.string()
}).array();

export { ZGetOrganisationsRequestSchema, ZGetOrganisationsResponseSchema };
//# sourceMappingURL=get-organisations.types.js.map
