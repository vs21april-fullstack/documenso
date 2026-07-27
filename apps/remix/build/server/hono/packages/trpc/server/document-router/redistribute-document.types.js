import { z } from 'zod';
import { ZSuccessResponseSchema } from '../schema.js';

const redistributeDocumentMeta = {
  openapi: {
    method: 'POST',
    path: '/document/redistribute',
    summary: 'Redistribute document',
    description: 'Redistribute the document to the provided recipients who have not actioned the document. Will use the distribution method set in the document',
    tags: ['Document']
  }
};
const ZRedistributeDocumentRequestSchema = z.object({
  documentId: z.number(),
  recipients: z.array(z.number()).min(1).describe('The IDs of the recipients to redistribute the document to.')
});
const ZRedistributeDocumentResponseSchema = ZSuccessResponseSchema;

export { ZRedistributeDocumentRequestSchema, ZRedistributeDocumentResponseSchema, redistributeDocumentMeta };
//# sourceMappingURL=redistribute-document.types.js.map
