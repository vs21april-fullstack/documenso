import { AppErrorCode } from '../../../../../lib/errors/app-error.js';
import { cscJsonPost, joinCscUrl } from './http.js';
import { ZCscInfoResponseSchema } from './types.js';

/**
 * `info` (§11.1) — discovery method every CSC-conformant TSP MUST implement.
 *
 * Used at startup to:
 *
 * 1. Learn the OAuth 2.0 base URI (`oauth2`) for subsequent token / revoke
 *    calls. Per §11.1, this MAY differ from the API base URI.
 * 2. Enumerate supported methods (`methods`) so the caller can fail fast
 *    when a required endpoint is absent.
 * 3. Surface `signatures/timestamp` capability for the B-LTA seal step.
 *
 * Unauthenticated — `info` requires no bearer token. Failures throw
 * `CSC_PROVIDER_INFO_FAILED` per the spec's startup-discovery error code.
 */
const cscInfo = async opts => {
  const {
    baseUrl,
    lang,
    signal
  } = opts;
  return await cscJsonPost({
    url: joinCscUrl({
      baseUrl,
      path: 'info'
    }),
    body: lang ? {
      lang
    } : {},
    errorCode: AppErrorCode.CSC_PROVIDER_INFO_FAILED,
    signal
  }, ZCscInfoResponseSchema);
};

export { cscInfo };
//# sourceMappingURL=info.js.map
