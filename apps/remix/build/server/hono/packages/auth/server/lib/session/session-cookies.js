import { formatSecureCookieName, getCookieDomain, useSecureCookies } from '../../../../lib/constants/auth.js';
import { appLog } from '../../../../lib/utils/debugger.js';
import { env } from '../../../../lib/utils/env.js';
import { getSignedCookie, setSignedCookie, deleteCookie } from 'hono/cookie';
import { AUTH_SESSION_LIFETIME } from '../../config.js';
import { extractCookieFromHeaders } from '../utils/cookies.js';
import { generateSessionToken } from './session.js';

const sessionCookieName = formatSecureCookieName('sessionId');
const csrfCookieName = formatSecureCookieName('csrfToken');
const getAuthSecret = () => {
  const authSecret = env('NEXTAUTH_SECRET');
  if (!authSecret) {
    throw new Error('NEXTAUTH_SECRET is not set');
  }
  return authSecret;
};
/**
 * Generic auth session cookie options.
 */
const sessionCookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: useSecureCookies ? 'none' : 'lax',
  secure: useSecureCookies,
  domain: getCookieDomain()
};
const extractSessionCookieFromHeaders = headers => {
  return extractCookieFromHeaders(sessionCookieName, headers);
};
/**
 * Get the session cookie attached to the request headers.
 *
 * @param c - The Hono context.
 * @returns The session ID or null if no session cookie is found.
 */
const getSessionCookie = async c => {
  const sessionId = await getSignedCookie(c, getAuthSecret(), sessionCookieName);
  return sessionId || null;
};
/**
 * Set the session cookie into the Hono context.
 *
 * @param c - The Hono context.
 * @param sessionToken - The session token to set.
 */
const setSessionCookie = async (c, sessionToken) => {
  await setSignedCookie(c, sessionCookieName, sessionToken, getAuthSecret(), {
    ...sessionCookieOptions,
    expires: new Date(Date.now() + AUTH_SESSION_LIFETIME)
  }).catch(err => {
    appLog('SetSessionCookie', `Error setting signed cookie: ${err}`);
    throw err;
  });
};
/**
 * Set the session cookie into the Hono context.
 *
 * @param c - The Hono context.
 * @param sessionToken - The session token to set.
 */
const deleteSessionCookie = c => {
  deleteCookie(c, sessionCookieName, sessionCookieOptions);
};
const getCsrfCookie = async c => {
  const csrfToken = await getSignedCookie(c, getAuthSecret(), csrfCookieName);
  return csrfToken || null;
};
const setCsrfCookie = async c => {
  const csrfToken = generateSessionToken();
  await setSignedCookie(c, csrfCookieName, csrfToken, getAuthSecret(), {
    ...sessionCookieOptions,
    // Explicity set to undefined for session lived cookie.
    expires: undefined,
    maxAge: undefined
  });
  return csrfToken;
};

export { csrfCookieName, deleteSessionCookie, extractSessionCookieFromHeaders, getCsrfCookie, getSessionCookie, sessionCookieName, sessionCookieOptions, setCsrfCookie, setSessionCookie };
//# sourceMappingURL=session-cookies.js.map
