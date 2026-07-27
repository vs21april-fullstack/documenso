import { EmailDomainSchema } from '../../prisma/generated/zod/modelSchema/EmailDomainSchema.js';
import { ZOrganisationEmailLiteSchema } from './organisation-email.js';

/**
 * The full email domain response schema.
 *
 * Mainly used for returning a single email domain from the API.
 */
const ZEmailDomainSchema = EmailDomainSchema.pick({
  id: true,
  status: true,
  organisationId: true,
  domain: true,
  selector: true,
  publicKey: true,
  createdAt: true,
  updatedAt: true,
  lastVerifiedAt: true
}).extend({
  emails: ZOrganisationEmailLiteSchema.array()
});
/**
 * A version of the email domain response schema when returning multiple email domains at once from a single API endpoint.
 */
const ZEmailDomainManySchema = EmailDomainSchema.pick({
  id: true,
  status: true,
  organisationId: true,
  domain: true,
  selector: true,
  createdAt: true,
  updatedAt: true,
  lastVerifiedAt: true
});

export { ZEmailDomainManySchema, ZEmailDomainSchema };
//# sourceMappingURL=email-domain.js.map
