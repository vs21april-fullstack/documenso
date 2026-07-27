import { createPasskey } from '../../../lib/server-only/auth/create-passkey.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZCreatePasskeyRequestSchema, ZCreatePasskeyResponseSchema } from './create-passkey.types.js';

const createPasskeyRoute = authenticatedProcedure.input(ZCreatePasskeyRequestSchema).output(ZCreatePasskeyResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const verificationResponse = input.verificationResponse;
  return await createPasskey({
    userId: ctx.user.id,
    verificationResponse,
    passkeyName: input.passkeyName,
    requestMetadata: ctx.metadata.requestMetadata
  });
});

export { createPasskeyRoute };
//# sourceMappingURL=create-passkey.js.map
