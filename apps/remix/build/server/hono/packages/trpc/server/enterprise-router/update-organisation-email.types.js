import { z } from 'zod';
import { ZCreateOrganisationEmailRequestSchema } from './create-organisation-email.types.js';

const ZUpdateOrganisationEmailRequestSchema = z.object({
  emailId: z.string()
}).extend(ZCreateOrganisationEmailRequestSchema.pick({
  emailName: true
  // replyTo: true
}).shape);
const ZUpdateOrganisationEmailResponseSchema = z.void();

export { ZUpdateOrganisationEmailRequestSchema, ZUpdateOrganisationEmailResponseSchema };
//# sourceMappingURL=update-organisation-email.types.js.map
