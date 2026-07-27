import { getApiTokens } from '../../../lib/server-only/public-api/get-api-tokens.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetApiTokensRequestSchema, ZGetApiTokensResponseSchema } from './get-api-tokens.types.js';

const getApiTokensRoute = authenticatedProcedure.input(ZGetApiTokensRequestSchema).output(ZGetApiTokensResponseSchema).query(async ({
  ctx
}) => {
  const {
    teamId
  } = ctx;
  ctx.logger.info({
    input: {
      teamId
    }
  });
  return await getApiTokens({
    userId: ctx.user.id,
    teamId
  });
});

export { getApiTokensRoute };
//# sourceMappingURL=get-api-tokens.js.map
