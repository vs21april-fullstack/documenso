import '../../../../../lib/errors/app-error.js';
import { setSignedCookie } from 'hono/cookie';
import 'hono/utils/cookie';
import { z } from 'zod';
import { CSC_BLOCKING_ERROR_COOKIE_NAME, getCscCookieSecret, cscCookieBaseOptions } from './shared.js';

/**
 * `csc_blocking_error` — one-shot surface for service-scope OAuth callback
 * failures the recipient can't self-resolve (empty credential list, invalid
 * cert, refused algorithm, etc.). The `/sign/{token}` loader reads + clears
 * it on next visit so no error state rides on URL query params.
 */
const CSC_BLOCKING_ERROR_MAX_AGE_SECONDS = 60 * 10; // 10 minutes — matches the other short-lived CSC cookies.
z.object({
  /** `AppErrorCode` value, e.g. `'CSC_CREDENTIAL_LIST_EMPTY'`. */
  code: z.string().min(1),
  /** Recipient token from `/sign/{token}`; loader scopes the error to its recipient. */
  recipientToken: z.string().min(1)
});
const setCscBlockingErrorCookie = async options => {
  const {
    c,
    payload
  } = options;
  await setSignedCookie(c, CSC_BLOCKING_ERROR_COOKIE_NAME, JSON.stringify(payload), getCscCookieSecret(), {
    ...cscCookieBaseOptions,
    maxAge: CSC_BLOCKING_ERROR_MAX_AGE_SECONDS
  });
};

export { setCscBlockingErrorCookie };
//# sourceMappingURL=blocking-error-cookie.js.map
