import { isHttpUrl } from '../../../../lib/utils/is-http-url.js';
import { z } from 'zod';
import { ZSuccessResponseSchema } from '../../schema.js';

const updateAttachmentMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/attachment/update',
    summary: 'Update attachment',
    description: 'Update an existing attachment',
    tags: ['Envelope Attachments']
  }
};
const ZUpdateAttachmentRequestSchema = z.object({
  id: z.string(),
  data: z.object({
    label: z.string().min(1, 'Label is required'),
    data: z.string().url('Must be a valid URL').refine(isHttpUrl, 'URL must use the http or https protocol')
  })
});
const ZUpdateAttachmentResponseSchema = ZSuccessResponseSchema;

export { ZUpdateAttachmentRequestSchema, ZUpdateAttachmentResponseSchema, updateAttachmentMeta };
//# sourceMappingURL=update-attachment.types.js.map
