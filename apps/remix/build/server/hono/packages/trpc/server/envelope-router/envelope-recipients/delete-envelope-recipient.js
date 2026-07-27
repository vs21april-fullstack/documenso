import { deleteEnvelopeRecipient } from '../../../../lib/server-only/recipient/delete-envelope-recipient.js';
import { ZGenericSuccessResponse } from '../../schema.js';
import { authenticatedProcedure } from '../../trpc.js';
import { deleteEnvelopeRecipientMeta, ZDeleteEnvelopeRecipientRequestSchema, ZDeleteEnvelopeRecipientResponseSchema } from './delete-envelope-recipient.types.js';

const deleteEnvelopeRecipientRoute = authenticatedProcedure.meta(deleteEnvelopeRecipientMeta).input(ZDeleteEnvelopeRecipientRequestSchema).output(ZDeleteEnvelopeRecipientResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId,
    metadata
  } = ctx;
  const {
    recipientId
  } = input;
  ctx.logger.info({
    input: {
      recipientId
    }
  });
  await deleteEnvelopeRecipient({
    userId: user.id,
    teamId,
    recipientId,
    requestMetadata: metadata
  });
  return ZGenericSuccessResponse;
});

export { deleteEnvelopeRecipientRoute };
//# sourceMappingURL=delete-envelope-recipient.js.map
