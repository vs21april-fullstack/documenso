import { ZDocumentAuditLogSchema } from '../../../lib/types/document-audit-logs.js';
import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { z } from 'zod';

const ZFindDocumentAuditLogsRequestSchema = ZFindSearchParamsSchema.extend({
  documentId: z.number().min(1),
  cursor: z.string().optional(),
  filterForRecentActivity: z.boolean().optional(),
  orderByColumn: z.enum(['createdAt', 'type']).optional(),
  orderByDirection: z.enum(['asc', 'desc']).default('desc')
});
const ZFindDocumentAuditLogsResponseSchema = ZFindResultResponse.extend({
  data: ZDocumentAuditLogSchema.array(),
  nextCursor: z.string().optional()
});

export { ZFindDocumentAuditLogsRequestSchema, ZFindDocumentAuditLogsResponseSchema };
//# sourceMappingURL=find-document-audit-logs.types.js.map
