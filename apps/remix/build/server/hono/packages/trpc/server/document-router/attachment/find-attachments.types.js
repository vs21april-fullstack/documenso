import { ZEnvelopeAttachmentTypeSchema } from '../../../../lib/types/envelope-attachment.js';
import { z } from 'zod';

const ZFindAttachmentsRequestSchema = z.object({
  documentId: z.number()
});
const ZFindAttachmentsResponseSchema = z.object({
  data: z.array(z.object({
    id: z.string(),
    type: ZEnvelopeAttachmentTypeSchema,
    label: z.string(),
    data: z.string()
  }))
});

export { ZFindAttachmentsRequestSchema, ZFindAttachmentsResponseSchema };
//# sourceMappingURL=find-attachments.types.js.map
