import { adminFindUnsealedDocuments } from '../../../lib/server-only/admin/admin-find-unsealed-documents.js';
import { adminProcedure } from '../trpc.js';
import { ZFindUnsealedDocumentsRequestSchema, ZFindUnsealedDocumentsResponseSchema } from './find-unsealed-documents.types.js';

const findUnsealedDocumentsRoute = adminProcedure.input(ZFindUnsealedDocumentsRequestSchema).output(ZFindUnsealedDocumentsResponseSchema).query(async ({
  input
}) => {
  const {
    page,
    perPage
  } = input;
  return await adminFindUnsealedDocuments({
    page,
    perPage
  });
});

export { findUnsealedDocumentsRoute };
//# sourceMappingURL=find-unsealed-documents.js.map
