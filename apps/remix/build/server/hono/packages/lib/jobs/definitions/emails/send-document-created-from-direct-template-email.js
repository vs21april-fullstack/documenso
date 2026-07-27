import { z } from 'zod';

const SEND_DOCUMENT_CREATED_FROM_DIRECT_TEMPLATE_EMAIL_JOB_DEFINITION_ID = 'send.document.created.from.direct.template.email';
const SEND_DOCUMENT_CREATED_FROM_DIRECT_TEMPLATE_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  envelopeId: z.string(),
  recipientId: z.number()
});
const SEND_DOCUMENT_CREATED_FROM_DIRECT_TEMPLATE_EMAIL_JOB_DEFINITION = {
  id: SEND_DOCUMENT_CREATED_FROM_DIRECT_TEMPLATE_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Document Created From Direct Template Email',
  version: '1.0.0',
  trigger: {
    name: SEND_DOCUMENT_CREATED_FROM_DIRECT_TEMPLATE_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_DOCUMENT_CREATED_FROM_DIRECT_TEMPLATE_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-document-created-from-direct-template-email.handler.js');
    await handler.run({
      payload
    });
  }
};

export { SEND_DOCUMENT_CREATED_FROM_DIRECT_TEMPLATE_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-document-created-from-direct-template-email.js.map
