import { findPasskeys } from '../../../lib/server-only/auth/find-passkeys.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindPasskeysRequestSchema, ZFindPasskeysResponseSchema } from './find-passkeys.types.js';

const findPasskeysRoute = authenticatedProcedure.input(ZFindPasskeysRequestSchema).output(ZFindPasskeysResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    page,
    perPage,
    orderBy
  } = input;
  return await findPasskeys({
    page,
    perPage,
    orderBy,
    userId: ctx.user.id
  });
});

export { findPasskeysRoute };
//# sourceMappingURL=find-passkeys.js.map
