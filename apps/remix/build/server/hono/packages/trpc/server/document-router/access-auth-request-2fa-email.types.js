import { z } from 'zod';

const ZAccessAuthRequest2FAEmailRequestSchema = z.object({
  token: z.string().min(1)
});
const ZAccessAuthRequest2FAEmailResponseSchema = z.object({
  success: z.boolean(),
  expiresAt: z.date()
});

export { ZAccessAuthRequest2FAEmailRequestSchema, ZAccessAuthRequest2FAEmailResponseSchema };
//# sourceMappingURL=access-auth-request-2fa-email.types.js.map
