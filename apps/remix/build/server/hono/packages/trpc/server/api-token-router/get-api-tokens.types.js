import { ApiTokenSchema } from '../../../prisma/generated/zod/modelSchema/ApiTokenSchema.js';
import { z } from 'zod';

const ZGetApiTokensRequestSchema = z.void();
const ZGetApiTokensResponseSchema = z.array(ApiTokenSchema.pick({
  id: true,
  name: true,
  createdAt: true,
  expires: true
}));

export { ZGetApiTokensRequestSchema, ZGetApiTokensResponseSchema };
//# sourceMappingURL=get-api-tokens.types.js.map
