import { z } from 'zod';

const ZDeletePasskeyRequestSchema = z.object({
  passkeyId: z.string().trim().min(1)
});
const ZDeletePasskeyResponseSchema = z.void();

export { ZDeletePasskeyRequestSchema, ZDeletePasskeyResponseSchema };
//# sourceMappingURL=delete-passkey.types.js.map
