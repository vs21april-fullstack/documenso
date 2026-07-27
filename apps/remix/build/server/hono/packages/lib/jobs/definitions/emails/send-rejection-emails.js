import { z } from 'zod';

const SEND_SIGNING_REJECTION_EMAILS_JOB_DEFINITION_ID = 'send.signing.rejected.emails';
const SEND_SIGNING_REJECTION_EMAILS_JOB_DEFINITION_SCHEMA = z.object({
  documentId: z.number(),
  recipientId: z.number()
});
const SEND_SIGNING_REJECTION_EMAILS_JOB_DEFINITION = {
  id: SEND_SIGNING_REJECTION_EMAILS_JOB_DEFINITION_ID,
  name: 'Send Rejection Emails',
  version: '1.0.0',
  trigger: {
    name: SEND_SIGNING_REJECTION_EMAILS_JOB_DEFINITION_ID,
    schema: SEND_SIGNING_REJECTION_EMAILS_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-rejection-emails.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_SIGNING_REJECTION_EMAILS_JOB_DEFINITION };
//# sourceMappingURL=send-rejection-emails.js.map
