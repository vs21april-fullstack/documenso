import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { PasskeySchema } from '../../../prisma/generated/zod/modelSchema/PasskeySchema.js';
import { z } from 'zod';

const ZFindPasskeysRequestSchema = ZFindSearchParamsSchema.extend({
  orderBy: z.object({
    column: z.enum(['createdAt', 'updatedAt', 'name']),
    direction: z.enum(['asc', 'desc'])
  }).optional()
});
const ZFindPasskeysResponseSchema = ZFindResultResponse.extend({
  data: z.array(PasskeySchema.pick({
    id: true,
    userId: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    lastUsedAt: true,
    counter: true,
    credentialDeviceType: true,
    credentialBackedUp: true,
    transports: true
  }))
});

export { ZFindPasskeysRequestSchema, ZFindPasskeysResponseSchema };
//# sourceMappingURL=find-passkeys.types.js.map
