import { getEnvelopeById } from '../../../lib/server-only/envelope/get-envelope-by-id.js';
import { authenticatedProcedure } from '../trpc.js';
import { getEnvelopeMeta, ZGetEnvelopeRequestSchema, ZGetEnvelopeResponseSchema } from './get-envelope.types.js';

const getEnvelopeRoute = authenticatedProcedure.meta(getEnvelopeMeta).input(ZGetEnvelopeRequestSchema).output(ZGetEnvelopeResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    envelopeId
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  return await getEnvelopeById({
    userId: user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    type: null
  });
});

export { getEnvelopeRoute };
//# sourceMappingURL=get-envelope.js.map
