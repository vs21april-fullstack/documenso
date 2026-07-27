import { z } from 'zod';
import { zEmail } from '../../../utils/zod.js';

const SEND_CONFIRMATION_EMAIL_JOB_DEFINITION_ID = 'send.signup.confirmation.email';
const SEND_CONFIRMATION_EMAIL_JOB_DEFINITION_SCHEMA = z.object({
  email: zEmail(),
  force: z.boolean().optional()
});
const SEND_CONFIRMATION_EMAIL_JOB_DEFINITION = {
  id: SEND_CONFIRMATION_EMAIL_JOB_DEFINITION_ID,
  name: 'Send Confirmation Email',
  version: '1.0.0',
  trigger: {
    name: SEND_CONFIRMATION_EMAIL_JOB_DEFINITION_ID,
    schema: SEND_CONFIRMATION_EMAIL_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload
  }) => {
    const handler = await import('./send-confirmation-email.handler.js');
    await handler.run({
      payload
    });
  }
};

export { SEND_CONFIRMATION_EMAIL_JOB_DEFINITION };
//# sourceMappingURL=send-confirmation-email.js.map
