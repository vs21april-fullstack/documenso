import { env } from '../utils/env.js';

const DOCUMENT_CONVERSION_MIME_TYPE_DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const DEFAULT_DOCUMENT_CONVERSION_TIMEOUT_MS = 30_000;
/**
 * Returns whether the document conversion feature is enabled.
 *
 * Platform-aware:
 * - On the server, checks the private URL is configured.
 * - On the client, reads the derived public flag injected via `window.__ENV__`.
 */
const IS_DOCUMENT_CONVERSION_ENABLED = () => {
  if (typeof window === 'undefined') {
    return !!env('NEXT_PRIVATE_DOCUMENT_CONVERSION_URL');
  }
  return env('NEXT_PUBLIC_DOCUMENT_CONVERSION_ENABLED') === 'true';
};
/**
 * Returns the configured conversion service base URL as supplied via env, or
 * `undefined` if not configured.
 *
 * Server-side only.
 */
const DOCUMENT_CONVERSION_URL = () => {
  return env('NEXT_PRIVATE_DOCUMENT_CONVERSION_URL');
};
/**
 * Returns HTTP Basic auth credentials for the conversion service, or
 * `undefined` if either env var is missing. When Gotenberg is started with
 * `--api-enable-basic-auth`, every request must carry these credentials.
 *
 * Server-side only.
 */
const DOCUMENT_CONVERSION_AUTH = () => {
  const username = env('NEXT_PRIVATE_DOCUMENT_CONVERSION_USERNAME');
  const password = env('NEXT_PRIVATE_DOCUMENT_CONVERSION_PASSWORD');
  if (!username || !password) {
    return undefined;
  }
  return {
    username,
    password
  };
};
/**
 * Returns the per-request timeout for conversion calls in milliseconds.
 *
 * Falls back to a 30 second default when the env value is missing or
 * unparseable.
 */
const DOCUMENT_CONVERSION_TIMEOUT_MS = () => {
  const raw = env('NEXT_PRIVATE_DOCUMENT_CONVERSION_TIMEOUT_MS');
  if (!raw) {
    return DEFAULT_DOCUMENT_CONVERSION_TIMEOUT_MS;
  }
  const parsed = parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return DEFAULT_DOCUMENT_CONVERSION_TIMEOUT_MS;
  }
  return parsed;
};

export { DOCUMENT_CONVERSION_AUTH, DOCUMENT_CONVERSION_MIME_TYPE_DOCX, DOCUMENT_CONVERSION_TIMEOUT_MS, DOCUMENT_CONVERSION_URL, IS_DOCUMENT_CONVERSION_ENABLED };
//# sourceMappingURL=document-conversion.js.map
