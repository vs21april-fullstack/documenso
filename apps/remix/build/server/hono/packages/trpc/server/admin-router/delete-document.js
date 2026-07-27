import { adminSuperDeleteDocument } from '../../../lib/server-only/admin/admin-super-delete-document.js';
import { sendDeleteEmail } from '../../../lib/server-only/document/send-delete-email.js';
import { adminProcedure } from '../trpc.js';
import { ZDeleteDocumentRequestSchema, ZDeleteDocumentResponseSchema } from './delete-document.types.js';

const deleteDocumentRoute = adminProcedure.input(ZDeleteDocumentRequestSchema).output(ZDeleteDocumentResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    id,
    reason
  } = input;
  ctx.logger.info({
    input: {
      id
    }
  });
  await sendDeleteEmail({
    envelopeId: id,
    reason
  });
  await adminSuperDeleteDocument({
    envelopeId: id,
    requestMetadata: ctx.metadata.requestMetadata
  });
});

export { deleteDocumentRoute };
//# sourceMappingURL=delete-document.js.map
