import { z } from 'zod';

/////////////////////////////////////////
// TEMPLATE DIRECT LINK SCHEMA
/////////////////////////////////////////
const TemplateDirectLinkSchema = z.object({
  id: z.string(),
  envelopeId: z.string(),
  token: z.string(),
  createdAt: z.coerce.date(),
  enabled: z.boolean(),
  directTemplateRecipientId: z.number()
});

export { TemplateDirectLinkSchema, TemplateDirectLinkSchema as default };
//# sourceMappingURL=TemplateDirectLinkSchema.js.map
