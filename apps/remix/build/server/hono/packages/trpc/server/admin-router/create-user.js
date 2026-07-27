import { jobsClient } from '../../../lib/jobs/client.js';
import { createAdminUser } from '../../../lib/server-only/user/create-admin-user.js';
import { adminProcedure } from '../trpc.js';
import { ZCreateUserRequestSchema, ZCreateUserResponseSchema } from './create-user.types.js';

const createUserRoute = adminProcedure.input(ZCreateUserRequestSchema).output(ZCreateUserResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    email,
    name
  } = input;
  const user = await createAdminUser({
    name,
    email
  });
  ctx.logger.info({
    createdUserId: user.id
  });
  await jobsClient.triggerJob({
    name: 'send.admin.user.created.email',
    payload: {
      userId: user.id
    }
  });
  return {
    userId: user.id
  };
});

export { createUserRoute };
//# sourceMappingURL=create-user.js.map
