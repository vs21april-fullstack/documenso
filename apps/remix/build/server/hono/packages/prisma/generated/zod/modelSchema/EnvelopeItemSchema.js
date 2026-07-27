import { z } from 'zod';

/////////////////////////////////////////
// ENVELOPE ITEM SCHEMA
/////////////////////////////////////////
const EnvelopeItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number(),
  documentDataId: z.string(),
  envelopeId: z.string()
});

export { EnvelopeItemSchema, EnvelopeItemSchema as default };
//# sourceMappingURL=EnvelopeItemSchema.js.map
