import { NEXT_PUBLIC_WEBAPP_URL } from '../constants/app.js';
import { PASSKEY_TIMEOUT } from '../constants/auth.js';

/**
 * Extracts common fields to identify the RP (relying party)
 */
const getAuthenticatorOptions = () => {
  const webAppBaseUrl = new URL(NEXT_PUBLIC_WEBAPP_URL());
  const rpId = webAppBaseUrl.hostname;
  return {
    rpName: 'Documenso',
    rpId,
    origin: NEXT_PUBLIC_WEBAPP_URL(),
    timeout: PASSKEY_TIMEOUT
  };
};

export { getAuthenticatorOptions };
//# sourceMappingURL=authenticator.js.map
