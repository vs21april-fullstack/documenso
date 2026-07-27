import { ZEnvelopeRecipientSchema } from '../../../../lib/types/recipient.js';
import { z } from 'zod';

const getEnvelopeRecipientMeta = {
  openapi: {
    method: 'GET',
    path: '/envelope/recipient/{recipientId}',
    summary: 'Get envelope recipient',
    description: 'Returns an envelope recipient given an ID',
    tags: ['Envelope Recipients']
  }
};
const ZGetEnvelopeRecipientRequestSchema = z.object({
  recipientId: z.number()
});
const ZGetEnvelopeRecipientResponseSchema = ZEnvelopeRecipientSchema;

export { ZGetEnvelopeRecipientRequestSchema, ZGetEnvelopeRecipientResponseSchema, getEnvelopeRecipientMeta };
//# sourceMappingURL=get-envelope-recipient.types.js.map
