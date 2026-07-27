import { z } from 'zod';

const SEND_RECIPIENT_REMOVED_EMAIL_JOB_DEFINITION_ID = 'send.recipient.removed.email';
const SEND_RECIPIENT_REMOVED_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  envelopeId: z.string(),
  recipientEmail: z.string(),
  recipientName: z.string(),
  inviterName: z.string().optional()
});
const SEND_RECIPIENT_REMOVED_EMAIL_JOB_DEFINITION = {
  id: SEND_RECIPIENT_REMOVED_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Recipient Removed Email',
  version: '1.0.0',
  trigger: {
    name: SEND_RECIPIENT_REMOVED_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_RECIPIENT_REMOVED_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-recipient-removed-email.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_RECIPIENT_REMOVED_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-recipient-removed-email.js.map
