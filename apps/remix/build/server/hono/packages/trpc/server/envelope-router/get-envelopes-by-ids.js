import { getEnvelopesByIds } from '../../../lib/server-only/envelope/get-envelopes-by-ids.js';
import { authenticatedProcedure } from '../trpc.js';
import { getEnvelopesByIdsMeta, ZGetEnvelopesByIdsRequestSchema, ZGetEnvelopesByIdsResponseSchema } from './get-envelopes-by-ids.types.js';

const getEnvelopesByIdsRoute = authenticatedProcedure.meta(getEnvelopesByIdsMeta).input(ZGetEnvelopesByIdsRequestSchema).output(ZGetEnvelopesByIdsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    ids
  } = input;
  ctx.logger.info({
    input: {
      ids
    }
  });
  const envelopes = await getEnvelopesByIds({
    ids,
    userId: user.id,
    teamId,
    type: null
  });
  return {
    data: envelopes
  };
});

export { getEnvelopesByIdsRoute };
//# sourceMappingURL=get-envelopes-by-ids.js.map
