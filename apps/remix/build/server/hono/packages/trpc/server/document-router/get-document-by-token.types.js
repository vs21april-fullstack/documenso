import { DocumentDataSchema } from '../../../prisma/generated/zod/modelSchema/DocumentDataSchema.js';
import { z } from 'zod';

const ZGetDocumentByTokenRequestSchema = z.object({
  token: z.string().min(1)
});
const ZGetDocumentByTokenResponseSchema = z.object({
  documentData: DocumentDataSchema
});

export { ZGetDocumentByTokenRequestSchema, ZGetDocumentByTokenResponseSchema };
//# sourceMappingURL=get-document-by-token.types.js.map
