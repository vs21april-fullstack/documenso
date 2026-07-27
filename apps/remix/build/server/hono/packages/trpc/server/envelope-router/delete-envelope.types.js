import { z } from 'zod';
import { ZSuccessResponseSchema } from '../schema.js';

const deleteEnvelopeMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/delete',
    summary: 'Delete envelope',
    tags: ['Envelope']
  }
};
const ZDeleteEnvelopeRequestSchema = z.object({
  envelopeId: z.string()
});
const ZDeleteEnvelopeResponseSchema = ZSuccessResponseSchema;

export { ZDeleteEnvelopeRequestSchema, ZDeleteEnvelopeResponseSchema, deleteEnvelopeMeta };
//# sourceMappingURL=delete-envelope.types.js.map
