import { z } from 'zod';

const downloadEnvelopeCertificatePdfMeta = {
  openapi: {
    method: 'GET',
    path: '/envelope/{envelopeId}/certificate/download',
    summary: 'Download envelope certificate PDF',
    description: 'Download the signing certificate for a completed document as a PDF.',
    tags: ['Envelope'],
    responseHeaders: z.object({
      'Content-Type': z.literal('application/pdf')
    })
  }
};
const ZDownloadEnvelopeCertificatePdfRequestSchema = z.object({
  envelopeId: z.string().describe('The ID of the envelope to download the certificate for.')
});
const ZDownloadEnvelopeCertificatePdfResponseSchema = z.instanceof(Uint8Array);

export { ZDownloadEnvelopeCertificatePdfRequestSchema, ZDownloadEnvelopeCertificatePdfResponseSchema, downloadEnvelopeCertificatePdfMeta };
//# sourceMappingURL=download-envelope-certificate-pdf.types.js.map
