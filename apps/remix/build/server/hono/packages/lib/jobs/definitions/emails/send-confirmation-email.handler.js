import { sendConfirmationToken } from '../../../server-only/user/send-confirmation-token.js';

const run = async ({
  payload
}) => {
  await sendConfirmationToken({
    email: payload.email,
    force: payload.force
  });
};

export { run };
//# sourceMappingURL=send-confirmation-email.handler.js.map
