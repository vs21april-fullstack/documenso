import { updateAttachment } from '../../../../lib/server-only/envelope-attachment/update-attachment.js';
import { ZGenericSuccessResponse } from '../../schema.js';
import { authenticatedProcedure } from '../../trpc.js';
import { updateAttachmentMeta, ZUpdateAttachmentRequestSchema, ZUpdateAttachmentResponseSchema } from './update-attachment.types.js';

const updateAttachmentRoute = authenticatedProcedure.meta(updateAttachmentMeta).input(ZUpdateAttachmentRequestSchema).output(ZUpdateAttachmentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const userId = ctx.user.id;
  const {
    id,
    data
  } = input;
  ctx.logger.info({
    input: {
      id
    }
  });
  await updateAttachment({
    id,
    userId,
    teamId,
    data
  });
  return ZGenericSuccessResponse;
});

export { updateAttachmentRoute };
//# sourceMappingURL=update-attachment.js.map
