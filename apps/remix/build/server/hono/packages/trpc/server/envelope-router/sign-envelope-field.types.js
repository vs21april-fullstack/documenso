import { ZRecipientActionAuthSchema } from '../../../lib/types/document-auth.js';
import { ZFieldSchema } from '../../../lib/types/field.js';
import { FieldType } from '@prisma/client';
import { SignatureSchema } from '../../../prisma/generated/zod/modelSchema/SignatureSchema.js';
import { z } from 'zod';

const ZSignEnvelopeFieldValue = z.discriminatedUnion('type', [z.object({
  type: z.literal(FieldType.CHECKBOX),
  value: z.array(z.number()).describe('The indices of the selected options')
}), z.object({
  type: z.literal(FieldType.RADIO),
  value: z.number().nullable().describe('The index of the selected option')
}), z.object({
  type: z.literal(FieldType.NUMBER),
  value: z.string().nullable()
}), z.object({
  type: z.literal(FieldType.EMAIL),
  value: z.string().nullable()
}), z.object({
  type: z.literal(FieldType.NAME),
  value: z.string().nullable()
}), z.object({
  type: z.literal(FieldType.INITIALS),
  value: z.string().nullable()
}), z.object({
  type: z.literal(FieldType.TEXT),
  value: z.string().nullable()
}), z.object({
  type: z.literal(FieldType.DROPDOWN),
  value: z.string().nullable()
}), z.object({
  type: z.literal(FieldType.DATE),
  value: z.boolean()
}), z.object({
  type: z.literal(FieldType.SIGNATURE),
  value: z.string().nullable()
})]);
const ZSignEnvelopeFieldRequestSchema = z.object({
  token: z.string(),
  fieldId: z.number(),
  fieldValue: ZSignEnvelopeFieldValue,
  authOptions: ZRecipientActionAuthSchema.optional()
});
const ZSignEnvelopeFieldResponseSchema = z.object({
  signedField: ZFieldSchema.omit({
    templateId: true,
    documentId: true
  }).extend({
    signature: SignatureSchema.nullish()
  })
});

export { ZSignEnvelopeFieldRequestSchema, ZSignEnvelopeFieldResponseSchema, ZSignEnvelopeFieldValue };
//# sourceMappingURL=sign-envelope-field.types.js.map
