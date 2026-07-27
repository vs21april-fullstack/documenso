import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { FieldTypeSchema } from '../inputTypeSchemas/FieldTypeSchema.js';
import { ZFieldMetaNotOptionalSchema } from '../../../../lib/types/field-meta.js';

/////////////////////////////////////////
// FIELD SCHEMA
/////////////////////////////////////////
const FieldSchema = z.object({
  type: FieldTypeSchema,
  id: z.number(),
  secondaryId: z.string(),
  envelopeId: z.string(),
  envelopeItemId: z.string(),
  recipientId: z.number(),
  page: z.number().describe("The page number of the field on the document. Starts from 1."),
  positionX: z.instanceof(Prisma.Decimal, {
    message: "Field 'positionX' must be a Decimal. Location: ['Models', 'Field']"
  }),
  positionY: z.instanceof(Prisma.Decimal, {
    message: "Field 'positionY' must be a Decimal. Location: ['Models', 'Field']"
  }),
  width: z.instanceof(Prisma.Decimal, {
    message: "Field 'width' must be a Decimal. Location: ['Models', 'Field']"
  }),
  height: z.instanceof(Prisma.Decimal, {
    message: "Field 'height' must be a Decimal. Location: ['Models', 'Field']"
  }),
  customText: z.string(),
  inserted: z.boolean(),
  /**
   * [FieldMeta]
   */
  fieldMeta: ZFieldMetaNotOptionalSchema.nullable()
});

export { FieldSchema, FieldSchema as default };
//# sourceMappingURL=FieldSchema.js.map
