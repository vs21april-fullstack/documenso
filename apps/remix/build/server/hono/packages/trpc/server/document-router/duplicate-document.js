import { duplicateEnvelope } from '../../../lib/server-only/envelope/duplicate-envelope.js';
import { authenticatedProcedure } from '../trpc.js';
import { duplicateDocumentMeta, ZDuplicateDocumentRequestSchema, ZDuplicateDocumentResponseSchema } from './duplicate-document.types.js';

const duplicateDocumentRoute = authenticatedProcedure.meta(duplicateDocumentMeta).input(ZDuplicateDocumentRequestSchema).output(ZDuplicateDocumentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    documentId
  } = input;
  ctx.logger.info({
    input: {
      documentId
    }
  });
  const duplicatedEnvelope = await duplicateEnvelope({
    id: {
      type: 'documentId',
      id: documentId
    },
    userId: user.id,
    teamId
  });
  return {
    id: duplicatedEnvelope.id,
    documentId: duplicatedEnvelope.legacyId.id
  };
});

export { duplicateDocumentRoute };
//# sourceMappingURL=duplicate-document.js.map
