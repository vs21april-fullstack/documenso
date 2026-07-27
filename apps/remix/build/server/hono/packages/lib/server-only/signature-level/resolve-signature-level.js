import { IS_INSTANCE_CSC_MODE, CSC_INSTANCE_SIGNATURE_LEVEL } from '../../constants/app.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { SignatureLevel } from '../../types/signature-level.js';

/**
 * Resolve the signature level for a new envelope.
 *
 * Server-only. Reads the `NEXT_PRIVATE_SIGNING_TRANSPORT` env var via
 * {@link IS_INSTANCE_CSC_MODE} so call sites do not have to thread the
 * instance mode through their own arguments. On CSC instances the coerced
 * default also reads {@link CSC_INSTANCE_SIGNATURE_LEVEL} so operators can
 * pick `AES` (default) or `QES` per their TSP capability.
 *
 * Source of truth for the `Envelope.signatureLevel` write at create-time. The
 * column has no DB default by design — every caller flows through here so the
 * instance-mode contract is enforced consistently.
 *
 * Coerce mode (default, `strict: false`):
 *
 * | Instance | requested      | Result                              |
 * |----------|----------------|-------------------------------------|
 * | non-CSC  | omitted        | `SES`                               |
 * | non-CSC  | `SES`          | `SES`                               |
 * | non-CSC  | `AES` / `QES`  | `SES` (coerced)                     |
 * | CSC      | omitted        | `CSC_INSTANCE_SIGNATURE_LEVEL()`    |
 * | CSC      | `SES`          | `CSC_INSTANCE_SIGNATURE_LEVEL()`    |
 * | CSC      | `AES` / `QES`  | passes through                      |
 *
 * Strict mode (`strict: true`): same instance defaults for the omitted case,
 * but any conflict between `requested` and the instance mode throws
 * `CSC_INSTANCE_MODE_MISMATCH` instead of silently coercing.
 *
 * Note: on CSC instances an explicit `AES`/`QES` request always passes
 * through, even when it disagrees with `CSC_INSTANCE_SIGNATURE_LEVEL`. The
 * env var sets the *default* legal tier; it doesn't restrict what callers
 * can ask for. Cert-capability checks live at the TSP boundary.
 */
const resolveSignatureLevel = ({
  requested,
  strict = false
} = {}) => {
  const isCscInstance = IS_INSTANCE_CSC_MODE();
  const instanceDefault = isCscInstance ? CSC_INSTANCE_SIGNATURE_LEVEL() : SignatureLevel.SES;
  if (requested === undefined) {
    return instanceDefault;
  }
  const isCompatible = isCscInstance ? requested !== SignatureLevel.SES : requested === SignatureLevel.SES;
  if (isCompatible) {
    return requested;
  }
  if (strict) {
    throw new AppError(AppErrorCode.CSC_INSTANCE_MODE_MISMATCH, {
      message: isCscInstance ? `signatureLevel '${requested}' is not supported on a CSC-mode instance — every recipient must sign through the configured Trust Service Provider.` : `signatureLevel '${requested}' is not supported on a non-CSC instance — only 'SES' is permitted unless the CSC signing transport is configured.`
    });
  }
  return instanceDefault;
};

export { resolveSignatureLevel };
//# sourceMappingURL=resolve-signature-level.js.map
