import { DocumentDataSchema } from '../../../prisma/generated/zod/modelSchema/DocumentDataSchema.js';
import { EnvelopeItemSchema } from '../../../prisma/generated/zod/modelSchema/EnvelopeItemSchema.js';
import { z } from 'zod';

const ZGetEnvelopeItemsRequestSchema = z.object({
  envelopeId: z.string()
});
const ZGetEnvelopeItemsResponseSchema = z.object({
  data: EnvelopeItemSchema.pick({
    id: true,
    title: true,
    order: true
  }).extend({
    documentData: DocumentDataSchema.pick({
      type: true,
      id: true,
      data: true,
      initialData: true
    })
  }).array()
});

export { ZGetEnvelopeItemsRequestSchema, ZGetEnvelopeItemsResponseSchema };
//# sourceMappingURL=get-envelope-items.types.js.map
