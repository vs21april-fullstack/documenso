import { z } from 'zod';

const SEND_DOCUMENT_PENDING_EMAIL_JOB_DEFINITION_ID = 'send.document.pending.email';
const SEND_DOCUMENT_PENDING_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  envelopeId: z.string(),
  recipientId: z.number()
});
const SEND_DOCUMENT_PENDING_EMAIL_JOB_DEFINITION = {
  id: SEND_DOCUMENT_PENDING_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Document Pending Email',
  version: '1.0.0',
  trigger: {
    name: SEND_DOCUMENT_PENDING_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_DOCUMENT_PENDING_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-document-pending-email.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_DOCUMENT_PENDING_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-document-pending-email.js.map
