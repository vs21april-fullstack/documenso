import { RecipientRole } from '@prisma/client';
import { z } from 'zod';
import { zEmail } from '../utils/zod.js';

const ZDefaultRecipientSchema = z.object({
  email: zEmail(),
  name: z.string(),
  role: z.nativeEnum(RecipientRole)
});
const ZDefaultRecipientsSchema = z.array(ZDefaultRecipientSchema);

export { ZDefaultRecipientSchema, ZDefaultRecipientsSchema };
//# sourceMappingURL=default-recipients.js.map
