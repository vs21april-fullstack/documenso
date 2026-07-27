import { authenticatedProcedure } from '../trpc.js';
import { downloadEnvelopeCertificatePdfMeta, ZDownloadEnvelopeCertificatePdfRequestSchema, ZDownloadEnvelopeCertificatePdfResponseSchema } from './download-envelope-certificate-pdf.types.js';

const downloadEnvelopeCertificatePdfRoute = authenticatedProcedure.meta(downloadEnvelopeCertificatePdfMeta).input(ZDownloadEnvelopeCertificatePdfRequestSchema).output(ZDownloadEnvelopeCertificatePdfResponseSchema).query(({
  input,
  ctx
}) => {
  const {
    envelopeId
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  // This endpoint is purely for V2 API, which is implemented in the Hono remix server.
  throw new Error('NOT_IMPLEMENTED');
});

export { downloadEnvelopeCertificatePdfRoute };
//# sourceMappingURL=download-envelope-certificate-pdf.js.map
