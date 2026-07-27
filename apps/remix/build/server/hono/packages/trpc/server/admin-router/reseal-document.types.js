import { z } from 'zod';

const ZResealDocumentRequestSchema = z.object({
  id: z.string()
});
const ZResealDocumentResponseSchema = z.void();

export { ZResealDocumentRequestSchema, ZResealDocumentResponseSchema };
//# sourceMappingURL=reseal-document.types.js.map
