import { zEmail } from '../../../lib/utils/zod.js';
import { z } from 'zod';

const ZUpdateRecipientRequestSchema = z.object({
  id: z.number().min(1),
  name: z.string().optional(),
  email: zEmail().optional(),
  role: z.enum(['CC', 'SIGNER', 'VIEWER', 'APPROVER', 'ASSISTANT']).optional()
});
const ZUpdateRecipientResponseSchema = z.void();

export { ZUpdateRecipientRequestSchema, ZUpdateRecipientResponseSchema };
//# sourceMappingURL=update-recipient.types.js.map
