import { sendResetPassword } from '../../../server-only/auth/send-reset-password.js';

const run = async ({
  payload
}) => {
  await sendResetPassword({
    userId: payload.userId
  });
};

export { run };
//# sourceMappingURL=send-password-reset-success-email.handler.js.map
