import { EnvelopeItemSchema } from '../../../prisma/generated/zod/modelSchema/EnvelopeItemSchema.js';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { zodFormData, zfdFile } from '../../utils/zod-form-data.js';

const createEnvelopeItemsMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/item/create-many',
    summary: 'Create envelope items',
    contentTypes: ['multipart/form-data'],
    description: 'Create multiple envelope items for an envelope',
    tags: ['Envelope Items']
  }
};
const ZCreateEnvelopeItemsPayloadSchema = z.object({
  envelopeId: z.string()
  // data: z.object() // Currently not used.
});
const ZCreateEnvelopeItemsRequestSchema = zodFormData({
  payload: zfd.json(ZCreateEnvelopeItemsPayloadSchema),
  files: zfd.repeatableOfType(zfdFile())
});
const ZCreateEnvelopeItemsResponseSchema = z.object({
  data: EnvelopeItemSchema.pick({
    id: true,
    title: true,
    envelopeId: true,
    order: true,
    documentDataId: true
  }).array()
});

export { ZCreateEnvelopeItemsPayloadSchema, ZCreateEnvelopeItemsRequestSchema, ZCreateEnvelopeItemsResponseSchema, createEnvelopeItemsMeta };
//# sourceMappingURL=create-envelope-items.types.js.map
