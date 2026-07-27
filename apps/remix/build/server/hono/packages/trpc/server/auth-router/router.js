import { router } from '../trpc.js';
import { createPasskeyRoute } from './create-passkey.js';
import { createPasskeyAuthenticationOptionsRoute } from './create-passkey-authentication-options.js';
import { createPasskeyRegistrationOptionsRoute } from './create-passkey-registration-options.js';
import { createPasskeySigninOptionsRoute } from './create-passkey-signin-options.js';
import { deletePasskeyRoute } from './delete-passkey.js';
import { findPasskeysRoute } from './find-passkeys.js';
import { updatePasskeyRoute } from './update-passkey.js';

const authRouter = router({
  passkey: router({
    create: createPasskeyRoute,
    createAuthenticationOptions: createPasskeyAuthenticationOptionsRoute,
    createRegistrationOptions: createPasskeyRegistrationOptionsRoute,
    createSigninOptions: createPasskeySigninOptionsRoute,
    delete: deletePasskeyRoute,
    find: findPasskeysRoute,
    update: updatePasskeyRoute
  })
});

export { authRouter };
//# sourceMappingURL=router.js.map
