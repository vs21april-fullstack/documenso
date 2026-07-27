import { z } from 'zod';
import { ZSuccessResponseSchema } from '../../schema.js';

const deleteEnvelopeFieldMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/field/delete',
    summary: 'Delete envelope field',
    description: 'Delete an envelope field',
    tags: ['Envelope Fields']
  }
};
const ZDeleteEnvelopeFieldRequestSchema = z.object({
  fieldId: z.number()
});
const ZDeleteEnvelopeFieldResponseSchema = ZSuccessResponseSchema;

export { ZDeleteEnvelopeFieldRequestSchema, ZDeleteEnvelopeFieldResponseSchema, deleteEnvelopeFieldMeta };
//# sourceMappingURL=delete-envelope-field.types.js.map
