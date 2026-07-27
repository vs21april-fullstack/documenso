import { z } from 'zod';

const ZSearchDocumentRequestSchema = z.object({
  query: z.string().trim().min(1).max(1024)
});
const ZSearchDocumentResponseSchema = z.object({
  title: z.string(),
  path: z.string(),
  value: z.string()
}).array();

export { ZSearchDocumentRequestSchema, ZSearchDocumentResponseSchema };
//# sourceMappingURL=search-document.types.js.map
