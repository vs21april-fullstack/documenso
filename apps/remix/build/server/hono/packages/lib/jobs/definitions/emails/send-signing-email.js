import { z } from 'zod';
import { ZRequestMetadataSchema } from '../../../universal/extract-request-metadata.js';

const SEND_SIGNING_EMAIL_JOB_DEFINITION_ID = 'send.signing.requested.email';
const SEND_SIGNING_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  userId: z.number(),
  documentId: z.number(),
  recipientId: z.number(),
  requestMetadata: ZRequestMetadataSchema.optional()
});
const SEND_SIGNING_EMAIL_JOB_DEFINITION = {
  id: SEND_SIGNING_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Signing Email',
  version: '1.0.0',
  trigger: {
    name: SEND_SIGNING_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_SIGNING_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-signing-email.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_SIGNING_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-signing-email.js.map
