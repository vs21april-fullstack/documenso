import { z } from 'zod';

const SEND_PASSWORD_RESET_SUCCESS_EMAIL_JOB_DEFINITION_ID = 'send.password.reset.success.email';
const SEND_PASSWORD_RESET_SUCCESS_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  userId: z.number()
});
const SEND_PASSWORD_RESET_SUCCESS_EMAIL_JOB_DEFINITION = {
  id: SEND_PASSWORD_RESET_SUCCESS_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Password Reset Email',
  version: '1.0.0',
  trigger: {
    name: SEND_PASSWORD_RESET_SUCCESS_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_PASSWORD_RESET_SUCCESS_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload
  }) => {
    const handler = await import('./send-password-reset-success-email.handler.js');
    await handler.run({
      payload
    });
  }
};

export { SEND_PASSWORD_RESET_SUCCESS_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-password-reset-success-email.js.map
