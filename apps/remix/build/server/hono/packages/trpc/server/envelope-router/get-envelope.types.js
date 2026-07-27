import { ZEnvelopeSchema } from '../../../lib/types/envelope.js';
import { z } from 'zod';

const getEnvelopeMeta = {
  openapi: {
    method: 'GET',
    path: '/envelope/{envelopeId}',
    summary: 'Get envelope',
    description: 'Returns an envelope given an ID',
    tags: ['Envelope']
  }
};
const ZGetEnvelopeRequestSchema = z.object({
  envelopeId: z.string()
});
const ZGetEnvelopeResponseSchema = ZEnvelopeSchema;

export { ZGetEnvelopeRequestSchema, ZGetEnvelopeResponseSchema, getEnvelopeMeta };
//# sourceMappingURL=get-envelope.types.js.map
