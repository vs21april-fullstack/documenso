import { z } from 'zod';

const ZAdminDownloadDocumentAuditLogsRequestSchema = z.object({
  envelopeId: z.string()
});
const ZAdminDownloadDocumentAuditLogsResponseSchema = z.object({
  data: z.string(),
  envelopeTitle: z.string()
});

export { ZAdminDownloadDocumentAuditLogsRequestSchema, ZAdminDownloadDocumentAuditLogsResponseSchema };
//# sourceMappingURL=download-document-audit-logs.types.js.map
