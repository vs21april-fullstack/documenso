import { ZNameSchema } from '../../../lib/types/name.js';
import { zEmail } from '../../../lib/utils/zod.js';
import { z } from 'zod';

const ZCreateOrganisationEmailRequestSchema = z.object({
  emailDomainId: z.string(),
  emailName: ZNameSchema,
  email: zEmail().toLowerCase()
  // This does not need to be validated to be part of the domain.
  // replyTo: z.string().email().optional(),
});
const ZCreateOrganisationEmailResponseSchema = z.void();

export { ZCreateOrganisationEmailRequestSchema, ZCreateOrganisationEmailResponseSchema };
//# sourceMappingURL=create-organisation-email.types.js.map
