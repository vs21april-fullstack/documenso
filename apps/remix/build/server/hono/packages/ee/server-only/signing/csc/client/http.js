import { AppError, AppErrorCode } from '../../../../../lib/errors/app-error.js';
import { ZCscErrorResponseSchema } from './types.js';

const LEADING_SLASHES_REGEX = /^\/+/;
const TRAILING_SLASHES_REGEX = /\/+$/;
/**
 * Join a CSC base URL with a path segment. Strips trailing/leading slashes so
 * `joinCscUrl({ baseUrl: 'https://x/csc/v1/', path: '/credentials/list' })`
 * yields `https://x/csc/v1/credentials/list`.
 */
const joinCscUrl = ({
  baseUrl,
  path
}) => {
  const cleanBaseUrl = baseUrl.replace(TRAILING_SLASHES_REGEX, ''); // Strip trailing slashes from base URL.
  const cleanPath = path.replace(LEADING_SLASHES_REGEX, ''); // Strip leading slashes from path.
  const url = new URL(cleanPath, `${cleanBaseUrl}/`);
  return url.toString();
};
const buildCscRequestError = ({
  url,
  status,
  cscError,
  cause,
  errorCode = AppErrorCode.CSC_REQUEST_FAILED
}) => {
  const causeMessage = cause instanceof Error ? cause.message : undefined;
  const parts = [`CSC request to ${url} failed (HTTP ${status})`];
  if (cscError) {
    parts.push(cscError.error_description ? `${cscError.error}: ${cscError.error_description}` : cscError.error);
  }
  if (causeMessage) {
    parts.push(causeMessage);
  }
  return new AppError(errorCode, {
    message: parts.join(' — '),
    statusCode: status
  });
};
/**
 * Best-effort parse of a CSC error body. Returns `undefined` on non-JSON or
 * schema mismatch so the caller still surfaces the HTTP status without
 * masking it.
 */
const readCscErrorBody = async response => {
  try {
    const json = await response.json();
    const parsed = ZCscErrorResponseSchema.safeParse(json);
    return parsed.success ? parsed.data : undefined;
  } catch {
    return undefined;
  }
};
/**
 * POST a JSON body to a CSC API endpoint and parse the response against the
 * supplied Zod schema.
 *
 * Throws {@link AppError} on:
 * - network/transport error (fetch threw)
 * - non-2xx HTTP response (with CSC error body folded into the message)
 * - malformed JSON response
 * - schema validation failure
 */
const cscJsonPost = async (opts, responseSchema) => {
  const {
    url,
    body,
    accessToken,
    errorCode,
    signal
  } = opts;
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(accessToken ? {
          Authorization: `Bearer ${accessToken}`
        } : {})
      },
      body: JSON.stringify(body),
      signal
    });
  } catch (cause) {
    throw buildCscRequestError({
      url,
      status: 0,
      cause,
      errorCode
    });
  }
  if (!response.ok) {
    const cscError = await readCscErrorBody(response);
    throw buildCscRequestError({
      url,
      status: response.status,
      cscError,
      errorCode
    });
  }
  let json;
  try {
    json = await response.json();
  } catch (cause) {
    throw buildCscRequestError({
      url,
      status: response.status,
      cause,
      errorCode
    });
  }
  const parsed = responseSchema.safeParse(json);
  if (!parsed.success) {
    throw buildCscRequestError({
      url,
      status: response.status,
      cause: parsed.error,
      errorCode
    });
  }
  return parsed.data;
};

export { cscJsonPost, joinCscUrl };
//# sourceMappingURL=http.js.map
