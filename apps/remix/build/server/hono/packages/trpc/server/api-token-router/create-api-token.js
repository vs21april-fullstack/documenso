import { createApiToken } from '../../../lib/server-only/public-api/create-api-token.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZCreateApiTokenRequestSchema, ZCreateApiTokenResponseSchema } from './create-api-token.types.js';

const createApiTokenRoute = authenticatedProcedure.input(ZCreateApiTokenRequestSchema).output(ZCreateApiTokenResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    tokenName,
    teamId,
    expirationDate
  } = input;
  ctx.logger.info({
    input: {
      teamId
    }
  });
  return await createApiToken({
    userId: ctx.user.id,
    teamId,
    tokenName,
    expiresIn: expirationDate
  });
});

export { createApiTokenRoute };
//# sourceMappingURL=create-api-token.js.map
