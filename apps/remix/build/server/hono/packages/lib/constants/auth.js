import MailChecker from 'mailchecker';
import { env } from '../utils/env.js';
import { NEXT_PUBLIC_WEBAPP_URL } from './app.js';

const SALT_ROUNDS = 12;
Boolean(env('NEXT_PRIVATE_GOOGLE_CLIENT_ID') && env('NEXT_PRIVATE_GOOGLE_CLIENT_SECRET'));
Boolean(env('NEXT_PRIVATE_MICROSOFT_CLIENT_ID') && env('NEXT_PRIVATE_MICROSOFT_CLIENT_SECRET'));
Boolean(env('NEXT_PRIVATE_OIDC_WELL_KNOWN') && env('NEXT_PRIVATE_OIDC_CLIENT_ID') && env('NEXT_PRIVATE_OIDC_CLIENT_SECRET'));
env('NEXT_PRIVATE_OIDC_PROVIDER_LABEL');
/**
 * Opt-out flag for the automatic OIDC redirect.
 *
 * When OIDC is the only enabled signin transport we redirect to the provider
 * automatically. Set this to "true" to keep rendering the signin page instead.
 */
env('NEXT_PUBLIC_DISABLE_OIDC_AUTO_REDIRECT') === 'true';
/**
 * The duration to wait for a passkey to be verified in MS.
 */
const PASSKEY_TIMEOUT = 60000;
/**
 * The maximum number of passkeys are user can have.
 */
const MAXIMUM_PASSKEYS = 50;
const useSecureCookies = env('NODE_ENV') === 'production' && String(NEXT_PUBLIC_WEBAPP_URL()).startsWith('https://');
const secureCookiePrefix = useSecureCookies ? '__Secure-' : '';
const formatSecureCookieName = name => `${secureCookiePrefix}${name}`;
const getCookieDomain = () => {
  const url = new URL(NEXT_PUBLIC_WEBAPP_URL());
  return url.hostname;
};
/**
 * Get allowed signup domains from env var.
 * Returns empty array if not set (meaning all domains allowed).
 */
const getAllowedSignupDomains = () => {
  const domains = env('NEXT_PRIVATE_ALLOWED_SIGNUP_DOMAINS');
  if (!domains) {
    return [];
  }
  return domains.split(',').map(d => d.trim().toLowerCase()).filter(Boolean);
};
/**
 * Check if email domain is allowed for signup.
 * Returns true if no domain restriction is configured.
 */
const isEmailDomainAllowedForSignup = email => {
  const allowedDomains = getAllowedSignupDomains();
  if (allowedDomains.length === 0) {
    return true;
  }
  const emailDomain = email.toLowerCase().split('@').pop();
  if (!emailDomain) {
    return false;
  }
  return allowedDomains.includes(emailDomain);
};
/**
 * Check if the given email belongs to a known disposable / throwaway provider
 * (e.g. mailinator, yopmail, 10minutemail, ...).
 *
 * Backed by the `mailchecker` package which bundles a static list of 55k+
 * disposable domains. The check is offline and synchronous.
 *
 * Matching also covers subdomains (e.g. `foo.mailinator.com` resolves to
 * `mailinator.com`).
 *
 * An optional `additionalBlockedDomains` list can be supplied to layer
 * admin-configured custom domains on top of the bundled list. These are
 * matched with the same subdomain-walking behaviour and are expected to be
 * pre-normalised (trimmed + lowercased) by the caller.
 *
 * Returns `true` when the email is disposable and should be rejected.
 * Email format validation is intentionally NOT performed here — that is
 * handled by Zod upstream.
 */
const isDisposableEmail = (email, additionalBlockedDomains = []) => {
  const domain = email.toLowerCase().split('@').pop();
  if (!domain) {
    return false;
  }
  const blacklist = MailChecker.blacklist();
  const blocklist = new Set(additionalBlockedDomains);
  let currentDomain = domain;
  while (currentDomain) {
    if (blacklist.has(currentDomain) || blocklist.has(currentDomain)) {
      return true;
    }
    const nextDot = currentDomain.indexOf('.');
    if (nextDot === -1) {
      break;
    }
    currentDomain = currentDomain.slice(nextDot + 1);
  }
  return false;
};
/**
 * Check if signup is enabled for the given provider.
 * The master switch takes precedence over the per-provider flags.
 */
const isSignupEnabledForProvider = provider => {
  if (env('NEXT_PUBLIC_DISABLE_SIGNUP') === 'true') {
    return false;
  }
  const flagMap = {
    email: 'NEXT_PUBLIC_DISABLE_EMAIL_PASSWORD_SIGNUP',
    google: 'NEXT_PUBLIC_DISABLE_GOOGLE_SIGNUP',
    microsoft: 'NEXT_PUBLIC_DISABLE_MICROSOFT_SIGNUP',
    oidc: 'NEXT_PUBLIC_DISABLE_OIDC_SIGNUP'
  };
  return env(flagMap[provider]) !== 'true';
};
/**
 * Check if signin is enabled for the given provider.
 * The master switch takes precedence over the per-provider flags.
 */
const isSigninEnabledForProvider = provider => {
  if (env('NEXT_PUBLIC_DISABLE_SIGNIN') === 'true') {
    return false;
  }
  const flagMap = {
    email: 'NEXT_PUBLIC_DISABLE_EMAIL_PASSWORD_SIGNIN',
    google: 'NEXT_PUBLIC_DISABLE_GOOGLE_SIGNIN',
    microsoft: 'NEXT_PUBLIC_DISABLE_MICROSOFT_SIGNIN',
    oidc: 'NEXT_PUBLIC_DISABLE_OIDC_SIGNIN'
  };
  return env(flagMap[provider]) !== 'true';
};

export { MAXIMUM_PASSKEYS, PASSKEY_TIMEOUT, SALT_ROUNDS, formatSecureCookieName, getAllowedSignupDomains, getCookieDomain, isDisposableEmail, isEmailDomainAllowedForSignup, isSigninEnabledForProvider, isSignupEnabledForProvider, useSecureCookies };
//# sourceMappingURL=auth.js.map
