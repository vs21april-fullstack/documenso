import { z } from 'zod';
import { ZSuccessResponseSchema } from '../schema.js';

const deleteDocumentMeta = {
  openapi: {
    method: 'POST',
    path: '/document/delete',
    summary: 'Delete document',
    tags: ['Document']
  }
};
const ZDeleteDocumentRequestSchema = z.object({
  documentId: z.number()
});
const ZDeleteDocumentResponseSchema = ZSuccessResponseSchema;

export { ZDeleteDocumentRequestSchema, ZDeleteDocumentResponseSchema, deleteDocumentMeta };
//# sourceMappingURL=delete-document.types.js.map
