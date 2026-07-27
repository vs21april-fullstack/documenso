import { AppError, AppErrorCode } from '../../../../../lib/errors/app-error.js';
import { CodeChallengeMethod, OAuth2Client, OAuth2RequestError, ArcticFetchError, UnexpectedResponseError, UnexpectedErrorResponseBodyError } from 'arctic';
export { generateCodeVerifier, generateState } from 'arctic';
import { joinCscUrl } from './http.js';

/**
 * Construct an `OAuth2Client` bound to the CSC TSP's OAuth registration. The
 * three values come from the env (`NEXT_PRIVATE_SIGNING_CSC_OAUTH_*`).
 * Stateless — instantiate per request or cache at the transport singleton
 * level; arctic's client carries no per-call state.
 */
const createCscOAuthClient = ({
  clientId,
  clientSecret,
  redirectUri
}) => {
  return new OAuth2Client(clientId, clientSecret, redirectUri);
};
const applyCscAuthorizeExtras = (url, opts) => {
  if (opts.lang) {
    url.searchParams.set('lang', opts.lang);
  }
  if (opts.clientData) {
    url.searchParams.set('clientData', opts.clientData);
  }
  return url;
};
/**
 * Build the `oauth2/authorize` URL for the **service** scope. Recipient
 * follows this URL to authenticate at the TSP and grant access to list
 * credentials + fetch credential info.
 */
const buildCscServiceScopeAuthorizeUrl = opts => {
  const {
    client,
    oauthBaseUrl,
    state,
    codeVerifier,
    lang,
    clientData
  } = opts;
  const url = client.createAuthorizationURLWithPKCE(joinCscUrl({
    baseUrl: oauthBaseUrl,
    path: 'oauth2/authorize'
  }), state, CodeChallengeMethod.S256, codeVerifier, ['service']);
  return applyCscAuthorizeExtras(url, {
    lang,
    clientData
  });
};
/**
 * Convert a standard-base64 string to base64url (RFC 4648 §5). The CSC §8.3.2
 * `hash` URL parameter requires base64url; TSPs reject standard base64 even
 * after percent-decoding because `+`, `/`, and `=` are invalid base64url
 * characters. JSON-body fields (§11.9 `signatures/signHash`) keep standard
 * base64.
 */
const toBase64Url = standardBase64 => standardBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
/**
 * Build the `oauth2/authorize` URL for the **credential** scope. The TSP
 * binds the issued SAD to `hashes` so it can only sign those exact digests.
 *
 * Hash ordering in the SAD is independent of the order passed to
 * `signatures/signHash` (§8.3.2) — the TSP matches by hash value, not
 * position.
 */
const buildCscCredentialScopeAuthorizeUrl = opts => {
  const {
    client,
    oauthBaseUrl,
    state,
    codeVerifier,
    credentialId,
    numSignatures,
    hashes,
    description,
    accountToken,
    lang,
    clientData
  } = opts;
  const url = client.createAuthorizationURLWithPKCE(joinCscUrl({
    baseUrl: oauthBaseUrl,
    path: 'oauth2/authorize'
  }), state, CodeChallengeMethod.S256, codeVerifier, ['credential']);
  url.searchParams.set('credentialID', credentialId);
  url.searchParams.set('numSignatures', String(numSignatures));
  url.searchParams.set('hash', hashes.map(toBase64Url).join(','));
  if (description) {
    url.searchParams.set('description', description);
  }
  if (accountToken) {
    url.searchParams.set('account_token', accountToken);
  }
  return applyCscAuthorizeExtras(url, {
    lang,
    clientData
  });
};
/**
 * Exchange an authorization code for an access token. Used for both scopes;
 * the response shape differs only in `token_type`:
 *
 * - service scope: `token_type === 'Bearer'`, optional `refresh_token`.
 * - credential scope: `token_type === 'SAD'`, single-use, no refresh_token.
 *
 * Inspect `tokens.tokenType()` (or `tokens.data` for raw access) to
 * discriminate.
 */
const exchangeCscAuthorizationCode = async opts => {
  const {
    client,
    oauthBaseUrl,
    code,
    codeVerifier
  } = opts;
  try {
    return await client.validateAuthorizationCode(joinCscUrl({
      baseUrl: oauthBaseUrl,
      path: 'oauth2/token'
    }), code, codeVerifier);
  } catch (err) {
    throw mapArcticError(err, 'oauth2/token');
  }
};
// ─── Error normalisation ────────────────────────────────────────────────────
/**
 * Translate arctic's typed exception hierarchy into AppErrors consistent with
 * the rest of the CSC client (see http.ts). Preserves the HTTP status when
 * arctic surfaces it.
 */
const mapArcticError = (err, endpoint) => {
  if (err instanceof OAuth2RequestError) {
    return new AppError(AppErrorCode.CSC_REQUEST_FAILED, {
      message: `CSC ${endpoint} rejected: ${err.code}${err.description ? ` — ${err.description}` : ''}`
    });
  }
  if (err instanceof ArcticFetchError) {
    return new AppError(AppErrorCode.CSC_REQUEST_FAILED, {
      message: `CSC ${endpoint} fetch failed: ${err.message}`
    });
  }
  if (err instanceof UnexpectedResponseError) {
    return new AppError(AppErrorCode.CSC_REQUEST_FAILED, {
      message: `CSC ${endpoint} returned unexpected HTTP ${err.status}`,
      statusCode: err.status
    });
  }
  if (err instanceof UnexpectedErrorResponseBodyError) {
    return new AppError(AppErrorCode.CSC_REQUEST_FAILED, {
      message: `CSC ${endpoint} returned HTTP ${err.status} with unparseable body`,
      statusCode: err.status
    });
  }
  return new AppError(AppErrorCode.CSC_REQUEST_FAILED, {
    message: `CSC ${endpoint} failed: ${err instanceof Error ? err.message : String(err)}`
  });
};

export { buildCscCredentialScopeAuthorizeUrl, buildCscServiceScopeAuthorizeUrl, createCscOAuthClient, exchangeCscAuthorizationCode };
//# sourceMappingURL=oauth.js.map
