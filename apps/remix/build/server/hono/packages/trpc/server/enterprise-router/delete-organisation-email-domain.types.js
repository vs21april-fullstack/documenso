import { z } from 'zod';

const ZDeleteOrganisationEmailDomainRequestSchema = z.object({
  emailDomainId: z.string()
});
const ZDeleteOrganisationEmailDomainResponseSchema = z.void();

export { ZDeleteOrganisationEmailDomainRequestSchema, ZDeleteOrganisationEmailDomainResponseSchema };
//# sourceMappingURL=delete-organisation-email-domain.types.js.map
