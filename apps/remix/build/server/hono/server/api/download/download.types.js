import { z } from 'zod';

const ZDownloadEnvelopeItemRequestParamsSchema = z.object({
  envelopeItemId: z.string().describe('The ID of the envelope item to download.')
});
const ZDownloadEnvelopeItemRequestQuerySchema = z.object({
  version: z.enum(['original', 'signed', 'pending']).optional().default('signed').describe('The version of the envelope item to download. "signed" returns the completed document with all signatures and the audit trail, "original" returns the original uploaded document, "pending" returns the original document with currently-inserted fields burned in (only valid while the envelope is in PENDING status; not a final executed document).')
});
const ZDownloadDocumentRequestParamsSchema = z.object({
  documentId: z.coerce.number().describe('The ID of the document to download.'),
  version: z.enum(['original', 'signed']).optional().default('signed').describe('The version of the document to download. "signed" returns the completed document with signatures, "original" returns the original uploaded document.')
});
const ZDownloadEnvelopeAuditLogPdfRequestParamsSchema = z.object({
  envelopeId: z.string().describe('The ID of the envelope to download the audit log for.')
});
const ZDownloadEnvelopeCertificatePdfRequestParamsSchema = z.object({
  envelopeId: z.string().describe('The ID of the envelope to download the certificate for.')
});

export { ZDownloadDocumentRequestParamsSchema, ZDownloadEnvelopeAuditLogPdfRequestParamsSchema, ZDownloadEnvelopeCertificatePdfRequestParamsSchema, ZDownloadEnvelopeItemRequestParamsSchema, ZDownloadEnvelopeItemRequestQuerySchema };
//# sourceMappingURL=download.types.js.map
