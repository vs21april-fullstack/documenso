import { z } from 'zod';

const ZResetTwoFactorRequestSchema = z.object({
  userId: z.number()
});
const ZResetTwoFactorResponseSchema = z.void();

export { ZResetTwoFactorRequestSchema, ZResetTwoFactorResponseSchema };
//# sourceMappingURL=reset-two-factor-authentication.types.js.map
