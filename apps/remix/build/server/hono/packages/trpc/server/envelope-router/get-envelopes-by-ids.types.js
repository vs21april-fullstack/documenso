import { ZEnvelopeSchema } from '../../../lib/types/envelope.js';
import { z } from 'zod';

const getEnvelopesByIdsMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/get-many',
    summary: 'Get multiple envelopes',
    description: 'Retrieve multiple envelopes by their IDs',
    tags: ['Envelope']
  }
};
const ZEnvelopeIdsSchema = z.discriminatedUnion('type', [z.object({
  type: z.literal('envelopeId'),
  ids: z.array(z.string()).min(1).max(20)
}), z.object({
  type: z.literal('documentId'),
  ids: z.array(z.number()).min(1).max(20)
}), z.object({
  type: z.literal('templateId'),
  ids: z.array(z.number()).min(1).max(20)
})]);
const ZGetEnvelopesByIdsRequestSchema = z.object({
  ids: ZEnvelopeIdsSchema
});
const ZGetEnvelopesByIdsResponseSchema = z.object({
  data: z.array(ZEnvelopeSchema)
});

export { ZEnvelopeIdsSchema, ZGetEnvelopesByIdsRequestSchema, ZGetEnvelopesByIdsResponseSchema, getEnvelopesByIdsMeta };
//# sourceMappingURL=get-envelopes-by-ids.types.js.map
