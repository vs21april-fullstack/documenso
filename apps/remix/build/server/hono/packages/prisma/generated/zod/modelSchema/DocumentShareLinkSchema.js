import { z } from 'zod';

/////////////////////////////////////////
// DOCUMENT SHARE LINK SCHEMA
/////////////////////////////////////////
const DocumentShareLinkSchema = z.object({
  id: z.number(),
  email: z.string(),
  slug: z.string(),
  envelopeId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

export { DocumentShareLinkSchema, DocumentShareLinkSchema as default };
//# sourceMappingURL=DocumentShareLinkSchema.js.map
