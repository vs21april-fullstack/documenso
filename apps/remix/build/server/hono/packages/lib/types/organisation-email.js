import { OrganisationEmailSchema } from '../../prisma/generated/zod/modelSchema/OrganisationEmailSchema.js';
import { EmailDomainStatus } from '@prisma/client';
import { z } from 'zod';

OrganisationEmailSchema.pick({
  id: true,
  createdAt: true,
  updatedAt: true,
  email: true,
  emailName: true,
  // replyTo: true,
  emailDomainId: true,
  organisationId: true
}).extend({
  emailDomain: z.object({
    id: z.string(),
    status: z.nativeEnum(EmailDomainStatus)
  })
});
/**
 * A lite version of the organisation email response schema without relations.
 */
const ZOrganisationEmailLiteSchema = OrganisationEmailSchema.pick({
  id: true,
  createdAt: true,
  updatedAt: true,
  email: true,
  emailName: true,
  // replyTo: true,
  emailDomainId: true,
  organisationId: true
});
const ZOrganisationEmailManySchema = ZOrganisationEmailLiteSchema.extend({
  // Put anything extra here.
});

export { ZOrganisationEmailLiteSchema, ZOrganisationEmailManySchema };
//# sourceMappingURL=organisation-email.js.map
