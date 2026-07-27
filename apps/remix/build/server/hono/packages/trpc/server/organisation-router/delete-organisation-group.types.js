import { z } from 'zod';

// export const deleteOrganisationGroupMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/organisation/groups/{id}/delete',
//     summary: 'Delete organisation group',
//     description: 'Delete an existing group for a organisation',
//     tags: ['Organisation'],
//   },
// };
const ZDeleteOrganisationGroupRequestSchema = z.object({
  organisationId: z.string(),
  groupId: z.string()
});
const ZDeleteOrganisationGroupResponseSchema = z.void();

export { ZDeleteOrganisationGroupRequestSchema, ZDeleteOrganisationGroupResponseSchema };
//# sourceMappingURL=delete-organisation-group.types.js.map
