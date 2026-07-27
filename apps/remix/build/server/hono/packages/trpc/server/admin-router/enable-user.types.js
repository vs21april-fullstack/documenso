import { z } from 'zod';

const ZEnableUserRequestSchema = z.object({
  id: z.number().min(1)
});
const ZEnableUserResponseSchema = z.void();

export { ZEnableUserRequestSchema, ZEnableUserResponseSchema };
//# sourceMappingURL=enable-user.types.js.map
