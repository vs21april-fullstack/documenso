import { z } from 'zod';

const SEND_ORGANISATION_LIMIT_ALERT_EMAIL_JOB_DEFINITION_ID = 'send.organisation-limit-alert.email';
const SEND_ORGANISATION_LIMIT_ALERT_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  organisationId: z.string(),
  counter: z.enum(['document', 'email', 'api']),
  kind: z.enum(['rateLimit', 'quota', 'quotaNearing']),
  period: z.string()
});
const SEND_ORGANISATION_LIMIT_ALERT_EMAIL_JOB_DEFINITION = {
  id: SEND_ORGANISATION_LIMIT_ALERT_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Organisation Limit Alert Email',
  version: '1.0.0',
  trigger: {
    name: SEND_ORGANISATION_LIMIT_ALERT_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_ORGANISATION_LIMIT_ALERT_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-organisation-limit-alert-email.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_ORGANISATION_LIMIT_ALERT_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-organisation-limit-alert-email.js.map
