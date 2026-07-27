import { ZNameSchema } from '../../../lib/types/name.js';
import { z } from 'zod';

const ZUpdatePasskeyRequestSchema = z.object({
  passkeyId: z.string().trim().min(1),
  name: ZNameSchema
});
const ZUpdatePasskeyResponseSchema = z.void();

export { ZUpdatePasskeyRequestSchema, ZUpdatePasskeyResponseSchema };
//# sourceMappingURL=update-passkey.types.js.map
