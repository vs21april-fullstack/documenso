import { ZRecipientActionAuthSchema } from '../../../lib/types/document-auth.js';
import { ZFieldHeightSchema, ZFieldWidthSchema, ZFieldPageYSchema, ZFieldPageXSchema, ZFieldPageNumberSchema, ZFieldSchema } from '../../../lib/types/field.js';
import { ZFieldAndMetaSchema, ZFieldMetaSchema } from '../../../lib/types/field-meta.js';
import { FieldType } from '@prisma/client';
import { z } from 'zod';

const ZCreateFieldSchema = ZFieldAndMetaSchema.and(z.object({
  recipientId: z.number().describe('The ID of the recipient to create the field for.'),
  pageNumber: ZFieldPageNumberSchema,
  pageX: ZFieldPageXSchema,
  pageY: ZFieldPageYSchema,
  width: ZFieldWidthSchema,
  height: ZFieldHeightSchema
}));
const ZUpdateFieldSchema = ZFieldAndMetaSchema.and(z.object({
  id: z.number().describe('The ID of the field to update.'),
  pageNumber: ZFieldPageNumberSchema.optional(),
  pageX: ZFieldPageXSchema.optional(),
  pageY: ZFieldPageYSchema.optional(),
  width: ZFieldWidthSchema.optional(),
  height: ZFieldHeightSchema.optional()
}));
const ZCreateDocumentFieldRequestSchema = z.object({
  documentId: z.number(),
  field: ZCreateFieldSchema
});
const ZCreateDocumentFieldResponseSchema = ZFieldSchema;
const ZCreateDocumentFieldsRequestSchema = z.object({
  documentId: z.number(),
  fields: ZCreateFieldSchema.array()
});
const ZCreateDocumentFieldsResponseSchema = z.object({
  fields: z.array(ZFieldSchema)
});
const ZUpdateDocumentFieldRequestSchema = z.object({
  documentId: z.number(),
  field: ZUpdateFieldSchema
});
const ZUpdateDocumentFieldResponseSchema = ZFieldSchema;
const ZUpdateDocumentFieldsRequestSchema = z.object({
  documentId: z.number(),
  fields: ZUpdateFieldSchema.array()
});
const ZUpdateDocumentFieldsResponseSchema = z.object({
  fields: z.array(ZFieldSchema)
});
const ZDeleteDocumentFieldRequestSchema = z.object({
  fieldId: z.number()
});
const ZCreateTemplateFieldRequestSchema = z.object({
  templateId: z.number(),
  field: ZCreateFieldSchema
});
const ZCreateTemplateFieldResponseSchema = ZFieldSchema;
const ZCreateTemplateFieldsRequestSchema = z.object({
  templateId: z.number(),
  fields: ZCreateFieldSchema.array()
});
const ZCreateTemplateFieldsResponseSchema = z.object({
  fields: z.array(ZFieldSchema)
});
const ZUpdateTemplateFieldRequestSchema = z.object({
  templateId: z.number(),
  field: ZUpdateFieldSchema
});
const ZUpdateTemplateFieldsRequestSchema = z.object({
  templateId: z.number(),
  fields: ZUpdateFieldSchema.array()
});
const ZUpdateTemplateFieldsResponseSchema = z.object({
  fields: z.array(ZFieldSchema)
});
const ZUpdateTemplateFieldResponseSchema = ZFieldSchema;
const ZDeleteTemplateFieldRequestSchema = z.object({
  fieldId: z.number()
});
const ZSetDocumentFieldsRequestSchema = z.object({
  documentId: z.number(),
  fields: z.array(z.object({
    id: z.number().optional(),
    type: z.nativeEnum(FieldType),
    recipientId: z.number().min(1),
    envelopeItemId: z.string(),
    pageNumber: z.number().min(1),
    pageX: z.number().min(0),
    pageY: z.number().min(0),
    pageWidth: z.number().min(0),
    pageHeight: z.number().min(0),
    fieldMeta: ZFieldMetaSchema
  }))
});
const ZSetDocumentFieldsResponseSchema = z.object({
  fields: z.array(ZFieldSchema)
});
const ZSetFieldsForTemplateRequestSchema = z.object({
  templateId: z.number(),
  fields: z.array(z.object({
    id: z.number().optional(),
    type: z.nativeEnum(FieldType),
    recipientId: z.number().min(1),
    envelopeItemId: z.string(),
    pageNumber: z.number().min(1),
    pageX: z.number().min(0),
    pageY: z.number().min(0),
    pageWidth: z.number().min(0),
    pageHeight: z.number().min(0),
    fieldMeta: ZFieldMetaSchema
  }))
});
const ZSetFieldsForTemplateResponseSchema = z.object({
  fields: z.array(ZFieldSchema)
});
const ZSignFieldWithTokenMutationSchema = z.object({
  token: z.string(),
  fieldId: z.number(),
  value: z.string().trim().optional(),
  isBase64: z.boolean().optional(),
  authOptions: ZRecipientActionAuthSchema.optional()
});
const ZRemovedSignedFieldWithTokenMutationSchema = z.object({
  token: z.string(),
  fieldId: z.number()
});
const ZGetFieldRequestSchema = z.object({
  fieldId: z.number()
});
const ZGetFieldResponseSchema = ZFieldSchema;

export { ZCreateDocumentFieldRequestSchema, ZCreateDocumentFieldResponseSchema, ZCreateDocumentFieldsRequestSchema, ZCreateDocumentFieldsResponseSchema, ZCreateTemplateFieldRequestSchema, ZCreateTemplateFieldResponseSchema, ZCreateTemplateFieldsRequestSchema, ZCreateTemplateFieldsResponseSchema, ZDeleteDocumentFieldRequestSchema, ZDeleteTemplateFieldRequestSchema, ZGetFieldRequestSchema, ZGetFieldResponseSchema, ZRemovedSignedFieldWithTokenMutationSchema, ZSetDocumentFieldsRequestSchema, ZSetDocumentFieldsResponseSchema, ZSetFieldsForTemplateRequestSchema, ZSetFieldsForTemplateResponseSchema, ZSignFieldWithTokenMutationSchema, ZUpdateDocumentFieldRequestSchema, ZUpdateDocumentFieldResponseSchema, ZUpdateDocumentFieldsRequestSchema, ZUpdateDocumentFieldsResponseSchema, ZUpdateTemplateFieldRequestSchema, ZUpdateTemplateFieldResponseSchema, ZUpdateTemplateFieldsRequestSchema, ZUpdateTemplateFieldsResponseSchema };
//# sourceMappingURL=schema.js.map
