import { ZEnvelopeAttachmentTypeSchema } from '../../../../lib/types/envelope-attachment.js';
import { z } from 'zod';

const findAttachmentsMeta = {
  openapi: {
    method: 'GET',
    path: '/envelope/attachment',
    summary: 'Find attachments',
    description: 'Find all attachments for an envelope',
    tags: ['Envelope Attachments']
  }
};
const ZFindAttachmentsRequestSchema = z.object({
  envelopeId: z.string(),
  token: z.string().optional()
});
const ZFindAttachmentsResponseSchema = z.object({
  data: z.array(z.object({
    id: z.string(),
    type: ZEnvelopeAttachmentTypeSchema,
    label: z.string(),
    data: z.string()
  }))
});

export { ZFindAttachmentsRequestSchema, ZFindAttachmentsResponseSchema, findAttachmentsMeta };
//# sourceMappingURL=find-attachments.types.js.map
