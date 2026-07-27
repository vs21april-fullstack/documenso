import { getServerLimits } from '../../../ee/server-only/limits/server.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { convertToPdf } from '../../../lib/server-only/document-conversion/index.js';
import { createEnvelope } from '../../../lib/server-only/envelope/create-envelope.js';
import { insertFormValuesInPdf } from '../../../lib/server-only/pdf/insert-form-values-in-pdf.js';
import { putNormalizedPdfFileServerSide } from '../../../lib/universal/upload/put-file.server.js';
import { mapSecondaryIdToDocumentId } from '../../../lib/utils/envelope.js';
import { EnvelopeType } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { createDocumentMeta, ZCreateDocumentRequestSchema, ZCreateDocumentResponseSchema } from './create-document.types.js';

const createDocumentRoute = authenticatedProcedure.meta(createDocumentMeta).input(ZCreateDocumentRequestSchema).output(ZCreateDocumentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId
  } = ctx;
  const {
    payload,
    file
  } = input;
  const {
    title,
    externalId,
    visibility,
    globalAccessAuth,
    globalActionAuth,
    recipients,
    meta,
    folderId,
    formValues,
    attachments
  } = payload;
  let pdf = await convertToPdf(file, ctx.logger);
  if (formValues) {
    // eslint-disable-next-line require-atomic-updates
    pdf = await insertFormValuesInPdf({
      pdf,
      formValues
    });
  }
  const {
    id: documentDataId
  } = await putNormalizedPdfFileServerSide({
    name: file.name,
    type: 'application/pdf',
    arrayBuffer: async () => Promise.resolve(pdf)
  });
  ctx.logger.info({
    input: {
      folderId
    }
  });
  const {
    remaining
  } = await getServerLimits({
    userId: user.id,
    teamId
  });
  if (remaining.documents <= 0) {
    throw new AppError(AppErrorCode.LIMIT_EXCEEDED, {
      message: 'You have reached your document limit for this month. Please upgrade your plan.',
      statusCode: 400
    });
  }
  const document = await createEnvelope({
    userId: user.id,
    teamId,
    internalVersion: 1,
    data: {
      type: EnvelopeType.DOCUMENT,
      title,
      externalId,
      visibility,
      globalAccessAuth,
      globalActionAuth,
      formValues,
      recipients: (recipients || []).map(recipient => ({
        ...recipient,
        fields: (recipient.fields || []).map(field => ({
          ...field,
          page: field.pageNumber,
          positionX: field.pageX,
          positionY: field.pageY,
          documentDataId
        }))
      })),
      folderId,
      envelopeItems: [{
        // If you ever allow more than 1 in this endpoint, make sure to use `maximumEnvelopeItemCount` to limit it.
        documentDataId
      }]
    },
    attachments,
    meta: {
      ...meta,
      emailSettings: meta?.emailSettings ?? undefined
    },
    requestMetadata: ctx.metadata
  });
  return {
    envelopeId: document.id,
    id: mapSecondaryIdToDocumentId(document.secondaryId)
  };
});

export { createDocumentRoute };
//# sourceMappingURL=create-document.js.map
