import { z } from 'zod';

/**
 * Zod schemas + types for every CSC v1.0.4.0 request/response shape the V1
 * client touches. Field names mirror the spec exactly. Unknown fields are
 * silently dropped (Zod default `.strip()`); we don't `.passthrough()` to
 * keep parsed objects narrow.
 *
 * Out-of-scope endpoints (`auth/login`, `auth/revoke`, `credentials/authorize`,
 * `credentials/extendTransaction`, `credentials/sendOTP`) intentionally have
 * no schemas here — V1 uses OAuth + sequential single-signature flows only.
 */
// ─── §10.1 common error envelope ─────────────────────────────────────────────
const ZCscErrorResponseSchema = z.object({
  error: z.string(),
  error_description: z.string().optional()
});
// ─── §11.1 info ──────────────────────────────────────────────────────────────
z.object({
  lang: z.string().optional()
});
const ZCscInfoResponseSchema = z.object({
  specs: z.string(),
  name: z.string(),
  logo: z.string(),
  region: z.string(),
  lang: z.string(),
  description: z.string(),
  authType: z.array(z.string()),
  // REQUIRED Conditional — present when authType includes `oauth2code` /
  // `oauth2client`, or when any credential supports `oauth2code` authMode.
  // We always need it for V1, but keeping the schema permissive matches the
  // spec; absence is detected at the call site.
  oauth2: z.string().optional(),
  methods: z.array(z.string())
});
// ─── §11.4 credentials/list ──────────────────────────────────────────────────
z.object({
  // OAuth2 user-specific service auth → userID MUST be omitted (§11.4 NOTE 1).
  userID: z.string().optional(),
  maxResults: z.number().int().positive().optional(),
  pageToken: z.string().optional(),
  clientData: z.string().optional()
});
const ZCscCredentialsListResponseSchema = z.object({
  credentialIDs: z.array(z.string()),
  nextPageToken: z.string().optional()
});
// ─── §11.5 credentials/info ──────────────────────────────────────────────────
z.object({
  credentialID: z.string(),
  certificates: z.enum(['none', 'single', 'chain']).optional(),
  certInfo: z.boolean().optional(),
  authInfo: z.boolean().optional(),
  lang: z.string().optional(),
  clientData: z.string().optional()
});
const ZCscCredentialsInfoKeySchema = z.object({
  status: z.enum(['enabled', 'disabled']),
  algo: z.array(z.string()),
  // REQUIRED per §11.5 but kept optional here so the algorithm-resolver can
  // surface absence as a typed `CSC_ALGORITHM_REFUSED` (matching the spec's
  // policy table) instead of a generic transport schema failure.
  len: z.number().int().positive().optional(),
  // REQUIRED Conditional for ECDSA per §11.5; absence handled by the resolver.
  curve: z.string().optional()
});
const ZCscCredentialsInfoCertSchema = z.object({
  status: z.enum(['valid', 'expired', 'revoked', 'suspended']).optional(),
  certificates: z.array(z.string()).optional(),
  issuerDN: z.string().optional(),
  serialNumber: z.string().optional(),
  subjectDN: z.string().optional(),
  validFrom: z.string().optional(),
  validTo: z.string().optional()
});
const ZCscCredentialsInfoPinSchema = z.object({
  presence: z.enum(['true', 'false', 'optional']),
  format: z.enum(['A', 'N']).optional(),
  label: z.string().optional(),
  description: z.string().optional()
});
const ZCscCredentialsInfoOtpSchema = z.object({
  presence: z.enum(['true', 'false', 'optional']),
  type: z.enum(['offline', 'online']).optional(),
  format: z.enum(['A', 'N']).optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  ID: z.string().optional(),
  provider: z.string().optional()
});
const ZCscCredentialsInfoResponseSchema = z.object({
  description: z.string().optional(),
  key: ZCscCredentialsInfoKeySchema,
  cert: ZCscCredentialsInfoCertSchema,
  authMode: z.enum(['implicit', 'explicit', 'oauth2code']),
  SCAL: z.enum(['1', '2']).optional(),
  PIN: ZCscCredentialsInfoPinSchema.optional(),
  OTP: ZCscCredentialsInfoOtpSchema.optional(),
  multisign: z.number().int().min(1),
  lang: z.string().optional()
});
// ─── §11.9 signatures/signHash ───────────────────────────────────────────────
z.object({
  credentialID: z.string(),
  SAD: z.string(),
  // Base64-encoded raw message digests.
  hash: z.array(z.string()).nonempty(),
  // REQUIRED Conditional — OID of the hash algorithm. Omit only when implied
  // by signAlgo (per §11.9). The caller decides.
  hashAlgo: z.string().optional(),
  signAlgo: z.string(),
  // REQUIRED Conditional for algorithms like RSASSA-PSS.
  signAlgoParams: z.string().optional(),
  clientData: z.string().optional()
});
const ZCscSignHashResponseSchema = z.object({
  // Position-ordered Base64-encoded signed hashes matching the input order.
  signatures: z.array(z.string()).nonempty()
});
// ─── §11.10 signatures/timestamp ─────────────────────────────────────────────
z.object({
  hash: z.string(),
  hashAlgo: z.string(),
  // Hex-encoded random; SHALL round-trip in the timestamp token when supplied.
  nonce: z.string().optional(),
  clientData: z.string().optional()
});
const ZCscTimestampResponseSchema = z.object({
  // Base64-encoded RFC 3161 (with RFC 5816 update) time-stamp token.
  timestamp: z.string()
});
// OAuth 2.0 token + revoke shapes are handled by the `arctic` library — see
// `oauth.ts` in this directory. Arctic exposes `OAuth2Tokens` (with `.data`
// available for non-standard CSC fields like `token_type === 'SAD'`).

export { ZCscCredentialsInfoCertSchema, ZCscCredentialsInfoKeySchema, ZCscCredentialsInfoOtpSchema, ZCscCredentialsInfoPinSchema, ZCscCredentialsInfoResponseSchema, ZCscCredentialsListResponseSchema, ZCscErrorResponseSchema, ZCscInfoResponseSchema, ZCscSignHashResponseSchema, ZCscTimestampResponseSchema };
//# sourceMappingURL=types.js.map
