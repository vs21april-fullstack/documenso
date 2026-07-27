import { NEXT_PUBLIC_WEBAPP_URL } from '../../lib/constants/app.js';
import { env } from '../../lib/utils/env.js';

/**
 * How long a session should live for in milliseconds.
 */
const AUTH_SESSION_LIFETIME = 1000 * 60 * 60 * 24 * 30; // 30 days.
const GoogleAuthOptions = {
  id: 'google',
  scope: ['openid', 'email', 'profile'],
  clientId: env('NEXT_PRIVATE_GOOGLE_CLIENT_ID') ?? '',
  clientSecret: env('NEXT_PRIVATE_GOOGLE_CLIENT_SECRET') ?? '',
  redirectUrl: `${NEXT_PUBLIC_WEBAPP_URL()}/api/auth/callback/google`,
  wellKnownUrl: 'https://accounts.google.com/.well-known/openid-configuration',
  bypassEmailVerification: false
};
const MicrosoftAuthOptions = {
  id: 'microsoft',
  scope: ['openid', 'email', 'profile'],
  clientId: env('NEXT_PRIVATE_MICROSOFT_CLIENT_ID') ?? '',
  clientSecret: env('NEXT_PRIVATE_MICROSOFT_CLIENT_SECRET') ?? '',
  redirectUrl: `${NEXT_PUBLIC_WEBAPP_URL()}/api/auth/callback/microsoft`,
  wellKnownUrl: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
  bypassEmailVerification: false
};
const OidcAuthOptions = {
  id: 'oidc',
  scope: ['openid', 'email', 'profile'],
  clientId: env('NEXT_PRIVATE_OIDC_CLIENT_ID') ?? '',
  clientSecret: env('NEXT_PRIVATE_OIDC_CLIENT_SECRET') ?? '',
  redirectUrl: `${NEXT_PUBLIC_WEBAPP_URL()}/api/auth/callback/oidc`,
  wellKnownUrl: env('NEXT_PRIVATE_OIDC_WELL_KNOWN') ?? '',
  bypassEmailVerification: env('NEXT_PRIVATE_OIDC_SKIP_VERIFY') === 'true'
};

export { AUTH_SESSION_LIFETIME, GoogleAuthOptions, MicrosoftAuthOptions, OidcAuthOptions };
//# sourceMappingURL=config.js.map
