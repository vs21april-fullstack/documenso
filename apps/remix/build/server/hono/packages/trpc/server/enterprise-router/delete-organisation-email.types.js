import { z } from 'zod';

const ZDeleteOrganisationEmailRequestSchema = z.object({
  emailId: z.string()
});
const ZDeleteOrganisationEmailResponseSchema = z.void();

export { ZDeleteOrganisationEmailRequestSchema, ZDeleteOrganisationEmailResponseSchema };
//# sourceMappingURL=delete-organisation-email.types.js.map
