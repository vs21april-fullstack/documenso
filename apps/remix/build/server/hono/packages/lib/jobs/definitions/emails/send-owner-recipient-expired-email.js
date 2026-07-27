import { z } from 'zod';

const SEND_OWNER_RECIPIENT_EXPIRED_EMAIL_JOB_DEFINITION_ID = 'send.owner.recipient.expired.email';
const SEND_OWNER_RECIPIENT_EXPIRED_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  recipientId: z.number(),
  envelopeId: z.string()
});
const SEND_OWNER_RECIPIENT_EXPIRED_EMAIL_JOB_DEFINITION = {
  id: SEND_OWNER_RECIPIENT_EXPIRED_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Owner Recipient Expired Email',
  version: '1.0.0',
  trigger: {
    name: SEND_OWNER_RECIPIENT_EXPIRED_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_OWNER_RECIPIENT_EXPIRED_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-owner-recipient-expired-email.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_OWNER_RECIPIENT_EXPIRED_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-owner-recipient-expired-email.js.map
