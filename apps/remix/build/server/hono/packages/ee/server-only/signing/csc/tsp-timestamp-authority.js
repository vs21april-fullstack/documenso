import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { hashOidForDigest } from './algorithm-resolver.js';
import { cscTimestamp } from './client/signatures.js';

class CscTspTimestampAuthority {
  constructor(opts) {
    this.transport = opts.transport;
    this.serviceToken = opts.serviceToken;
    this.signal = opts.signal;
  }
  /**
   * Request a CSC §11.10 timestamp for the supplied digest, authorised with
   * the recipient's service-scope bearer. Returns the decoded TimeStampToken
   * bytes. Throws `CSC_PROVIDER_NO_TSA` carrying the upstream error message
   * on failure.
   *
   * `algorithm` is libpdf's `DigestAlgorithm` (`SHA-256` / `SHA-384` /
   * `SHA-512`), translated to the matching `hashAlgo` OID via the existing
   * {@link hashOidForDigest} mapping so the spec's OID-typed payload stays
   * in one place.
   */
  async timestamp(digest, algorithm) {
    const hash = Buffer.from(digest).toString('base64');
    const hashAlgo = hashOidForDigest(algorithm);
    try {
      const response = await cscTimestamp({
        baseUrl: this.transport.serviceBaseUrl,
        accessToken: this.serviceToken,
        hash,
        hashAlgo,
        signal: this.signal
      });
      return Buffer.from(response.timestamp, 'base64');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new AppError(AppErrorCode.CSC_PROVIDER_NO_TSA, {
        message: `CSC TSP timestamp endpoint refused the recipient's service token: ${message}.`
      });
    }
  }
}

export { CscTspTimestampAuthority };
//# sourceMappingURL=tsp-timestamp-authority.js.map
