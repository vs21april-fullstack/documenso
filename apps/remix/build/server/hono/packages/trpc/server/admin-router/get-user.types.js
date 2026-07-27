import { UserSchema } from '../../../prisma/generated/zod/modelSchema/UserSchema.js';
import { z } from 'zod';

const ZGetUserRequestSchema = z.object({
  id: z.number().min(1)
});
const ZGetUserResponseSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  roles: true,
  disabled: true,
  twoFactorEnabled: true,
  signature: true
});

export { ZGetUserRequestSchema, ZGetUserResponseSchema };
//# sourceMappingURL=get-user.types.js.map
