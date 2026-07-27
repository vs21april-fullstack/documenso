import { ZDocumentManySchema } from '../../../lib/types/document.js';
import { z } from 'zod';

const getDocumentsByIdsMeta = {
  openapi: {
    method: 'POST',
    path: '/document/get-many',
    summary: 'Get multiple documents',
    description: 'Retrieve multiple documents by their IDs',
    tags: ['Document']
  }
};
const ZGetDocumentsByIdsRequestSchema = z.object({
  documentIds: z.array(z.number()).min(1)
});
const ZGetDocumentsByIdsResponseSchema = z.object({
  data: z.array(ZDocumentManySchema)
});

export { ZGetDocumentsByIdsRequestSchema, ZGetDocumentsByIdsResponseSchema, getDocumentsByIdsMeta };
//# sourceMappingURL=get-documents-by-ids.types.js.map
