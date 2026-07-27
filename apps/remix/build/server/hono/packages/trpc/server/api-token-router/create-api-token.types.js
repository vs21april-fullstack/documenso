import { ZNameSchema } from '../../../lib/types/name.js';
import { z } from 'zod';

const ZCreateApiTokenRequestSchema = z.object({
  teamId: z.number(),
  tokenName: ZNameSchema,
  expirationDate: z.string().nullable()
});
const ZCreateApiTokenResponseSchema = z.object({
  id: z.number(),
  token: z.string()
});

export { ZCreateApiTokenRequestSchema, ZCreateApiTokenResponseSchema };
//# sourceMappingURL=create-api-token.types.js.map
