import { ZNameSchema } from '../../../lib/types/name.js';
import { z } from 'zod';

const ZCreateUserRequestSchema = z.object({
  email: z.string().email().min(1),
  name: ZNameSchema
});
const ZCreateUserResponseSchema = z.object({
  userId: z.number()
});

export { ZCreateUserRequestSchema, ZCreateUserResponseSchema };
//# sourceMappingURL=create-user.types.js.map
