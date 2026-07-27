import { cancelDocument } from '../../../lib/server-only/document/cancel-document.js';
import { ZGenericSuccessResponse } from '../schema.js';
import { authenticatedProcedure } from '../trpc.js';
import { cancelEnvelopeMeta, ZCancelEnvelopeRequestSchema, ZCancelEnvelopeResponseSchema } from './cancel-envelope.types.js';

const cancelEnvelopeRoute = authenticatedProcedure.meta(cancelEnvelopeMeta).input(ZCancelEnvelopeRequestSchema).output(ZCancelEnvelopeResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    envelopeId,
    reason
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  await cancelDocument({
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    userId: ctx.user.id,
    teamId,
    reason,
    requestMetadata: ctx.metadata
  });
  return ZGenericSuccessResponse;
});

export { cancelEnvelopeRoute };
//# sourceMappingURL=cancel-envelope.js.map
