import { z } from 'zod';
import { EmailDomainStatusSchema } from '../inputTypeSchemas/EmailDomainStatusSchema.js';

/////////////////////////////////////////
// EMAIL DOMAIN SCHEMA
/////////////////////////////////////////
const EmailDomainSchema = z.object({
  status: EmailDomainStatusSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  selector: z.string(),
  domain: z.string(),
  publicKey: z.string(),
  privateKey: z.string(),
  lastVerifiedAt: z.coerce.date().nullable(),
  organisationId: z.string()
});

export { EmailDomainSchema, EmailDomainSchema as default };
//# sourceMappingURL=EmailDomainSchema.js.map
