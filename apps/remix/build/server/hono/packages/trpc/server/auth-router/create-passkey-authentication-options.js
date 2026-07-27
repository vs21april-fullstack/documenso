import { createPasskeyAuthenticationOptions } from '../../../lib/server-only/auth/create-passkey-authentication-options.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZCreatePasskeyAuthenticationOptionsRequestSchema, ZCreatePasskeyAuthenticationOptionsResponseSchema } from './create-passkey-authentication-options.types.js';

const createPasskeyAuthenticationOptionsRoute = authenticatedProcedure.input(ZCreatePasskeyAuthenticationOptionsRequestSchema).output(ZCreatePasskeyAuthenticationOptionsResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  return await createPasskeyAuthenticationOptions({
    userId: ctx.user.id,
    preferredPasskeyId: input?.preferredPasskeyId
  });
});

export { createPasskeyAuthenticationOptionsRoute };
//# sourceMappingURL=create-passkey-authentication-options.js.map
