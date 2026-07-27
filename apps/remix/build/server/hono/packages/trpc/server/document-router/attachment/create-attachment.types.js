import { z } from 'zod';

const ZCreateAttachmentRequestSchema = z.object({
  documentId: z.number(),
  data: z.object({
    label: z.string().min(1, 'Label is required'),
    data: z.string().url('Must be a valid URL')
  })
});
const ZCreateAttachmentResponseSchema = z.object({
  id: z.string()
});

export { ZCreateAttachmentRequestSchema, ZCreateAttachmentResponseSchema };
//# sourceMappingURL=create-attachment.types.js.map
