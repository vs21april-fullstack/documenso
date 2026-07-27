import { z } from 'zod';

const SEND_RECIPIENT_SIGNED_EMAIL_JOB_DEFINITION_ID = 'send.recipient.signed.email';
const SEND_RECIPIENT_SIGNED_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  documentId: z.number(),
  recipientId: z.number()
});
const SEND_RECIPIENT_SIGNED_EMAIL_JOB_DEFINITION = {
  id: SEND_RECIPIENT_SIGNED_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Recipient Signed Email',
  version: '1.0.0',
  trigger: {
    name: SEND_RECIPIENT_SIGNED_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_RECIPIENT_SIGNED_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-recipient-signed-email.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_RECIPIENT_SIGNED_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-recipient-signed-email.js.map
