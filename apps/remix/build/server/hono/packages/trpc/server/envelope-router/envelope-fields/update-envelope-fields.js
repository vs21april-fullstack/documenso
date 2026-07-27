import { updateEnvelopeFields } from '../../../../lib/server-only/field/update-envelope-fields.js';
import { authenticatedProcedure } from '../../trpc.js';
import { updateEnvelopeFieldsMeta, ZUpdateEnvelopeFieldsRequestSchema, ZUpdateEnvelopeFieldsResponseSchema } from './update-envelope-fields.types.js';

const updateEnvelopeFieldsRoute = authenticatedProcedure.meta(updateEnvelopeFieldsMeta).input(ZUpdateEnvelopeFieldsRequestSchema).output(ZUpdateEnvelopeFieldsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId
  } = ctx;
  const {
    envelopeId,
    data: fields
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  const {
    fields: data
  } = await updateEnvelopeFields({
    userId: user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    type: null,
    fields,
    requestMetadata: ctx.metadata
  });
  return {
    data
  };
});

export { updateEnvelopeFieldsRoute };
//# sourceMappingURL=update-envelope-fields.js.map
