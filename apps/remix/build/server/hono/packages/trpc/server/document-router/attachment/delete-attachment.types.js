import { z } from 'zod';
import { ZSuccessResponseSchema } from '../../schema.js';

const ZDeleteAttachmentRequestSchema = z.object({
  id: z.string()
});
const ZDeleteAttachmentResponseSchema = ZSuccessResponseSchema;

export { ZDeleteAttachmentRequestSchema, ZDeleteAttachmentResponseSchema };
//# sourceMappingURL=delete-attachment.types.js.map
