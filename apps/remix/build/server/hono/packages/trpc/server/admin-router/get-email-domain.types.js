import { ZOrganisationEmailLiteSchema } from '../../../lib/types/organisation-email.js';
import { EmailDomainSchema } from '../../../prisma/generated/zod/modelSchema/EmailDomainSchema.js';
import { OrganisationSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationSchema.js';
import { z } from 'zod';

const ZGetEmailDomainRequestSchema = z.object({
  emailDomainId: z.string()
});
const ZGetEmailDomainResponseSchema = EmailDomainSchema.pick({
  id: true,
  domain: true,
  status: true,
  selector: true,
  publicKey: true,
  createdAt: true,
  updatedAt: true,
  lastVerifiedAt: true
}).extend({
  organisation: OrganisationSchema.pick({
    id: true,
    name: true,
    url: true
  }),
  emails: ZOrganisationEmailLiteSchema.array()
});

export { ZGetEmailDomainRequestSchema, ZGetEmailDomainResponseSchema };
//# sourceMappingURL=get-email-domain.types.js.map
