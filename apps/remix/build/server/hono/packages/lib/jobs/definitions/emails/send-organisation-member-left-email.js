import { z } from 'zod';

const SEND_ORGANISATION_MEMBER_LEFT_EMAIL_JOB_DEFINITION_ID = 'send.organisation-member-left.email';
const SEND_ORGANISATION_MEMBER_LEFT_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  organisationId: z.string(),
  memberUserId: z.number()
});
const SEND_ORGANISATION_MEMBER_LEFT_EMAIL_JOB_DEFINITION = {
  id: SEND_ORGANISATION_MEMBER_LEFT_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Organisation Member Left Email',
  version: '1.0.0',
  trigger: {
    name: SEND_ORGANISATION_MEMBER_LEFT_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_ORGANISATION_MEMBER_LEFT_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-organisation-member-left-email.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_ORGANISATION_MEMBER_LEFT_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-organisation-member-left-email.js.map
