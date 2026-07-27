import { z } from 'zod';

const ZDownloadDocumentCertificateRequestSchema = z.object({
  envelopeId: z.string()
});
const ZDownloadDocumentCertificateResponseSchema = z.object({
  data: z.string(),
  envelopeTitle: z.string()
});

export { ZDownloadDocumentCertificateRequestSchema, ZDownloadDocumentCertificateResponseSchema };
//# sourceMappingURL=download-document-certificate.types.js.map
