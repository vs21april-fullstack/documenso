import { z } from 'zod';

const downloadEnvelopeAuditLogPdfMeta = {
  openapi: {
    method: 'GET',
    path: '/envelope/{envelopeId}/audit-log/download',
    summary: 'Download envelope audit log PDF',
    description: 'Download the audit log for a document as a PDF.',
    tags: ['Envelope'],
    responseHeaders: z.object({
      'Content-Type': z.literal('application/pdf')
    })
  }
};
const ZDownloadEnvelopeAuditLogPdfRequestSchema = z.object({
  envelopeId: z.string().describe('The ID of the envelope to download the audit log for.')
});
const ZDownloadEnvelopeAuditLogPdfResponseSchema = z.instanceof(Uint8Array);

export { ZDownloadEnvelopeAuditLogPdfRequestSchema, ZDownloadEnvelopeAuditLogPdfResponseSchema, downloadEnvelopeAuditLogPdfMeta };
//# sourceMappingURL=download-envelope-audit-log-pdf.types.js.map
