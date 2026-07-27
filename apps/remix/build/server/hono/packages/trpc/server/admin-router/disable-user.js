import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { disableUser } from '../../../lib/server-only/user/disable-user.js';
import { getUserById } from '../../../lib/server-only/user/get-user-by-id.js';
import { adminProcedure } from '../trpc.js';
import { ZDisableUserRequestSchema, ZDisableUserResponseSchema } from './disable-user.types.js';

const disableUserRoute = adminProcedure.input(ZDisableUserRequestSchema).output(ZDisableUserResponseSchema).mutation(async ({
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
  await disableUser({
    id
  });
});

export { disableUserRoute };
//# sourceMappingURL=disable-user.js.map
