import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';

/**
 * Throws if the supplied user object is disabled.
 *
 * Synchronous variant for hot paths where the `disabled` field has already
 * been loaded (e.g. TRPC middleware where the user comes from the session
 * query or API token lookup).
 */
const assertUserNotDisabled = user => {
  if (user.disabled) {
    throw new AppError('ACCOUNT_DISABLED', {
      message: 'Account disabled',
      statusCode: 403
    });
  }
};
/**
 * Throws if the user with the given id does not exist or is disabled.
 *
 * Used as a defence-in-depth guard for sign-in chokepoints and server-side
 * actions that should not be performed on behalf of a disabled account
 * (e.g. creating or sending documents). It deliberately re-queries from the
 * database rather than relying on cached context so a freshly-disabled user
 * cannot continue to act through a stale session or token.
 */
const assertUserNotDisabledById = async ({
  userId
}) => {
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id: userId
    },
    select: {
      disabled: true
    }
  });
  if (!user) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'User not found',
      statusCode: 404
    });
  }
  assertUserNotDisabled(user);
};

export { assertUserNotDisabled, assertUserNotDisabledById };
//# sourceMappingURL=assert-user-not-disabled.js.map
