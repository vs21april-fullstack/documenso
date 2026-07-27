import { createAttachment } from '../../../../lib/server-only/envelope-attachment/create-attachment.js';
import { authenticatedProcedure } from '../../trpc.js';
import { createAttachmentMeta, ZCreateAttachmentRequestSchema, ZCreateAttachmentResponseSchema } from './create-attachment.types.js';

const createAttachmentRoute = authenticatedProcedure.meta(createAttachmentMeta).input(ZCreateAttachmentRequestSchema).output(ZCreateAttachmentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const userId = ctx.user.id;
  const {
    envelopeId,
    data
  } = input;
  ctx.logger.info({
    input: {
      envelopeId,
      label: data.label
    }
  });
  const attachment = await createAttachment({
    envelopeId,
    teamId,
    userId,
    data
  });
  return {
    id: attachment.id
  };
});

export { createAttachmentRoute };
//# sourceMappingURL=create-attachment.js.map
