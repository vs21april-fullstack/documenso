import { ZDocumentManySchema } from '../../../lib/types/document.js';
import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { DocumentStatus, DocumentSource } from '@prisma/client';
import { z } from 'zod';

const ZFindDocumentsMeta = {
  openapi: {
    method: 'GET',
    path: '/document',
    summary: 'Find documents',
    description: 'Find documents based on a search criteria',
    tags: ['Document']
  }
};
const ZFindDocumentsRequestSchema = ZFindSearchParamsSchema.extend({
  templateId: z.number().describe('Filter documents by the template ID used to create it.').optional(),
  source: z.nativeEnum(DocumentSource).describe('Filter documents by how it was created.').optional(),
  status: z.nativeEnum(DocumentStatus).describe('Filter documents by the current status').optional(),
  folderId: z.string().describe('Filter documents by folder ID').optional(),
  orderByColumn: z.enum(['createdAt']).optional(),
  orderByDirection: z.enum(['asc', 'desc']).describe('').default('desc')
});
const ZFindDocumentsResponseSchema = ZFindResultResponse.extend({
  data: ZDocumentManySchema.array()
});

export { ZFindDocumentsMeta, ZFindDocumentsRequestSchema, ZFindDocumentsResponseSchema };
//# sourceMappingURL=find-documents.types.js.map
