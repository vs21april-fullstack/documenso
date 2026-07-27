import { deleteTokenById } from '../../../lib/server-only/public-api/delete-api-token-by-id.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZDeleteApiTokenRequestSchema, ZDeleteApiTokenResponseSchema } from './delete-api-token.types.js';

const deleteApiTokenRoute = authenticatedProcedure.input(ZDeleteApiTokenRequestSchema).output(ZDeleteApiTokenResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    id,
    teamId
  } = input;
  ctx.logger.info({
    input: {
      id,
      teamId
    }
  });
  await deleteTokenById({
    id,
    teamId,
    userId: ctx.user.id
  });
});

export { deleteApiTokenRoute };
//# sourceMappingURL=delete-api-token.js.map
