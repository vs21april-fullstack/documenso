import { ZDetectedRecipientSchema } from '../../../packages/lib/server-only/ai/envelope/detect-recipients/schema.js';
import { z } from 'zod';

const ZDetectRecipientsRequestSchema = z.object({
  envelopeId: z.string().min(1).describe('The ID of the envelope to detect recipients from.'),
  teamId: z.number().describe('The ID of the team the envelope belongs to.')
});
z.object({
  recipients: z.array(ZDetectedRecipientSchema)
});

export { ZDetectRecipientsRequestSchema };
//# sourceMappingURL=detect-recipients.types.js.map
