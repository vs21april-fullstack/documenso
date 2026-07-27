import { ZClampedFieldHeightSchema, ZClampedFieldWidthSchema, ZClampedFieldPositionYSchema, ZClampedFieldPositionXSchema, ZEnvelopeFieldSchema } from '../../../lib/types/field.js';
import { ZFieldMetaSchema } from '../../../lib/types/field-meta.js';
import { FieldType, EnvelopeType } from '@prisma/client';
import { z } from 'zod';

const ZSetEnvelopeFieldsRequestSchema = z.object({
  envelopeId: z.string(),
  envelopeType: z.nativeEnum(EnvelopeType),
  fields: z.array(
  // Todo: Envelopes - Use strict schema for types + field meta.
  z.object({
    id: z.number().optional().describe('The id of the field. If not provided, a new field will be created.'),
    formId: z.string().optional().describe('A temporary ID to keep track of new fields created'),
    envelopeItemId: z.string().describe('The id of the envelope item to put the field on'),
    recipientId: z.number(),
    type: z.nativeEnum(FieldType),
    page: z.number().min(1).describe('The page number of the field on the envelope. Starts from 1.'),
    positionX: ZClampedFieldPositionXSchema,
    positionY: ZClampedFieldPositionYSchema,
    width: ZClampedFieldWidthSchema,
    height: ZClampedFieldHeightSchema,
    fieldMeta: ZFieldMetaSchema
  }))
});
const ZSetEnvelopeFieldsResponseSchema = z.object({
  data: ZEnvelopeFieldSchema.extend({
    formId: z.string().optional()
  }).array()
});

export { ZSetEnvelopeFieldsRequestSchema, ZSetEnvelopeFieldsResponseSchema };
//# sourceMappingURL=set-envelope-fields.types.js.map
