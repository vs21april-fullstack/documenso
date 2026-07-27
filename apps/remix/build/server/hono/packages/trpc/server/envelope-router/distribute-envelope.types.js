import { ZDocumentMetaUpdateSchema } from '../../../lib/types/document-meta.js';
import { z } from 'zod';
import { ZSuccessResponseSchema } from '../schema.js';
import { ZRecipientWithSigningUrlSchema } from './schema.js';

const distributeEnvelopeMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/distribute',
    summary: 'Distribute envelope',
    description: 'Send the envelope to recipients based on your distribution method',
    tags: ['Envelope']
  }
};
const ZDistributeEnvelopeRequestSchema = z.object({
  envelopeId: z.string().describe('The ID of the envelope to send.'),
  meta: ZDocumentMetaUpdateSchema.pick({
    subject: true,
    message: true,
    timezone: true,
    dateFormat: true,
    distributionMethod: true,
    redirectUrl: true,
    language: true,
    emailId: true,
    emailReplyTo: true,
    emailSettings: true
  }).optional()
});
const ZDistributeEnvelopeResponseSchema = ZSuccessResponseSchema.extend({
  id: z.string().describe('The ID of the envelope that was sent.'),
  recipients: ZRecipientWithSigningUrlSchema.array()
});

export { ZDistributeEnvelopeRequestSchema, ZDistributeEnvelopeResponseSchema, distributeEnvelopeMeta };
//# sourceMappingURL=distribute-envelope.types.js.map
