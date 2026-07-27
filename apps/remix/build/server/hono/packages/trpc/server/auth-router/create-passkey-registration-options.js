import { createPasskeyRegistrationOptions } from '../../../lib/server-only/auth/create-passkey-registration-options.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZCreatePasskeyRegistrationOptionsRequestSchema, ZCreatePasskeyRegistrationOptionsResponseSchema } from './create-passkey-registration-options.types.js';

const createPasskeyRegistrationOptionsRoute = authenticatedProcedure.input(ZCreatePasskeyRegistrationOptionsRequestSchema).output(ZCreatePasskeyRegistrationOptionsResponseSchema).mutation(async ({
  ctx
}) => {
  return await createPasskeyRegistrationOptions({
    userId: ctx.user.id
  });
});

export { createPasskeyRegistrationOptionsRoute };
//# sourceMappingURL=create-passkey-registration-options.js.map
