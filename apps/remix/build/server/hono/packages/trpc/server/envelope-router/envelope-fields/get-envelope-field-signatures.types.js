import { z } from 'zod';

const ZGetEnvelopeFieldSignaturesRequestSchema = z.object({
  envelopeId: z.string().min(1)
});
const ZGetEnvelopeFieldSignaturesResponseSchema = z.object({
  fieldId: z.number(),
  signatureImageAsBase64: z.string().nullable(),
  typedSignature: z.string().nullable()
}).array();

export { ZGetEnvelopeFieldSignaturesRequestSchema, ZGetEnvelopeFieldSignaturesResponseSchema };
//# sourceMappingURL=get-envelope-field-signatures.types.js.map
