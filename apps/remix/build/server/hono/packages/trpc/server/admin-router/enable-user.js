import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { enableUser } from '../../../lib/server-only/user/enable-user.js';
import { getUserById } from '../../../lib/server-only/user/get-user-by-id.js';
import { adminProcedure } from '../trpc.js';
import { ZEnableUserRequestSchema, ZEnableUserResponseSchema } from './enable-user.types.js';

const enableUserRoute = adminProcedure.input(ZEnableUserRequestSchema).output(ZEnableUserResponseSchema).mutation(async ({
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
  const user = await getUserById({
    id
  }).catch(() => null);
  if (!user) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'User not found'
    });
  }
  await enableUser({
    id
  });
});

export { enableUserRoute };
//# sourceMappingURL=enable-user.js.map
