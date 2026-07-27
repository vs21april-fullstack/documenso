import { z } from 'zod';

// export const deleteOrganisationMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'DELETE',
//     path: '/organisation/{teamId}',
//     summary: 'Delete organisation',
//     description: 'Delete an existing organisation',
//     tags: ['Organisation'],
//   },
// };
const ZDeleteOrganisationRequestSchema = z.object({
  organisationId: z.string()
});
const ZDeleteOrganisationResponseSchema = z.void();

export { ZDeleteOrganisationRequestSchema, ZDeleteOrganisationResponseSchema };
//# sourceMappingURL=delete-organisation.types.js.map
