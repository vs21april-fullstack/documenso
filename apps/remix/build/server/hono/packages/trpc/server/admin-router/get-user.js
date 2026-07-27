import { getUserById } from '../../../lib/server-only/user/get-user-by-id.js';
import { adminProcedure } from '../trpc.js';
import { ZGetUserRequestSchema, ZGetUserResponseSchema } from './get-user.types.js';

const getUserRoute = adminProcedure.input(ZGetUserRequestSchema).output(ZGetUserResponseSchema).query(async ({
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
  return await getUserById({
    id
  });
});

export { getUserRoute };
//# sourceMappingURL=get-user.js.map
