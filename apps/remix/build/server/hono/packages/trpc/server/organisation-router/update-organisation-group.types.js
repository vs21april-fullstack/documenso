import { ZNameSchema } from '../../../lib/types/name.js';
import { OrganisationMemberRole } from '@prisma/client';
import { z } from 'zod';

// export const updateOrganisationGroupMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/organisation/groups/{id}',
//     summary: 'Update organisation group',
//     description: 'Update an existing group for a organisation',
//     tags: ['Organisation'],
//     requiredScopes: ['personal:organisation:write'],
//   },
// };
const ZUpdateOrganisationGroupRequestSchema = z.object({
  id: z.string(),
  name: ZNameSchema.nullable().optional(),
  organisationRole: z.nativeEnum(OrganisationMemberRole).optional(),
  memberIds: z.array(z.string()).optional()
});
const ZUpdateOrganisationGroupResponseSchema = z.void();

export { ZUpdateOrganisationGroupRequestSchema, ZUpdateOrganisationGroupResponseSchema };
//# sourceMappingURL=update-organisation-group.types.js.map
