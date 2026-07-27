import { z } from 'zod';

const ZDeleteDocumentRequestSchema = z.object({
  id: z.string(),
  reason: z.string()
});
const ZDeleteDocumentResponseSchema = z.void();

export { ZDeleteDocumentRequestSchema, ZDeleteDocumentResponseSchema };
//# sourceMappingURL=delete-document.types.js.map
