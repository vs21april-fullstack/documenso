import { ZEmailDomainSchema } from '../../../lib/types/email-domain.js';
import { z } from 'zod';

const domainRegex = /^(?!https?:\/\/)(?!www\.)([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
const ZDomainSchema = z.string().regex(domainRegex, {
  message: 'Invalid domain name'
}).toLowerCase();
const ZCreateOrganisationEmailDomainRequestSchema = z.object({
  organisationId: z.string(),
  domain: ZDomainSchema
});
const ZCreateOrganisationEmailDomainResponseSchema = z.object({
  emailDomain: ZEmailDomainSchema,
  records: z.array(z.object({
    name: z.string(),
    value: z.string(),
    type: z.string()
  }))
});

export { ZCreateOrganisationEmailDomainRequestSchema, ZCreateOrganisationEmailDomainResponseSchema, ZDomainSchema, domainRegex };
//# sourceMappingURL=create-organisation-email-domain.types.js.map
