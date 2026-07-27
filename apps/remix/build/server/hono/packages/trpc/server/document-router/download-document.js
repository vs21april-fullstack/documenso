import { authenticatedProcedure } from '../trpc.js';
import { downloadDocumentMeta, ZDownloadDocumentRequestSchema, ZDownloadDocumentResponseSchema } from './download-document.types.js';

const downloadDocumentRoute = authenticatedProcedure.meta(downloadDocumentMeta).input(ZDownloadDocumentRequestSchema).output(ZDownloadDocumentResponseSchema).query(({
  input,
  ctx
}) => {
  const {
    documentId,
    version
  } = input;
  ctx.logger.info({
    input: {
      documentId,
      version
    }
  });
  // This endpoint is purely for V2 API, which is implemented in the Hono remix server.
  throw new Error('NOT_IMPLEMENTED');
});

export { downloadDocumentRoute };
//# sourceMappingURL=download-document.js.map
