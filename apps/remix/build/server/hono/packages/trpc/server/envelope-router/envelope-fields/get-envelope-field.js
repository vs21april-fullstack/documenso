import { getFieldById } from '../../../../lib/server-only/field/get-field-by-id.js';
import { authenticatedProcedure } from '../../trpc.js';
import { getEnvelopeFieldMeta, ZGetEnvelopeFieldRequestSchema, ZGetEnvelopeFieldResponseSchema } from './get-envelope-field.types.js';

const getEnvelopeFieldRoute = authenticatedProcedure.meta(getEnvelopeFieldMeta).input(ZGetEnvelopeFieldRequestSchema).output(ZGetEnvelopeFieldResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    fieldId
  } = input;
  ctx.logger.info({
    input: {
      fieldId
    }
  });
  return await getFieldById({
    userId: user.id,
    teamId,
    fieldId
  });
});

export { getEnvelopeFieldRoute };
//# sourceMappingURL=get-envelope-field.js.map
