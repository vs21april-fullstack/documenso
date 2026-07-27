import { z } from 'zod';

const ZDownloadDocumentAuditLogsRequestSchema = z.object({
  envelopeId: z.string()
});
const ZDownloadDocumentAuditLogsResponseSchema = z.object({
  data: z.string(),
  envelopeTitle: z.string()
});

export { ZDownloadDocumentAuditLogsRequestSchema, ZDownloadDocumentAuditLogsResponseSchema };
//# sourceMappingURL=download-document-audit-logs.types.js.map
