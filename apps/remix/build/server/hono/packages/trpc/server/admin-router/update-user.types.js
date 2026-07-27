import { ZNameSchema } from '../../../lib/types/name.js';
import { zEmail } from '../../../lib/utils/zod.js';
import { Role } from '@prisma/client';
import { z } from 'zod';

const ZUpdateUserRequestSchema = z.object({
  id: z.number().min(1),
  name: ZNameSchema.nullish(),
  email: zEmail().optional(),
  roles: z.array(z.nativeEnum(Role)).optional()
});
const ZUpdateUserResponseSchema = z.void();

export { ZUpdateUserRequestSchema, ZUpdateUserResponseSchema };
//# sourceMappingURL=update-user.types.js.map
