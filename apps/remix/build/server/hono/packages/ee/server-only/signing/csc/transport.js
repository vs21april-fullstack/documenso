import { IS_INSTANCE_CSC_MODE, NEXT_PUBLIC_WEBAPP_URL } from '../../../../lib/constants/app.js';
import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { assertLicensedFor } from '../../../../lib/server-only/license/assert-licensed-for.js';
import { requireEnv } from '../../../../lib/utils/env.js';
import { cscInfo } from './client/info.js';
import { createCscOAuthClient } from './client/oauth.js';
import { isEnvTsaConfigured } from './tsa-resolver.js';

/**
 * Lazily-built, globally-cached CSC transport.
 *
 * Boot-discovers `cscInfo` (§11.1) once, caches the OAuth base URL +
 * `signatures/timestamp` capability, and exposes a configured arctic
 * `OAuth2Client`. License + env + discovery are gated at construction so a
 * misconfigured instance fails at the first call site, not at sign time.
 *
 * Cached on `globalThis` so Hono routes and Remix loaders share one instance
 * across bundles (mirrors {@link LicenseClient}'s strategy).
 *
 * A failed build is **not** cached — the next caller retries. This keeps a
 * transient discovery hiccup from permanently breaking the transport while
 * still amortising the success path to one round-trip per process.
 */
const DISCOVERY_TIMEOUT_MS = 10_000;
const CSC_TIMESTAMP_METHOD = 'signatures/timestamp';
/**
 * Get the current CSC transport, building + caching it on first call.
 *
 * Throws:
 * - `NOT_SETUP` — instance is not in CSC mode, or a required env var is unset.
 * - `CSC_UNLICENSED` — `instanceCscSigning` license flag missing.
 * - `CSC_PROVIDER_INFO_FAILED` — `info` discovery failed or response omits
 *   the REQUIRED `oauth2` base URL.
 *
 * Safe to call concurrently — a second call during in-flight discovery
 * awaits the same promise instead of starting a duplicate request.
 */
const getCscTransport = async () => {
  if (globalThis.__documenso_csc_transport__) {
    return globalThis.__documenso_csc_transport__;
  }
  if (!globalThis.__documenso_csc_transport_promise__) {
    globalThis.__documenso_csc_transport_promise__ = buildCscTransport().then(transport => {
      globalThis.__documenso_csc_transport__ = transport;
      return transport;
    }).finally(() => {
      globalThis.__documenso_csc_transport_promise__ = undefined;
    });
  }
  return await globalThis.__documenso_csc_transport_promise__;
};
const buildCscTransport = async () => {
  if (!IS_INSTANCE_CSC_MODE()) {
    throw new AppError(AppErrorCode.NOT_SETUP, {
      message: 'CSC transport requested but NEXT_PRIVATE_SIGNING_TRANSPORT is not "csc".'
    });
  }
  await assertLicensedFor('instanceCscSigning', {
    errorCode: AppErrorCode.CSC_UNLICENSED
  });
  const serviceBaseUrl = requireEnv('NEXT_PRIVATE_SIGNING_CSC_PROVIDER_BASE_URL');
  const clientId = requireEnv('NEXT_PRIVATE_SIGNING_CSC_OAUTH_CLIENT_ID');
  const clientSecret = requireEnv('NEXT_PRIVATE_SIGNING_CSC_OAUTH_CLIENT_SECRET');
  const oauthRedirectUri = `${NEXT_PUBLIC_WEBAPP_URL()}/api/csc/oauth/callback`;
  const oauthClient = createCscOAuthClient({
    clientId,
    clientSecret,
    redirectUri: oauthRedirectUri
  });
  const info = await cscInfo({
    baseUrl: serviceBaseUrl,
    signal: AbortSignal.timeout(DISCOVERY_TIMEOUT_MS)
  });
  if (!info.oauth2) {
    throw new AppError(AppErrorCode.CSC_PROVIDER_INFO_FAILED, {
      message: 'CSC TSP info response omits the required `oauth2` base URL. CSC QES V1 only supports OAuth-based authorization (§8.3) — non-OAuth TSPs are not compatible.'
    });
  }
  const supportsTimestamp = info.methods.includes(CSC_TIMESTAMP_METHOD);
  // Boot-time TSA invariant: `NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY` is
  // required unconditionally in CSC mode. Sign-time B-T can use the TSP's
  // own `signatures/timestamp` endpoint when advertised, but seal-time
  // B-LTA archival is env-only by design (operators should pin a dedicated
  // qualified archival TSA — see `resolveCscSealTimeTsa`). Without env, an
  // envelope would sign successfully and then hang in
  // WAITING_FOR_SIGNATURE_COMPLETION when the seal job throws. Catch the
  // misconfiguration at boot instead so the instance refuses to start.
  if (!isEnvTsaConfigured()) {
    throw new AppError(AppErrorCode.CSC_PROVIDER_NO_TSA, {
      message: 'NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY is unset. AES/QES envelopes require a TSA for B-LTA archival at seal time regardless of whether the CSC TSP advertises signatures/timestamp for B-T sign-time. Configure NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY.'
    });
  }
  return {
    serviceBaseUrl,
    oauthBaseUrl: info.oauth2,
    oauthClient,
    oauthRedirectUri,
    supportsTimestamp,
    info
  };
};

export { getCscTransport };
//# sourceMappingURL=transport.js.map
