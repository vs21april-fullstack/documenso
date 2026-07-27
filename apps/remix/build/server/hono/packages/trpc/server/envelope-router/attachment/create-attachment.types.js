import { isHttpUrl } from '../../../../lib/utils/is-http-url.js';
import { z } from 'zod';

const createAttachmentMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/attachment/create',
    summary: 'Create attachment',
    description: 'Create a new attachment for an envelope',
    tags: ['Envelope Attachments']
  }
};
const ZCreateAttachmentRequestSchema = z.object({
  envelopeId: z.string(),
  data: z.object({
    label: z.string().min(1, 'Label is required'),
    data: z.string().url('Must be a valid URL').refine(isHttpUrl, 'URL must use the http or https protocol')
  })
});
const ZCreateAttachmentResponseSchema = z.object({
  id: z.string()
});

export { ZCreateAttachmentRequestSchema, ZCreateAttachmentResponseSchema, createAttachmentMeta };
//# sourceMappingURL=create-attachment.types.js.map
