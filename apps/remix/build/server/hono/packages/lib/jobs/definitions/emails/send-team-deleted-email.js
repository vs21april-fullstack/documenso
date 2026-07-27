import { z } from 'zod';

const SEND_TEAM_DELETED_EMAIL_JOB_DEFINITION_ID = 'send.team-deleted.email';
const SEND_TEAM_DELETED_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  organisationId: z.string(),
  team: z.object({
    name: z.string(),
    url: z.string()
  }),
  members: z.array(z.object({
    id: z.number(),
    name: z.string(),
    email: z.string()
  }))
});
const SEND_TEAM_DELETED_EMAIL_JOB_DEFINITION = {
  id: SEND_TEAM_DELETED_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Team Deleted Email',
  version: '1.0.0',
  trigger: {
    name: SEND_TEAM_DELETED_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_TEAM_DELETED_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-team-deleted-email.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_TEAM_DELETED_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-team-deleted-email.js.map
