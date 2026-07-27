import { EnvelopeItemSchema } from '../../../prisma/generated/zod/modelSchema/EnvelopeItemSchema.js';
import { z } from 'zod';
import { ZDocumentTitleSchema } from '../document-router/schema.js';

const updateEnvelopeItemsMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/item/update-many',
    summary: 'Update envelope items',
    description: 'Update multiple envelope items for an envelope',
    tags: ['Envelope Items']
  }
};
const ZUpdateEnvelopeItemsRequestSchema = z.object({
  envelopeId: z.string(),
  data: z.object({
    envelopeItemId: z.string().describe('The ID of the envelope item to update.'),
    order: z.number().int().min(1).optional(),
    title: ZDocumentTitleSchema.optional()
  }).array().min(1)
});
const ZUpdateEnvelopeItemsResponseSchema = z.object({
  data: EnvelopeItemSchema.pick({
    id: true,
    order: true,
    title: true,
    envelopeId: true
  }).array()
});

export { ZUpdateEnvelopeItemsRequestSchema, ZUpdateEnvelopeItemsResponseSchema, updateEnvelopeItemsMeta };
//# sourceMappingURL=update-envelope-items.types.js.map
