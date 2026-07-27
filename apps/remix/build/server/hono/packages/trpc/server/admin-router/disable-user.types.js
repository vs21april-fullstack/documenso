import { z } from 'zod';

const ZDisableUserRequestSchema = z.object({
  id: z.number().min(1)
});
const ZDisableUserResponseSchema = z.void();

export { ZDisableUserRequestSchema, ZDisableUserResponseSchema };
//# sourceMappingURL=disable-user.types.js.map
