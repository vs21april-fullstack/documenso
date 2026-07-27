import { searchDocumentsWithKeyword } from '../../../lib/server-only/document/search-documents-with-keyword.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZSearchDocumentRequestSchema, ZSearchDocumentResponseSchema } from './search-document.types.js';

const searchDocumentRoute = authenticatedProcedure.input(ZSearchDocumentRequestSchema).output(ZSearchDocumentResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    query
  } = input;
  const documents = await searchDocumentsWithKeyword({
    query,
    userId: ctx.user.id
  });
  return documents;
});

export { searchDocumentRoute };
//# sourceMappingURL=search-document.js.map
