import { z } from 'zod';

const ZSaveAsTemplateRequestSchema = z.object({
  envelopeId: z.string().min(1).describe('The ID of the envelope to save as a template.'),
  includeRecipients: z.boolean(),
  includeFields: z.boolean()
});
const ZSaveAsTemplateResponseSchema = z.object({
  id: z.string().describe('The ID of the newly created template envelope.')
});

export { ZSaveAsTemplateRequestSchema, ZSaveAsTemplateResponseSchema };
//# sourceMappingURL=save-as-template.types.js.map
