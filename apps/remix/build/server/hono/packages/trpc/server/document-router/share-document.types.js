import { DocumentShareLinkSchema } from '../../../prisma/generated/zod/modelSchema/DocumentShareLinkSchema.js';
import { z } from 'zod';

const ZShareDocumentRequestSchema = z.object({
  documentId: z.number(),
  token: z.string().optional()
});
const ZShareDocumentResponseSchema = DocumentShareLinkSchema.pick({
  slug: true,
  email: true
});

export { ZShareDocumentRequestSchema, ZShareDocumentResponseSchema };
//# sourceMappingURL=share-document.types.js.map
