import { z } from 'zod';
import { ZTeamUrlSchema } from '../team-router/schema.js';
import { ZCreateOrganisationRequestSchema } from './create-organisation.types.js';

// export const updateOrganisationMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/organisation/{teamId}',
//     summary: 'Update organisation',
//     description: 'Update an organisation',
//     tags: ['Organisation'],
//   },
// };
const ZUpdateOrganisationRequestSchema = z.object({
  data: ZCreateOrganisationRequestSchema.pick({
    name: true
  }).extend({
    url: ZTeamUrlSchema
  }),
  organisationId: z.string()
});
const ZUpdateOrganisationResponseSchema = z.void();

export { ZUpdateOrganisationRequestSchema, ZUpdateOrganisationResponseSchema };
//# sourceMappingURL=update-organisation.types.js.map
