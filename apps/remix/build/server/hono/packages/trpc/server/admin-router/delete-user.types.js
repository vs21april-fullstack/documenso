import { z } from 'zod';

const ZDeleteUserRequestSchema = z.object({
  id: z.number().min(1)
});
const ZDeleteUserResponseSchema = z.void();

export { ZDeleteUserRequestSchema, ZDeleteUserResponseSchema };
//# sourceMappingURL=delete-user.types.js.map
