/**
 * Todo: Use library for cookies instead.
 */
const extractCookieFromHeaders = (cookieName, headers) => {
  const cookieHeader = headers.get('cookie') || '';
  const cookiePairs = cookieHeader.split(';');
  const cookie = cookiePairs.find(pair => pair.trim().startsWith(cookieName));
  if (!cookie) {
    return null;
  }
  return cookie.split('=')[1].trim();
};

export { extractCookieFromHeaders };
//# sourceMappingURL=cookies.js.map
