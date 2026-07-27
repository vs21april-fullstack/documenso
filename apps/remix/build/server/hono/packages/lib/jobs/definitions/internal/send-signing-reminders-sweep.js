import { z } from 'zod';

const SEND_SIGNING_REMINDERS_SWEEP_JOB_DEFINITION_ID = 'internal.send-signing-reminders-sweep';
const SEND_SIGNING_REMINDERS_SWEEP_JOB_DEFINITION_SCHEMA = z.object({});
const SEND_SIGNING_REMINDERS_SWEEP_JOB_DEFINITION = {
  id: SEND_SIGNING_REMINDERS_SWEEP_JOB_DEFINITION_ID,
  name: 'Send Signing Reminders Sweep',
  version: '1.0.0',
  trigger: {
    name: SEND_SIGNING_REMINDERS_SWEEP_JOB_DEFINITION_ID,
    schema: SEND_SIGNING_REMINDERS_SWEEP_JOB_DEFINITION_SCHEMA,
    cron: '*/15 * * * *' // Every 15 minutes.
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-signing-reminders-sweep.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_SIGNING_REMINDERS_SWEEP_JOB_DEFINITION };
//# sourceMappingURL=send-signing-reminders-sweep.js.map
