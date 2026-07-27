import { z } from 'zod';
import { EmailTransportTypeSchema } from '../inputTypeSchemas/EmailTransportTypeSchema.js';

/////////////////////////////////////////
// EMAIL TRANSPORT SCHEMA
/////////////////////////////////////////
const EmailTransportSchema = z.object({
  type: EmailTransportTypeSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  fromName: z.string(),
  fromAddress: z.string(),
  config: z.string()
});

export { EmailTransportSchema, EmailTransportSchema as default };
//# sourceMappingURL=EmailTransportSchema.js.map
