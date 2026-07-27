import { z } from 'zod';
import { ZSuccessResponseSchema } from '../schema.js';

const deleteEnvelopeItemMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/item/delete',
    summary: 'Delete envelope item',
    description: 'Delete an envelope item from an envelope',
    tags: ['Envelope Items']
  }
};
const ZDeleteEnvelopeItemRequestSchema = z.object({
  envelopeId: z.string(),
  envelopeItemId: z.string()
});
const ZDeleteEnvelopeItemResponseSchema = ZSuccessResponseSchema;

export { ZDeleteEnvelopeItemRequestSchema, ZDeleteEnvelopeItemResponseSchema, deleteEnvelopeItemMeta };
//# sourceMappingURL=delete-envelope-item.types.js.map
