import { env } from '../utils/env.js';
import { AppError, AppErrorCode } from '../errors/app-error.js';
import { SignatureLevel } from '../types/signature-level.js';

const APP_DOCUMENT_UPLOAD_SIZE_LIMIT = Number(env('NEXT_PUBLIC_DOCUMENT_SIZE_UPLOAD_LIMIT')) || 50;
const NEXT_PUBLIC_WEBAPP_URL = () => env('NEXT_PUBLIC_WEBAPP_URL') ?? 'http://localhost:3000';
const NEXT_PUBLIC_SIGNING_CONTACT_INFO = () => env('NEXT_PUBLIC_SIGNING_CONTACT_INFO') ?? NEXT_PUBLIC_WEBAPP_URL();
const NEXT_PRIVATE_USE_LEGACY_SIGNING_SUBFILTER = () => env('NEXT_PRIVATE_USE_LEGACY_SIGNING_SUBFILTER') === 'true';
const NEXT_PRIVATE_INTERNAL_WEBAPP_URL = () => env('NEXT_PRIVATE_INTERNAL_WEBAPP_URL') ?? NEXT_PUBLIC_WEBAPP_URL();
const IS_BILLING_ENABLED = () => env('NEXT_PUBLIC_FEATURE_BILLING_ENABLED') === 'true';
const API_V2_BETA_URL = '/api/v2-beta';
const API_V2_URL = '/api/v2';
const SUPPORT_EMAIL = env('NEXT_PUBLIC_SUPPORT_EMAIL') ?? 'support@documenso.com';
const USE_INTERNAL_URL_BROWSERLESS = () => env('NEXT_PUBLIC_USE_INTERNAL_URL_BROWSERLESS') === 'true';
const IS_AI_FEATURES_CONFIGURED = () => !!env('GOOGLE_VERTEX_PROJECT_ID') && !!env('GOOGLE_VERTEX_API_KEY');
/**
 * Temporary flag to toggle between Playwright-based and Konva-based PDF generation
 * for audit logs during sealing.
 *
 * @deprecated This is a temporary flag and will be removed once Konva-based generation is stable.
 */
const NEXT_PRIVATE_USE_PLAYWRIGHT_PDF = () => env('NEXT_PRIVATE_USE_PLAYWRIGHT_PDF') === 'true';
const NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY = () => env('NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY');
/**
 * Whether this Documenso instance is running in CSC (Cloud Signature Consortium) mode.
 *
 * CSC mode routes signing through a third-party Trust Service Provider for
 * Advanced and Qualified Electronic Signatures (AES/QES). It is instance-wide
 * and mutually exclusive with the other signing transports.
 */
const IS_INSTANCE_CSC_MODE = () => {
  if (typeof window === 'undefined') {
    return env('NEXT_PRIVATE_SIGNING_TRANSPORT') === 'csc';
  }
  return env('NEXT_PUBLIC_SIGNING_TRANSPORT_IS_CSC') === 'true';
};
/**
 * The default signature level applied to envelopes created on a CSC-mode
 * instance when the caller doesn't specify one (or asks for `SES` and the
 * resolver is in loose-coerce mode).
 *
 * Set via `NEXT_PRIVATE_SIGNING_CSC_SIGNATURE_LEVEL`; accepts `AES` or `QES`
 * only; defaults to `AES` when unset. An explicit `AES`/`QES` request on
 * envelope create still passes through unchanged — this constant only affects
 * the coerced default.
 *
 * Throws on an invalid value rather than silently falling back. A typo here
 * (e.g. `qes`) would otherwise silently downgrade qualified-tier instances
 * to advanced-tier, which has legal consequences.
 *
 * Only consulted on CSC-mode instances. Non-CSC instances always default to
 * `SES` regardless of this var.
 */
const CSC_INSTANCE_SIGNATURE_LEVEL = () => {
  // Cast through `string | undefined` because shells can deliver
  // `NEXT_PRIVATE_SIGNING_CSC_SIGNATURE_LEVEL=` as an empty string at runtime
  // — the typed env signature narrows to `'AES' | 'QES' | undefined` only.
  const value = env('NEXT_PRIVATE_SIGNING_CSC_SIGNATURE_LEVEL');
  if (!value) {
    return SignatureLevel.AES;
  }
  if (value !== SignatureLevel.AES && value !== SignatureLevel.QES) {
    throw new AppError(AppErrorCode.NOT_SETUP, {
      message: `NEXT_PRIVATE_SIGNING_CSC_SIGNATURE_LEVEL must be '${SignatureLevel.AES}' or '${SignatureLevel.QES}', got '${value}'.`
    });
  }
  return value;
};

export { API_V2_BETA_URL, API_V2_URL, APP_DOCUMENT_UPLOAD_SIZE_LIMIT, CSC_INSTANCE_SIGNATURE_LEVEL, IS_AI_FEATURES_CONFIGURED, IS_BILLING_ENABLED, IS_INSTANCE_CSC_MODE, NEXT_PRIVATE_INTERNAL_WEBAPP_URL, NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY, NEXT_PRIVATE_USE_LEGACY_SIGNING_SUBFILTER, NEXT_PRIVATE_USE_PLAYWRIGHT_PDF, NEXT_PUBLIC_SIGNING_CONTACT_INFO, NEXT_PUBLIC_WEBAPP_URL, SUPPORT_EMAIL, USE_INTERNAL_URL_BROWSERLESS };
//# sourceMappingURL=app.js.map
