import { z } from 'zod';

const PROCESS_SIGNING_REMINDER_JOB_DEFINITION_ID = 'internal.process-signing-reminder';
const PROCESS_SIGNING_REMINDER_JOB_DEFINITION_SCHEMA = z.object({
  recipientId: z.number()
});
const PROCESS_SIGNING_REMINDER_JOB_DEFINITION = {
  id: PROCESS_SIGNING_REMINDER_JOB_DEFINITION_ID,
  name: 'Process Signing Reminder',
  version: '1.0.0',
  trigger: {
    name: PROCESS_SIGNING_REMINDER_JOB_DEFINITION_ID,
    schema: PROCESS_SIGNING_REMINDER_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./process-signing-reminder.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { PROCESS_SIGNING_REMINDER_JOB_DEFINITION };
//# sourceMappingURL=process-signing-reminder.js.map
