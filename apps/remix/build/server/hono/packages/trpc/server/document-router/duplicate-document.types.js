import { z } from 'zod';

const duplicateDocumentMeta = {
  openapi: {
    method: 'POST',
    path: '/document/duplicate',
    summary: 'Duplicate document',
    tags: ['Document']
  }
};
const ZDuplicateDocumentRequestSchema = z.object({
  documentId: z.number()
});
const ZDuplicateDocumentResponseSchema = z.object({
  id: z.string().describe('The envelope ID'),
  documentId: z.number().describe('The legacy document ID')
});

export { ZDuplicateDocumentRequestSchema, ZDuplicateDocumentResponseSchema, duplicateDocumentMeta };
//# sourceMappingURL=duplicate-document.types.js.map
