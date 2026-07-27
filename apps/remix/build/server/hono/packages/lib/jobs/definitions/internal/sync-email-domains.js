import { z } from 'zod';

const SYNC_EMAIL_DOMAINS_JOB_DEFINITION_ID = 'internal.sync-email-domains';
const SYNC_EMAIL_DOMAINS_JOB_DEFINITION_SCHEMA = z.object({});
const SYNC_EMAIL_DOMAINS_JOB_DEFINITION = {
  id: SYNC_EMAIL_DOMAINS_JOB_DEFINITION_ID,
  name: 'Sync Email Domains',
  version: '1.0.0',
  trigger: {
    name: SYNC_EMAIL_DOMAINS_JOB_DEFINITION_ID,
    schema: SYNC_EMAIL_DOMAINS_JOB_DEFINITION_SCHEMA,
    cron: '0 * * * *' // Every hour, on the hour.
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./sync-email-domains.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SYNC_EMAIL_DOMAINS_JOB_DEFINITION };
//# sourceMappingURL=sync-email-domains.js.map
