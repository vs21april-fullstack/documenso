import { z } from 'zod';
import { ZSuccessResponseSchema } from '../schema.js';

const cancelEnvelopeMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/cancel',
    summary: 'Cancel envelope',
    tags: ['Envelope']
  }
};
const ZCancelEnvelopeRequestSchema = z.object({
  envelopeId: z.string(),
  reason: z.string().optional()
});
const ZCancelEnvelopeResponseSchema = ZSuccessResponseSchema;

export { ZCancelEnvelopeRequestSchema, ZCancelEnvelopeResponseSchema, cancelEnvelopeMeta };
//# sourceMappingURL=cancel-envelope.types.js.map
