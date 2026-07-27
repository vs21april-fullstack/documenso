import { updateEnvelope } from '../../../lib/server-only/envelope/update-envelope.js';
import { authenticatedProcedure } from '../trpc.js';
import { updateEnvelopeMeta, ZUpdateEnvelopeRequestSchema, ZUpdateEnvelopeResponseSchema } from './update-envelope.types.js';

const updateEnvelopeRoute = authenticatedProcedure.meta(updateEnvelopeMeta).input(ZUpdateEnvelopeRequestSchema).output(ZUpdateEnvelopeResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    envelopeId,
    data,
    meta = {}
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  const userId = ctx.user.id;
  return await updateEnvelope({
    userId,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    data,
    meta,
    requestMetadata: ctx.metadata
  });
});

export { updateEnvelopeRoute };
//# sourceMappingURL=update-envelope.js.map
