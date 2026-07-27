import { deleteDocument } from '../../../lib/server-only/document/delete-document.js';
import { ZGenericSuccessResponse } from '../schema.js';
import { authenticatedProcedure } from '../trpc.js';
import { deleteDocumentMeta, ZDeleteDocumentRequestSchema, ZDeleteDocumentResponseSchema } from './delete-document.types.js';

const deleteDocumentRoute = authenticatedProcedure.meta(deleteDocumentMeta).input(ZDeleteDocumentRequestSchema).output(ZDeleteDocumentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    documentId
  } = input;
  ctx.logger.info({
    input: {
      documentId
    }
  });
  const userId = ctx.user.id;
  await deleteDocument({
    id: {
      type: 'documentId',
      id: documentId
    },
    userId,
    teamId,
    requestMetadata: ctx.metadata
  });
  return ZGenericSuccessResponse;
});

export { deleteDocumentRoute };
//# sourceMappingURL=delete-document.js.map
