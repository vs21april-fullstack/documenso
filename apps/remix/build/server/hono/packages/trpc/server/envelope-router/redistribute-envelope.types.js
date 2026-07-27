import { z } from 'zod';
import { ZSuccessResponseSchema } from '../schema.js';
import { ZRecipientWithSigningUrlSchema } from './schema.js';

const redistributeEnvelopeMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/redistribute',
    summary: 'Redistribute envelope',
    description: 'Redistribute the envelope to the provided recipients who have not actioned the envelope. Will use the distribution method set in the envelope',
    tags: ['Envelope']
  }
};
const ZRedistributeEnvelopeRequestSchema = z.object({
  envelopeId: z.string(),
  recipients: z.array(z.number()).min(1).describe('The IDs of the recipients to redistribute the envelope to.')
});
const ZRedistributeEnvelopeResponseSchema = ZSuccessResponseSchema.extend({
  id: z.string().describe('The ID of the envelope that was redistributed.'),
  recipients: ZRecipientWithSigningUrlSchema.array()
});

export { ZRedistributeEnvelopeRequestSchema, ZRedistributeEnvelopeResponseSchema, redistributeEnvelopeMeta };
//# sourceMappingURL=redistribute-envelope.types.js.map
