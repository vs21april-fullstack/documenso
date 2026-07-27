import { updatePasskey } from '../../../lib/server-only/auth/update-passkey.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZUpdatePasskeyRequestSchema, ZUpdatePasskeyResponseSchema } from './update-passkey.types.js';

const updatePasskeyRoute = authenticatedProcedure.input(ZUpdatePasskeyRequestSchema).output(ZUpdatePasskeyResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    passkeyId,
    name
  } = input;
  ctx.logger.info({
    input: {
      passkeyId
    }
  });
  await updatePasskey({
    userId: ctx.user.id,
    passkeyId,
    name,
    requestMetadata: ctx.metadata.requestMetadata
  });
});

export { updatePasskeyRoute };
//# sourceMappingURL=update-passkey.js.map
