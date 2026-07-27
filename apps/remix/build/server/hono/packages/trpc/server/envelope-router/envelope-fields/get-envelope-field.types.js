import { ZEnvelopeFieldSchema } from '../../../../lib/types/field.js';
import { z } from 'zod';

const getEnvelopeFieldMeta = {
  openapi: {
    method: 'GET',
    path: '/envelope/field/{fieldId}',
    summary: 'Get envelope field',
    description: 'Returns an envelope field given an ID',
    tags: ['Envelope Fields']
  }
};
const ZGetEnvelopeFieldRequestSchema = z.object({
  fieldId: z.number()
});
const ZGetEnvelopeFieldResponseSchema = ZEnvelopeFieldSchema;

export { ZGetEnvelopeFieldRequestSchema, ZGetEnvelopeFieldResponseSchema, getEnvelopeFieldMeta };
//# sourceMappingURL=get-envelope-field.types.js.map
