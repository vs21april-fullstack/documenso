import { extractSessionCookieFromHeaders } from '../packages/auth/server/lib/session/session-cookies.js';
import { extractRequestMetadata } from '../packages/lib/universal/extract-request-metadata.js';

/**
 * Apply a context which can be accessed throughout the app.
 *
 * Keep this as lean as possible in terms of awaiting, because anything
 * here will increase each page load time.
 */
const appContext = async (c, next) => {
  const request = c.req.raw;
  const url = new URL(request.url);
  const noSessionCookie = extractSessionCookieFromHeaders(request.headers) === null;
  setAppContext(c, {
    requestMetadata: extractRequestMetadata(request)
  });
  // These are non page paths like API.
  if (!isPageRequest(request) || noSessionCookie || blacklistedPathsRegex.test(url.pathname)) {
    return next();
  }
  // Add context to any pages you want here.
  return next();
};
const setAppContext = (c, context) => {
  c.set('context', context);
};
const isPageRequest = request => {
  const url = new URL(request.url);
  if (request.method !== 'GET') {
    return false;
  }
  // If it ends with .data it's the loader which we need to pass context for.
  if (url.pathname.endsWith('.data')) {
    return true;
  }
  if (request.headers.get('Accept')?.includes('text/html')) {
    return true;
  }
  return false;
};
/**
 * List of paths to reject
 * - Urls that start with /api
 * - Urls that start with _
 */
const blacklistedPathsRegex = /^\/api\/|^\/__/;

export { appContext };
//# sourceMappingURL=context.js.map
