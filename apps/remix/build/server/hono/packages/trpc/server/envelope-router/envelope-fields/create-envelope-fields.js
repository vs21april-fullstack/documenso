import { createEnvelopeFields } from '../../../../lib/server-only/field/create-envelope-fields.js';
import { authenticatedProcedure } from '../../trpc.js';
import { createEnvelopeFieldsMeta, ZCreateEnvelopeFieldsRequestSchema, ZCreateEnvelopeFieldsResponseSchema } from './create-envelope-fields.types.js';

const createEnvelopeFieldsRoute = authenticatedProcedure.meta(createEnvelopeFieldsMeta).input(ZCreateEnvelopeFieldsRequestSchema).output(ZCreateEnvelopeFieldsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId,
    metadata
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
  } = await createEnvelopeFields({
    userId: user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    fields,
    requestMetadata: metadata
  });
  return {
    data
  };
});

export { createEnvelopeFieldsRoute };
//# sourceMappingURL=create-envelope-fields.js.map
