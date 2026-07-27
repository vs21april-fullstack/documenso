import { duplicateEnvelope } from '../../../lib/server-only/envelope/duplicate-envelope.js';
import { authenticatedProcedure } from '../trpc.js';
import { duplicateEnvelopeMeta, ZDuplicateEnvelopeRequestSchema, ZDuplicateEnvelopeResponseSchema } from './duplicate-envelope.types.js';

const duplicateEnvelopeRoute = authenticatedProcedure.meta(duplicateEnvelopeMeta).input(ZDuplicateEnvelopeRequestSchema).output(ZDuplicateEnvelopeResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    envelopeId,
    includeRecipients,
    includeFields
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  const duplicatedEnvelope = await duplicateEnvelope({
    userId: ctx.user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    overrides: {
      includeRecipients,
      includeFields
    }
  });
  return {
    id: duplicatedEnvelope.id
  };
});

export { duplicateEnvelopeRoute };
//# sourceMappingURL=duplicate-envelope.js.map
