import { RecipientSchema } from '../../../prisma/generated/zod/modelSchema/RecipientSchema.js';
import { z } from 'zod';

// Common schemas between envelope routes.
const ZRecipientWithSigningUrlSchema = RecipientSchema.pick({
  id: true,
  name: true,
  email: true,
  token: true,
  role: true,
  signingOrder: true
}).extend({
  signingUrl: z.string().describe('The URL which the recipient uses to sign the document.')
});

export { ZRecipientWithSigningUrlSchema };
//# sourceMappingURL=schema.js.map
