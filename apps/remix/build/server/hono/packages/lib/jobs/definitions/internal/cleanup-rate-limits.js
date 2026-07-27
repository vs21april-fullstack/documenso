import { z } from 'zod';

const CLEANUP_RATE_LIMITS_JOB_DEFINITION_ID = 'internal.cleanup-rate-limits';
const CLEANUP_RATE_LIMITS_JOB_DEFINITION_SCHEMA = z.object({});
const CLEANUP_RATE_LIMITS_JOB_DEFINITION = {
  id: CLEANUP_RATE_LIMITS_JOB_DEFINITION_ID,
  name: 'Cleanup Rate Limits',
  version: '1.0.0',
  trigger: {
    name: CLEANUP_RATE_LIMITS_JOB_DEFINITION_ID,
    schema: CLEANUP_RATE_LIMITS_JOB_DEFINITION_SCHEMA,
    cron: '*/15 * * * *' // Every 15 minutes.
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./cleanup-rate-limits.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { CLEANUP_RATE_LIMITS_JOB_DEFINITION };
//# sourceMappingURL=cleanup-rate-limits.js.map
