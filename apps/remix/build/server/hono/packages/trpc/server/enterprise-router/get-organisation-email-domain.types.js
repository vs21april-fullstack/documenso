import { ZEmailDomainSchema } from '../../../lib/types/email-domain.js';
import { z } from 'zod';

const ZGetOrganisationEmailDomainRequestSchema = z.object({
  emailDomainId: z.string()
});
const ZGetOrganisationEmailDomainResponseSchema = ZEmailDomainSchema;

export { ZGetOrganisationEmailDomainRequestSchema, ZGetOrganisationEmailDomainResponseSchema };
//# sourceMappingURL=get-organisation-email-domain.types.js.map
