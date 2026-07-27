import { ZNameSchema } from '../../../lib/types/name.js';
import { OrganisationMemberRole } from '@prisma/client';
import { z } from 'zod';

// export const createOrganisationGroupMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/organisation/{teamId}/groups',
//     summary: 'Create organisation group',
//     description: 'Create a new group for a organisation',
//     tags: ['Organisation'],
//   },
// };
const ZCreateOrganisationGroupRequestSchema = z.object({
  organisationId: z.string(),
  organisationRole: z.nativeEnum(OrganisationMemberRole),
  name: ZNameSchema,
  memberIds: z.array(z.string())
});
const ZCreateOrganisationGroupResponseSchema = z.void();

export { ZCreateOrganisationGroupRequestSchema, ZCreateOrganisationGroupResponseSchema };
//# sourceMappingURL=create-organisation-group.types.js.map
