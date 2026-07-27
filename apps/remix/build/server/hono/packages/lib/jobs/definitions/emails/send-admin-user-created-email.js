import { z } from 'zod';

const SEND_ADMIN_USER_CREATED_EMAIL_JOB_DEFINITION_ID = 'send.admin.user.created.email';
const SEND_ADMIN_USER_CREATED_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  userId: z.number()
});
const SEND_ADMIN_USER_CREATED_EMAIL_JOB_DEFINITION = {
  id: SEND_ADMIN_USER_CREATED_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Admin User Created Email',
  version: '1.0.0',
  trigger: {
    name: SEND_ADMIN_USER_CREATED_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_ADMIN_USER_CREATED_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./send-admin-user-created-email.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEND_ADMIN_USER_CREATED_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-admin-user-created-email.js.map
