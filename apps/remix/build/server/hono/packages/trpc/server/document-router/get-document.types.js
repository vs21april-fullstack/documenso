import { ZDocumentSchema } from '../../../lib/types/document.js';
import { z } from 'zod';

const getDocumentMeta = {
  openapi: {
    method: 'GET',
    path: '/document/{documentId}',
    summary: 'Get document',
    description: 'Returns a document given an ID',
    tags: ['Document']
  }
};
const ZGetDocumentRequestSchema = z.object({
  documentId: z.number()
});
const ZGetDocumentResponseSchema = ZDocumentSchema;

export { ZGetDocumentRequestSchema, ZGetDocumentResponseSchema, getDocumentMeta };
//# sourceMappingURL=get-document.types.js.map
