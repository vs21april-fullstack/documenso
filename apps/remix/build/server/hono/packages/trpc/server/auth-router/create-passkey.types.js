import { ZNameSchema } from '../../../lib/types/name.js';
import { ZRegistrationResponseJSONSchema } from '../../../lib/types/webauthn.js';
import { z } from 'zod';

const ZCreatePasskeyRequestSchema = z.object({
  passkeyName: ZNameSchema,
  verificationResponse: ZRegistrationResponseJSONSchema
});
const ZCreatePasskeyResponseSchema = z.void();

export { ZCreatePasskeyRequestSchema, ZCreatePasskeyResponseSchema };
//# sourceMappingURL=create-passkey.types.js.map
