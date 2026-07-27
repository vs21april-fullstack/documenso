import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { isTspEnvelope } from '../../types/signature-level.js';

/**
 * Reject `allowDictateNextSigner = true` on AES/QES envelopes.
 *
 * The TSP sign path has no nextSigner dictation — `prepareCscRecipientSigning`
 * doesn't accept one and `executeTspSign` always advances to the strict
 * SEQUENTIAL next signer. Allowing the flag to persist on a TSP envelope
 * would advertise a UX feature the sign-time flow silently drops.
 *
 * SES envelopes pass through unchanged. A `null` / `undefined` /  `false`
 * value also passes through.
 */
const assertCompatibleDictateNextSigner = ({
  signatureLevel,
  allowDictateNextSigner
}) => {
  if (!isTspEnvelope({
    signatureLevel
  })) {
    return;
  }
  if (allowDictateNextSigner !== true) {
    return;
  }
  throw new AppError(AppErrorCode.INVALID_BODY, {
    message: `Envelopes signed at '${signatureLevel}' do not support next-signer dictation — the TSP sign path always advances to the strict SEQUENTIAL next recipient.`
  });
};

export { assertCompatibleDictateNextSigner };
//# sourceMappingURL=assert-compatible-dictate-next-signer.js.map
