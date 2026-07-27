import { ZNameSchema } from '../../../lib/types/name.js';
import { z } from 'zod';

const ZCreateAdminOrganisationRequestSchema = z.object({
  ownerUserId: z.number(),
  data: z.object({
    name: ZNameSchema
  })
});
const ZCreateAdminOrganisationResponseSchema = z.object({
  organisationId: z.string()
});

export { ZCreateAdminOrganisationRequestSchema, ZCreateAdminOrganisationResponseSchema };
//# sourceMappingURL=create-admin-organisation.types.js.map
