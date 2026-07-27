import { deletePasskey } from '../../../lib/server-only/auth/delete-passkey.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZDeletePasskeyRequestSchema, ZDeletePasskeyResponseSchema } from './delete-passkey.types.js';

const deletePasskeyRoute = authenticatedProcedure.input(ZDeletePasskeyRequestSchema).output(ZDeletePasskeyResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    passkeyId
  } = input;
  ctx.logger.info({
    input: {
      passkeyId
    }
  });
  await deletePasskey({
    userId: ctx.user.id,
    passkeyId,
    requestMetadata: ctx.metadata.requestMetadata
  });
});

export { deletePasskeyRoute };
//# sourceMappingURL=delete-passkey.js.map
