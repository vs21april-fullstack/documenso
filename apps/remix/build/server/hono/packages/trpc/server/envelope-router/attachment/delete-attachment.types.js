import { z } from 'zod';
import { ZSuccessResponseSchema } from '../../schema.js';

const deleteAttachmentMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/attachment/delete',
    summary: 'Delete attachment',
    description: 'Delete an attachment from an envelope',
    tags: ['Envelope Attachments']
  }
};
const ZDeleteAttachmentRequestSchema = z.object({
  id: z.string()
});
const ZDeleteAttachmentResponseSchema = ZSuccessResponseSchema;

export { ZDeleteAttachmentRequestSchema, ZDeleteAttachmentResponseSchema, deleteAttachmentMeta };
//# sourceMappingURL=delete-attachment.types.js.map
