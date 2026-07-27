import { authenticatedProcedure } from '../trpc.js';
import { downloadEnvelopeItemMeta, ZDownloadEnvelopeItemRequestSchema, ZDownloadEnvelopeItemResponseSchema } from './download-envelope-item.types.js';

const downloadEnvelopeItemRoute = authenticatedProcedure.meta(downloadEnvelopeItemMeta).input(ZDownloadEnvelopeItemRequestSchema).output(ZDownloadEnvelopeItemResponseSchema).query(({
  input,
  ctx
}) => {
  const {
    envelopeItemId,
    version
  } = input;
  ctx.logger.info({
    input: {
      envelopeItemId,
      version
    }
  });
  // This endpoint is purely for V2 API, which is implemented in the Hono remix server.
  throw new Error('NOT_IMPLEMENTED');
});

export { downloadEnvelopeItemRoute };
//# sourceMappingURL=download-envelope-item.js.map
