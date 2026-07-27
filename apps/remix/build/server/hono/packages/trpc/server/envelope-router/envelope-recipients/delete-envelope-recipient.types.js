import { z } from 'zod';
import { ZSuccessResponseSchema } from '../../schema.js';

const deleteEnvelopeRecipientMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/recipient/delete',
    summary: 'Delete envelope recipient',
    description: 'Delete an envelope recipient',
    tags: ['Envelope Recipients']
  }
};
const ZDeleteEnvelopeRecipientRequestSchema = z.object({
  recipientId: z.number()
});
const ZDeleteEnvelopeRecipientResponseSchema = ZSuccessResponseSchema;

export { ZDeleteEnvelopeRecipientRequestSchema, ZDeleteEnvelopeRecipientResponseSchema, deleteEnvelopeRecipientMeta };
//# sourceMappingURL=delete-envelope-recipient.types.js.map
