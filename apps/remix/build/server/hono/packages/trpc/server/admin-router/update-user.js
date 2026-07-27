import { updateUser } from '../../../lib/server-only/admin/update-user.js';
import { adminProcedure } from '../trpc.js';
import { ZUpdateUserRequestSchema, ZUpdateUserResponseSchema } from './update-user.types.js';

const updateUserRoute = adminProcedure.input(ZUpdateUserRequestSchema).output(ZUpdateUserResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    id,
    name,
    email,
    roles
  } = input;
  ctx.logger.info({
    input: {
      id,
      roles
    }
  });
  await updateUser({
    id,
    name,
    email,
    roles
  });
});

export { updateUserRoute };
//# sourceMappingURL=update-user.js.map
