import { EnvelopeItemSchema } from '../../../prisma/generated/zod/modelSchema/EnvelopeItemSchema.js';
import { z } from 'zod';

const ZGetEnvelopeItemsByTokenRequestSchema = z.object({
  envelopeId: z.string(),
  access: z.discriminatedUnion('type', [z.object({
    type: z.literal('recipient'),
    token: z.string()
  }), z.object({
    type: z.literal('user')
  })])
});
const ZGetEnvelopeItemsByTokenResponseSchema = z.object({
  data: EnvelopeItemSchema.pick({
    id: true,
    envelopeId: true,
    title: true,
    order: true
  }).array()
});

export { ZGetEnvelopeItemsByTokenRequestSchema, ZGetEnvelopeItemsByTokenResponseSchema };
//# sourceMappingURL=get-envelope-items-by-token.types.js.map
