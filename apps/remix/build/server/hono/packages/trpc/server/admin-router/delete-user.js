import { deleteUser } from '../../../lib/server-only/user/delete-user.js';
import { adminProcedure } from '../trpc.js';
import { ZDeleteUserRequestSchema, ZDeleteUserResponseSchema } from './delete-user.types.js';

const deleteUserRoute = adminProcedure.input(ZDeleteUserRequestSchema).output(ZDeleteUserResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    id
  } = input;
  ctx.logger.info({
    input: {
      id
    }
  });
  await deleteUser({
    id
  });
});

export { deleteUserRoute };
//# sourceMappingURL=delete-user.js.map
