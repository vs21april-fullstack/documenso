import { setFieldsForDocument } from '../../../lib/server-only/field/set-fields-for-document.js';
import { setFieldsForTemplate } from '../../../lib/server-only/field/set-fields-for-template.js';
import { EnvelopeType } from '@prisma/client';
import { match } from 'ts-pattern';
import { authenticatedProcedure } from '../trpc.js';
import { ZSetEnvelopeFieldsRequestSchema, ZSetEnvelopeFieldsResponseSchema } from './set-envelope-fields.types.js';

// Note: This is intended to always be an internal route.
const setEnvelopeFieldsRoute = authenticatedProcedure.input(ZSetEnvelopeFieldsRequestSchema).output(ZSetEnvelopeFieldsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    envelopeId,
    envelopeType,
    fields
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  const result = await match(envelopeType).with(EnvelopeType.DOCUMENT, async () => setFieldsForDocument({
    userId: ctx.user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    fields: fields.map(field => ({
      ...field,
      pageNumber: field.page,
      pageX: field.positionX,
      pageY: field.positionY,
      pageWidth: field.width,
      pageHeight: field.height
    })),
    requestMetadata: ctx.metadata
  })).with(EnvelopeType.TEMPLATE, async () => setFieldsForTemplate({
    userId: ctx.user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    fields: fields.map(field => ({
      ...field,
      pageNumber: field.page,
      pageX: field.positionX,
      pageY: field.positionY,
      pageWidth: field.width,
      pageHeight: field.height
    }))
  })).exhaustive();
  return {
    data: result.fields.map(field => ({
      ...field,
      formId: field.formId
    }))
  };
});

export { setEnvelopeFieldsRoute };
//# sourceMappingURL=set-envelope-fields.js.map
