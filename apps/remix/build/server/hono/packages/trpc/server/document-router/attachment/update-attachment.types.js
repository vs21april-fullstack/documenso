import { z } from 'zod';
import { ZSuccessResponseSchema } from '../../schema.js';

const ZUpdateAttachmentRequestSchema = z.object({
  id: z.string(),
  data: z.object({
    label: z.string().min(1, 'Label is required'),
    data: z.string().url('Must be a valid URL')
  })
});
const ZUpdateAttachmentResponseSchema = ZSuccessResponseSchema;

export { ZUpdateAttachmentRequestSchema, ZUpdateAttachmentResponseSchema };
//# sourceMappingURL=update-attachment.types.js.map
