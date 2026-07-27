import { z } from 'zod';

const ZDeleteApiTokenRequestSchema = z.object({
  id: z.number().min(1),
  teamId: z.number()
});
const ZDeleteApiTokenResponseSchema = z.void();

export { ZDeleteApiTokenRequestSchema, ZDeleteApiTokenResponseSchema };
//# sourceMappingURL=delete-api-token.types.js.map
