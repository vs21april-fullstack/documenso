import { adminFindDocuments } from '../../../lib/server-only/admin/admin-find-documents.js';
import { mapEnvelopesToDocumentMany } from '../../../lib/utils/document.js';
import { adminProcedure } from '../trpc.js';
import { ZFindDocumentsRequestSchema, ZFindDocumentsResponseSchema } from './find-documents.types.js';

const findDocumentsRoute = adminProcedure.input(ZFindDocumentsRequestSchema).output(ZFindDocumentsResponseSchema).query(async ({
  input
}) => {
  const {
    query,
    page,
    perPage
  } = input;
  const result = await adminFindDocuments({
    query,
    page,
    perPage
  });
  return {
    ...result,
    data: result.data.map(mapEnvelopesToDocumentMany)
  };
});

export { findDocumentsRoute };
//# sourceMappingURL=find-documents.js.map
