import { ZDocumentManySchema } from '../../../lib/types/document.js';
import { ZFindResultResponse } from '../../../lib/types/search-params.js';
import { ExtendedDocumentStatus } from '../../../prisma/types/extended-document-status.js';
import { z } from 'zod';
import { ZFindDocumentsRequestSchema } from './find-documents.types.js';

const ZFindDocumentsInternalRequestSchema = ZFindDocumentsRequestSchema.extend({
  period: z.enum(['7d', '14d', '30d']).optional(),
  senderIds: z.array(z.number()).optional(),
  status: z.nativeEnum(ExtendedDocumentStatus).optional(),
  folderId: z.string().optional()
});
const ZFindDocumentsInternalResponseSchema = ZFindResultResponse.extend({
  data: ZDocumentManySchema.array(),
  stats: z.object({
    [ExtendedDocumentStatus.DRAFT]: z.number(),
    [ExtendedDocumentStatus.PENDING]: z.number(),
    [ExtendedDocumentStatus.COMPLETED]: z.number(),
    [ExtendedDocumentStatus.REJECTED]: z.number(),
    [ExtendedDocumentStatus.CANCELLED]: z.number(),
    [ExtendedDocumentStatus.INBOX]: z.number(),
    [ExtendedDocumentStatus.ALL]: z.number()
  })
});

export { ZFindDocumentsInternalRequestSchema, ZFindDocumentsInternalResponseSchema };
//# sourceMappingURL=find-documents-internal.types.js.map
