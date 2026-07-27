import { z } from 'zod';

const PROCESS_RECIPIENT_EXPIRED_JOB_DEFINITION_ID = 'internal.process-recipient-expired';
const PROCESS_RECIPIENT_EXPIRED_JOB_DEFINITION_SCHEMA = z.object({
  recipientId: z.number()
});
const PROCESS_RECIPIENT_EXPIRED_JOB_DEFINITION = {
  id: PROCESS_RECIPIENT_EXPIRED_JOB_DEFINITION_ID,
  name: 'Process Recipient Expired',
  version: '1.0.0',
  trigger: {
    name: PROCESS_RECIPIENT_EXPIRED_JOB_DEFINITION_ID,
    schema: PROCESS_RECIPIENT_EXPIRED_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./process-recipient-expired.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { PROCESS_RECIPIENT_EXPIRED_JOB_DEFINITION };
//# sourceMappingURL=process-recipient-expired.js.map
