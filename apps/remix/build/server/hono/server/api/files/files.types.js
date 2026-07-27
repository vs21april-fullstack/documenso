import { DocumentDataSchema } from '../../../packages/prisma/generated/zod/modelSchema/DocumentDataSchema.js';
import { z } from 'zod';

const ZUploadPdfRequestSchema = z.object({
  file: z.instanceof(File)
});
DocumentDataSchema.pick({
  type: true,
  id: true
});
const ZGetEnvelopeItemFileRequestParamsSchema = z.object({
  envelopeId: z.string().min(1),
  envelopeItemId: z.string().min(1)
});
const ZGetEnvelopeItemFileRequestQuerySchema = z.object({
  token: z.string().optional()
});
const ZGetEnvelopeItemFileTokenRequestParamsSchema = z.object({
  token: z.string().min(1),
  envelopeItemId: z.string().min(1)
});
const ZGetEnvelopeItemFileDownloadRequestParamsSchema = z.object({
  envelopeId: z.string().min(1),
  envelopeItemId: z.string().min(1),
  version: z.enum(['signed', 'original', 'pending']).default('signed')
});
const ZGetEnvelopeItemFileTokenDownloadRequestParamsSchema = z.object({
  token: z.string().min(1),
  envelopeItemId: z.string().min(1),
  version: z.enum(['signed', 'original']).default('signed')
});

export { ZGetEnvelopeItemFileDownloadRequestParamsSchema, ZGetEnvelopeItemFileRequestParamsSchema, ZGetEnvelopeItemFileRequestQuerySchema, ZGetEnvelopeItemFileTokenDownloadRequestParamsSchema, ZGetEnvelopeItemFileTokenRequestParamsSchema, ZUploadPdfRequestSchema };
//# sourceMappingURL=files.types.js.map
