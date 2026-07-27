import { ZDocumentManySchema } from '../../../lib/types/document.js';
import { ZFindResultResponse, ZFindSearchParamsSchema } from '../../../lib/types/search-params.js';

// import type { OpenApiMeta } from 'trpc-to-openapi';
const ZFindInboxRequestSchema = ZFindSearchParamsSchema;
const ZFindInboxResponseSchema = ZFindResultResponse.extend({
  data: ZDocumentManySchema.array()
});

export { ZFindInboxRequestSchema, ZFindInboxResponseSchema };
//# sourceMappingURL=find-inbox.types.js.map
