import { z } from 'zod';
import { ApiTokenAlgorithmSchema } from '../inputTypeSchemas/ApiTokenAlgorithmSchema.js';

/////////////////////////////////////////
// API TOKEN SCHEMA
/////////////////////////////////////////
const ApiTokenSchema = z.object({
  algorithm: ApiTokenAlgorithmSchema,
  id: z.number(),
  name: z.string(),
  token: z.string(),
  expires: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  userId: z.number().nullable(),
  teamId: z.number()
});

export { ApiTokenSchema, ApiTokenSchema as default };
//# sourceMappingURL=ApiTokenSchema.js.map
