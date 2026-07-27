import { findDocumentAuditLogs } from '../../../lib/server-only/document/find-document-audit-logs.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindDocumentAuditLogsRequestSchema, ZFindDocumentAuditLogsResponseSchema } from './find-document-audit-logs.types.js';

const findDocumentAuditLogsRoute = authenticatedProcedure.input(ZFindDocumentAuditLogsRequestSchema).output(ZFindDocumentAuditLogsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    page,
    perPage,
    documentId,
    cursor,
    filterForRecentActivity,
    orderByColumn,
    orderByDirection
  } = input;
  ctx.logger.info({
    input: {
      documentId
    }
  });
  return await findDocumentAuditLogs({
    userId: ctx.user.id,
    teamId,
    page,
    perPage,
    documentId,
    cursor,
    filterForRecentActivity,
    orderBy: orderByColumn ? {
      column: orderByColumn,
      direction: orderByDirection
    } : undefined
  });
});

export { findDocumentAuditLogsRoute };
//# sourceMappingURL=find-document-audit-logs.js.map
