import { z } from 'zod';

const ZCscSignEnvelopeRequestSchema = z.object({
  recipientToken: z.string().min(1),
  sessionId: z.string().min(1)
});
const ZCscSignEnvelopeResponseSchema = z.object({
  outcome: z.enum(['signed', 'already_signed'])
});

export { ZCscSignEnvelopeRequestSchema, ZCscSignEnvelopeResponseSchema };
//# sourceMappingURL=csc-sign-envelope.types.js.map
