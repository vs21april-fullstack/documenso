import { setSignedCookie } from 'hono/cookie';
import 'hono/utils/cookie';
import { CSC_SAD_SESSION_COOKIE_NAME, getCscCookieSecret, cscCookieBaseOptions } from './shared.js';

const setCscSadSessionCookie = async options => {
  const {
    c,
    sessionId,
    expiresAt
  } = options;
  await setSignedCookie(c, CSC_SAD_SESSION_COOKIE_NAME, sessionId, getCscCookieSecret(), {
    ...cscCookieBaseOptions,
    expires: expiresAt
  });
};

export { setCscSadSessionCookie };
//# sourceMappingURL=sad-session-cookie.js.map
