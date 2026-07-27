import { findDocuments } from '../../../lib/server-only/document/find-documents.js';
import { mapEnvelopesToDocumentMany } from '../../../lib/utils/document.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindDocumentsMeta, ZFindDocumentsRequestSchema, ZFindDocumentsResponseSchema } from './find-documents.types.js';

const findDocumentsRoute = authenticatedProcedure.meta(ZFindDocumentsMeta).input(ZFindDocumentsRequestSchema).output(ZFindDocumentsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId
  } = ctx;
  const {
    query,
    templateId,
    page,
    perPage,
    orderByDirection,
    orderByColumn,
    source,
    status,
    folderId
  } = input;
  const documents = await findDocuments({
    userId: user.id,
    teamId,
    templateId,
    query,
    source,
    status,
    page,
    perPage,
    folderId,
    orderBy: orderByColumn ? {
      column: orderByColumn,
      direction: orderByDirection
    } : undefined,
    useWindowedCount: false
  });
  return {
    ...documents,
    data: documents.data.map(envelope => mapEnvelopesToDocumentMany(envelope))
  };
});

export { findDocumentsRoute };
//# sourceMappingURL=find-documents.js.map
