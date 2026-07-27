import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema.js';

/////////////////////////////////////////
// PASSKEY SCHEMA
/////////////////////////////////////////
const PasskeySchema = z.object({
  id: z.string(),
  userId: z.number(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  lastUsedAt: z.coerce.date().nullable(),
  credentialId: z.instanceof(Uint8Array),
  credentialPublicKey: z.instanceof(Uint8Array),
  counter: z.bigint(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  /**
   * [string[]]
   */
  transports: JsonValueSchema
});

export { PasskeySchema, PasskeySchema as default };
//# sourceMappingURL=PasskeySchema.js.map
