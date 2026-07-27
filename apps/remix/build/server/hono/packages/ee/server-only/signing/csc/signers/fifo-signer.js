import { AppError, AppErrorCode } from '../../../../../lib/errors/app-error.js';

/**
 * CSC embed-pass FIFO signer.
 *
 * `signatures/signHash` (CSC §11.9) returns one signature per submitted
 * hash, in the same position-bound order as the request `hash[]` array.
 * The embed pass re-runs `pdf.sign()` once per anchor in that same order,
 * so a FIFO queue of signature bytes — popped on each `sign()` call —
 * is sufficient to feed libpdf without any per-anchor binding metadata.
 */
class CscFifoSigner {
  constructor(options) {
    this.certificate = options.certificate;
    this.certificateChain = options.certificateChain;
    this.keyType = options.algo.keyType;
    this.signatureAlgorithm = options.algo.signatureAlgorithm;
    this.queue = [...options.signatures];
  }
  // biome-ignore lint/suspicious/useAwait: intentional
  async sign(_data, _algorithm) {
    const next = this.queue.shift();
    if (next === undefined) {
      throw new AppError(AppErrorCode.INVALID_REQUEST, {
        message: 'CSC FIFO signer exhausted — more sign() calls than queued signatures.'
      });
    }
    return next;
  }
}

export { CscFifoSigner };
//# sourceMappingURL=fifo-signer.js.map
