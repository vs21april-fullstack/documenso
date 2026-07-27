import { setSignedCookie } from 'hono/cookie';
import 'hono/utils/cookie';
import { CSC_SERVICE_SESSION_COOKIE_NAME, getCscCookieSecret, cscCookieBaseOptions } from './shared.js';

const setCscServiceSessionCookie = async options => {
  const {
    c,
    recipientToken,
    ttlSeconds
  } = options;
  await setSignedCookie(c, CSC_SERVICE_SESSION_COOKIE_NAME, recipientToken, getCscCookieSecret(), {
    ...cscCookieBaseOptions,
    maxAge: ttlSeconds
  });
};

export { setCscServiceSessionCookie };
//# sourceMappingURL=service-session-cookie.js.map
