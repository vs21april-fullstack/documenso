import { getEditorEnvelopeById } from '../../../lib/server-only/envelope/get-editor-envelope-by-id.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetEditorEnvelopeRequestSchema, ZGetEditorEnvelopeResponseSchema } from './get-editor-envelope.types.js';

const getEditorEnvelopeRoute = authenticatedProcedure.input(ZGetEditorEnvelopeRequestSchema).output(ZGetEditorEnvelopeResponseSchema).query(async ({
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
  return await getEditorEnvelopeById({
    userId: user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    type: null
  });
});

export { getEditorEnvelopeRoute };
//# sourceMappingURL=get-editor-envelope.js.map
