import { resendDocument } from '../../../lib/server-only/document/resend-document.js';
import { ZGenericSuccessResponse } from '../schema.js';
import { authenticatedProcedure } from '../trpc.js';
import { redistributeDocumentMeta, ZRedistributeDocumentRequestSchema, ZRedistributeDocumentResponseSchema } from './redistribute-document.types.js';

const redistributeDocumentRoute = authenticatedProcedure.meta(redistributeDocumentMeta).input(ZRedistributeDocumentRequestSchema).output(ZRedistributeDocumentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    documentId,
    recipients
  } = input;
  ctx.logger.info({
    input: {
      documentId,
      recipients
    }
  });
  await resendDocument({
    userId: ctx.user.id,
    teamId,
    id: {
      type: 'documentId',
      id: documentId
    },
    recipients,
    requestMetadata: ctx.metadata
  });
  return ZGenericSuccessResponse;
});

export { redistributeDocumentRoute };
//# sourceMappingURL=redistribute-document.js.map
