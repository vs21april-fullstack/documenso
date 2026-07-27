import { FieldSchema } from '../../prisma/generated/zod/modelSchema/FieldSchema.js';
import { Prisma, FieldType } from '@prisma/client';
import { z } from 'zod';
import { ZTextFieldMeta, ZSignatureFieldMeta, FIELD_SIGNATURE_META_DEFAULT_VALUES, ZInitialsFieldMeta, ZNameFieldMeta, ZEmailFieldMeta, ZDateFieldMeta, ZNumberFieldMeta, ZRadioFieldMeta, ZCheckboxFieldMeta, ZDropdownFieldMeta } from './field-meta.js';

/**
 * The full field response schema.
 *
 * If you need to return something different, adjust this file to utilise the:
 * - ZFieldSchema
 * - ZFieldLiteSchema
 * - ZFieldManySchema
 *
 * Setup similar to:
 * - ./documents.ts
 * - ./templates.ts
 */
const ZFieldSchema = FieldSchema.pick({
  envelopeId: true,
  envelopeItemId: true,
  type: true,
  id: true,
  secondaryId: true,
  recipientId: true,
  page: true,
  positionX: true,
  positionY: true,
  width: true,
  height: true,
  customText: true,
  inserted: true,
  fieldMeta: true
}).extend({
  // Backwards compatibility.
  documentId: z.number().nullish(),
  templateId: z.number().nullish()
});
const ZEnvelopeFieldSchema = ZFieldSchema.omit({
  documentId: true,
  templateId: true
});
const ZFieldPageNumberSchema = z.number().min(1).describe('The page number the field will be on.');
const ZFieldPageXSchema = z.number().min(0).describe('The X coordinate of where the field will be placed.');
const ZFieldPageYSchema = z.number().min(0).describe('The Y coordinate of where the field will be placed.');
const ZFieldWidthSchema = z.number().min(1).describe('The width of the field.');
const ZFieldHeightSchema = z.number().min(1).describe('The height of the field.');
const ZClampedFieldPositionXSchema = z.number().min(0).max(100).describe('The percentage based X coordinate where the field will be placed.');
const ZClampedFieldPositionYSchema = z.number().min(0).max(100).describe('The percentage based Y coordinate where the field will be placed.');
const ZClampedFieldWidthSchema = z.number().min(0).max(100).describe('The percentage based width of the field on the page.');
const ZClampedFieldHeightSchema = z.number().min(0).max(100).describe('The percentage based height of the field on the page.');
// ---------------------------------------------
const PrismaDecimalSchema = z.preprocess(val => typeof val === 'string' ? new Prisma.Decimal(val) : val, z.instanceof(Prisma.Decimal, {
  message: 'Must be a Decimal'
}));
const BaseFieldSchemaUsingNumbers = ZFieldSchema.extend({
  positionX: PrismaDecimalSchema,
  positionY: PrismaDecimalSchema,
  width: PrismaDecimalSchema,
  height: PrismaDecimalSchema
});
const ZFieldTextSchema = BaseFieldSchemaUsingNumbers.extend({
  type: z.literal(FieldType.TEXT),
  fieldMeta: ZTextFieldMeta
});
const ZFieldSignatureSchema = BaseFieldSchemaUsingNumbers.extend({
  type: z.literal(FieldType.SIGNATURE),
  fieldMeta: ZSignatureFieldMeta.catch(FIELD_SIGNATURE_META_DEFAULT_VALUES)
});
const ZFieldInitialsSchema = BaseFieldSchemaUsingNumbers.extend({
  type: z.literal(FieldType.INITIALS),
  fieldMeta: ZInitialsFieldMeta
});
const ZFieldNameSchema = BaseFieldSchemaUsingNumbers.extend({
  type: z.literal(FieldType.NAME),
  fieldMeta: ZNameFieldMeta
});
const ZFieldEmailSchema = BaseFieldSchemaUsingNumbers.extend({
  type: z.literal(FieldType.EMAIL),
  fieldMeta: ZEmailFieldMeta
});
const ZFieldDateSchema = BaseFieldSchemaUsingNumbers.extend({
  type: z.literal(FieldType.DATE),
  fieldMeta: ZDateFieldMeta
});
const ZFieldNumberSchema = BaseFieldSchemaUsingNumbers.extend({
  type: z.literal(FieldType.NUMBER),
  fieldMeta: ZNumberFieldMeta
});
const ZFieldRadioSchema = BaseFieldSchemaUsingNumbers.extend({
  type: z.literal(FieldType.RADIO),
  fieldMeta: ZRadioFieldMeta
});
const ZFieldCheckboxSchema = BaseFieldSchemaUsingNumbers.extend({
  type: z.literal(FieldType.CHECKBOX),
  fieldMeta: ZCheckboxFieldMeta
});
const ZFieldDropdownSchema = BaseFieldSchemaUsingNumbers.extend({
  type: z.literal(FieldType.DROPDOWN),
  fieldMeta: ZDropdownFieldMeta
});
/**
 * The full field schema which will enforce all types and meta fields.
 */
z.discriminatedUnion('type', [ZFieldTextSchema, ZFieldSignatureSchema, ZFieldInitialsSchema, ZFieldNameSchema, ZFieldEmailSchema, ZFieldDateSchema, ZFieldNumberSchema, ZFieldRadioSchema, ZFieldCheckboxSchema, ZFieldDropdownSchema]);

export { BaseFieldSchemaUsingNumbers, ZClampedFieldHeightSchema, ZClampedFieldPositionXSchema, ZClampedFieldPositionYSchema, ZClampedFieldWidthSchema, ZEnvelopeFieldSchema, ZFieldCheckboxSchema, ZFieldDateSchema, ZFieldDropdownSchema, ZFieldEmailSchema, ZFieldHeightSchema, ZFieldInitialsSchema, ZFieldNameSchema, ZFieldNumberSchema, ZFieldPageNumberSchema, ZFieldPageXSchema, ZFieldPageYSchema, ZFieldRadioSchema, ZFieldSchema, ZFieldSignatureSchema, ZFieldTextSchema, ZFieldWidthSchema };
//# sourceMappingURL=field.js.map
