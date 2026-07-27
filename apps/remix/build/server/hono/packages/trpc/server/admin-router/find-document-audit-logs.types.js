import { ZDocumentAuditLogSchema } from '../../../lib/types/document-audit-logs.js';
import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { z } from 'zod';

const ZFindDocumentAuditLogsRequestSchema = ZFindSearchParamsSchema.extend({
  envelopeId: z.string(),
  orderByColumn: z.enum(['createdAt']).optional(),
  orderByDirection: z.enum(['asc', 'desc']).optional()
});
const ZFindDocumentAuditLogsResponseSchema = ZFindResultResponse.extend({
  data: ZDocumentAuditLogSchema.array()
});

export { ZFindDocumentAuditLogsRequestSchema, ZFindDocumentAuditLogsResponseSchema };
//# sourceMappingURL=find-document-audit-logs.types.js.map
