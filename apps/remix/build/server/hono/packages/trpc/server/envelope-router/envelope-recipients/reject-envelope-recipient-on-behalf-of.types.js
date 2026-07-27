import { ZEnvelopeRecipientSchema } from '../../../../lib/types/recipient.js';
import { zEmail } from '../../../../lib/utils/zod.js';
import { z } from 'zod';

const rejectEnvelopeRecipientOnBehalfOfMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/recipient/{recipientId}/reject',
    summary: 'Reject envelope recipient on behalf of',
    description: 'Records a rejection on behalf of a recipient. Use this when a recipient has declined to ' + 'sign outside of the platform. The rejection is flagged as external in the document audit ' + 'log. By default the action is attributed to the API user; supply `actAsEmail` to attribute ' + 'it to a specific team member.',
    tags: ['Envelope Recipients']
  }
};
const ZRejectEnvelopeRecipientOnBehalfOfRequestSchema = z.object({
  envelopeId: z.string().describe('The ID of the envelope the recipient belongs to.'),
  recipientId: z.number().describe('The ID of the recipient to reject the document on behalf of.'),
  reason: z.string().min(1).describe('The reason the recipient rejected the document.'),
  actAsEmail: zEmail().optional().describe('The email of the team member to attribute the rejection to. Defaults to the API user when omitted.')
});
const ZRejectEnvelopeRecipientOnBehalfOfResponseSchema = ZEnvelopeRecipientSchema;

export { ZRejectEnvelopeRecipientOnBehalfOfRequestSchema, ZRejectEnvelopeRecipientOnBehalfOfResponseSchema, rejectEnvelopeRecipientOnBehalfOfMeta };
//# sourceMappingURL=reject-envelope-recipient-on-behalf-of.types.js.map
