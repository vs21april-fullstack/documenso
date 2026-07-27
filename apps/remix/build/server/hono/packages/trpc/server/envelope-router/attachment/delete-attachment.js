import { deleteAttachment } from '../../../../lib/server-only/envelope-attachment/delete-attachment.js';
import { ZGenericSuccessResponse } from '../../schema.js';
import { authenticatedProcedure } from '../../trpc.js';
import { deleteAttachmentMeta, ZDeleteAttachmentRequestSchema, ZDeleteAttachmentResponseSchema } from './delete-attachment.types.js';

const deleteAttachmentRoute = authenticatedProcedure.meta(deleteAttachmentMeta).input(ZDeleteAttachmentRequestSchema).output(ZDeleteAttachmentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const userId = ctx.user.id;
  const {
    id
  } = input;
  ctx.logger.info({
    input: {
      id
    }
  });
  await deleteAttachment({
    id,
    userId,
    teamId
  });
  return ZGenericSuccessResponse;
});

export { deleteAttachmentRoute };
//# sourceMappingURL=delete-attachment.js.map
