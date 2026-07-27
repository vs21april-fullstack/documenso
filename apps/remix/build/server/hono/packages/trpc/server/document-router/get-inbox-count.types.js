import { ReadStatus } from '@prisma/client';
import { z } from 'zod';

// import type { OpenApiMeta } from 'trpc-to-openapi';
const ZGetInboxCountRequestSchema = z.object({
  readStatus: z.nativeEnum(ReadStatus).optional()
}).optional();
const ZGetInboxCountResponseSchema = z.object({
  count: z.number()
});

export { ZGetInboxCountRequestSchema, ZGetInboxCountResponseSchema };
//# sourceMappingURL=get-inbox-count.types.js.map
