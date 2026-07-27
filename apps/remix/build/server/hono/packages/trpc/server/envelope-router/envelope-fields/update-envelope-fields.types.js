import { ZFieldSchema } from '../../../../lib/types/field.js';
import { ZEnvelopeFieldAndMetaSchema } from '../../../../lib/types/field-meta.js';
import { z } from 'zod';
import { ZCoordinatePositionSchema } from './create-envelope-fields.types.js';

const updateEnvelopeFieldsMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/field/update-many',
    summary: 'Update envelope fields',
    description: 'Update multiple envelope fields for an envelope',
    tags: ['Envelope Fields']
  }
};
const ZUpdateFieldBaseSchema = ZEnvelopeFieldAndMetaSchema.and(z.object({
  id: z.number().describe('The ID of the field to update.'),
  envelopeItemId: z.string().optional().describe('The ID of the envelope item to put the field on. If not provided, field will be placed on the first item.')
}));
// !: Later on we should support placeholders for updates, but since we didn't do the
// !: neccesary plumbing for updates in the initial release, we can hold off for now.
// const ZUpdateFieldSchema = z.union([
//   ZUpdateFieldBaseSchema.and(ZCoordinatePositionSchema),
//   ZUpdateFieldBaseSchema.and(ZPlaceholderPositionSchema),
// ]);
const ZUpdateFieldSchema = ZUpdateFieldBaseSchema.and(ZCoordinatePositionSchema.partial());
const ZUpdateEnvelopeFieldsRequestSchema = z.object({
  envelopeId: z.string(),
  data: ZUpdateFieldSchema.array()
});
const ZUpdateEnvelopeFieldsResponseSchema = z.object({
  data: z.array(ZFieldSchema)
});

export { ZUpdateEnvelopeFieldsRequestSchema, ZUpdateEnvelopeFieldsResponseSchema, updateEnvelopeFieldsMeta };
//# sourceMappingURL=update-envelope-fields.types.js.map
