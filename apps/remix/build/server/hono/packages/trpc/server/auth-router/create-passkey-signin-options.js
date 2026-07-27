import { createPasskeySigninOptions } from '../../../lib/server-only/auth/create-passkey-signin-options.js';
import '../../../lib/universal/id.js';
import { procedure } from '../trpc.js';
import { ZCreatePasskeySigninOptionsRequestSchema, ZCreatePasskeySigninOptionsResponseSchema } from './create-passkey-signin-options.types.js';
import { nanoid } from 'nanoid';

const createPasskeySigninOptionsRoute = procedure.input(ZCreatePasskeySigninOptionsRequestSchema).output(ZCreatePasskeySigninOptionsResponseSchema).mutation(async () => {
  const sessionIdToken = nanoid(16);
  const [sessionId] = decodeURI(sessionIdToken).split('|');
  const options = await createPasskeySigninOptions({
    sessionId
  });
  return {
    options,
    sessionId
  };
});

export { createPasskeySigninOptionsRoute };
//# sourceMappingURL=create-passkey-signin-options.js.map
