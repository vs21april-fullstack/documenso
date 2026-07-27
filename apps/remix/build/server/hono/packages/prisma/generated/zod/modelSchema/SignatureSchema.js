import { z } from 'zod';

/////////////////////////////////////////
// SIGNATURE SCHEMA
/////////////////////////////////////////
const SignatureSchema = z.object({
  id: z.number(),
  created: z.coerce.date(),
  recipientId: z.number(),
  fieldId: z.number(),
  signatureImageAsBase64: z.string().nullable(),
  typedSignature: z.string().nullable()
});

export { SignatureSchema, SignatureSchema as default };
//# sourceMappingURL=SignatureSchema.js.map
