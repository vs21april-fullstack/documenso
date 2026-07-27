import { ZDocumentAuditLogSchema } from '../../../lib/types/document-audit-logs.js';
import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { z } from 'zod';

const findEnvelopeAuditLogsMeta = {
  openapi: {
    method: 'GET',
    path: '/envelope/{envelopeId}/audit-log',
    summary: 'Get envelope audit logs',
    description: 'Find audit logs based on a search criteria',
    tags: ['Envelope']
  }
};
const ZFindEnvelopeAuditLogsRequestSchema = ZFindSearchParamsSchema.omit({
  query: true
}).extend({
  envelopeId: z.string().describe('Envelope ID'),
  orderByColumn: z.enum(['createdAt']).optional(),
  orderByDirection: z.enum(['asc', 'desc']).optional()
});
const ZFindEnvelopeAuditLogsResponseSchema = ZFindResultResponse.extend({
  data: ZDocumentAuditLogSchema.array()
});

export { ZFindEnvelopeAuditLogsRequestSchema, ZFindEnvelopeAuditLogsResponseSchema, findEnvelopeAuditLogsMeta };
//# sourceMappingURL=find-envelope-audit-logs.types.js.map
