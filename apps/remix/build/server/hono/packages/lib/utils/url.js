import { NEXT_PUBLIC_WEBAPP_URL } from '../constants/app.js';

/**
 * Safely resolves a path against the webapp's base URL.
 *
 * Ensures that:
 * 1. The webapp URL (which may have a subdirectory path prefix) has a trailing slash.
 * 2. The path lacks a leading slash during resolution, so it resolves relative
 *    to the webapp URL's path prefix rather than the domain root.
 * 3. Double slashes are avoided.
 */
const resolveWebappUrl = (path) => {
  const webappUrl = NEXT_PUBLIC_WEBAPP_URL();
  const base = webappUrl.endsWith('/') ? webappUrl : `${webappUrl}/`;
  const cleanPath = path.replace(/^\/+/, '');
  return new URL(cleanPath, base).toString();
};

export { resolveWebappUrl };
//# sourceMappingURL=url.js.map
