import { z } from 'zod';

const ZVerifyOrganisationEmailDomainRequestSchema = z.object({
  organisationId: z.string(),
  emailDomainId: z.string().optional().describe('Leave blank to revalidate all emails')
});
const ZVerifyOrganisationEmailDomainResponseSchema = z.void();

export { ZVerifyOrganisationEmailDomainRequestSchema, ZVerifyOrganisationEmailDomainResponseSchema };
//# sourceMappingURL=verify-organisation-email-domain.types.js.map
