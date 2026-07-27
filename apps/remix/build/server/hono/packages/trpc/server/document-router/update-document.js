import { updateEnvelope } from '../../../lib/server-only/envelope/update-envelope.js';
import { mapSecondaryIdToDocumentId } from '../../../lib/utils/envelope.js';
import { authenticatedProcedure } from '../trpc.js';
import { updateDocumentMeta, ZUpdateDocumentRequestSchema, ZUpdateDocumentResponseSchema } from './update-document.types.js';

/**
 * Public route.
 */
const updateDocumentRoute = authenticatedProcedure.meta(updateDocumentMeta).input(ZUpdateDocumentRequestSchema).output(ZUpdateDocumentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    documentId,
    data,
    meta = {}
  } = input;
  ctx.logger.info({
    input: {
      documentId
    }
  });
  const userId = ctx.user.id;
  const envelope = await updateEnvelope({
    userId,
    teamId,
    id: {
      type: 'documentId',
      id: documentId
    },
    data,
    meta,
    requestMetadata: ctx.metadata
  });
  const mappedDocument = {
    ...envelope,
    id: mapSecondaryIdToDocumentId(envelope.secondaryId),
    envelopeId: envelope.id
  };
  return mappedDocument;
});

export { updateDocumentRoute };
//# sourceMappingURL=update-document.js.map
