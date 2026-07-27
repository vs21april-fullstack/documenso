import { ZDocumentManySchema } from '../../../lib/types/document.js';
import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { z } from 'zod';

const ZFindDocumentsRequestSchema = ZFindSearchParamsSchema.extend({
  perPage: z.number().optional().default(20)
});
const ZFindDocumentsResponseSchema = ZFindResultResponse.extend({
  data: ZDocumentManySchema.omit({
    team: true
  }).array()
});

export { ZFindDocumentsRequestSchema, ZFindDocumentsResponseSchema };
//# sourceMappingURL=find-documents.types.js.map
