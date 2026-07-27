import { z } from 'zod';

const EnvelopeSigningStatus = z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED']);
const ZSigningStatusEnvelopeRequestSchema = z.object({
  token: z.string().describe('The recipient token to check the signing status for')
});
const ZSigningStatusEnvelopeResponseSchema = z.object({
  status: EnvelopeSigningStatus.describe('The current signing status of the envelope')
});

export { EnvelopeSigningStatus, ZSigningStatusEnvelopeRequestSchema, ZSigningStatusEnvelopeResponseSchema };
//# sourceMappingURL=signing-status-envelope.types.js.map
