import { cscJsonPost, joinCscUrl } from './http.js';
import { ZCscSignHashResponseSchema, ZCscTimestampResponseSchema } from './types.js';

/**
 * `signatures/signHash` (§11.9) — submit one or more pre-computed hashes for
 * the TSP to sign with the credential identified by `credentialID`.
 *
 * Authorisation is two-layered:
 * - The service-scope bearer token authenticates the API call itself.
 * - The credential-scope SAD (in the JSON body) authorises the specific
 *   hashes — the TSP rejects with `invalid_request` ("Hash is not authorized
 *   by the SAD") if any hash in the array wasn't bound at SAD issuance.
 *
 * The returned `signatures` array is position-ordered with `hash` per §11.9.
 * Callers SHALL preserve order when mapping responses back to PDF embed
 * slots (the fifoSigner relies on this).
 */
const cscSignHash = async opts => {
  const {
    baseUrl,
    accessToken,
    signal,
    credentialID,
    SAD,
    hash,
    hashAlgo,
    signAlgo,
    signAlgoParams,
    clientData
  } = opts;
  const body = {
    credentialID,
    SAD,
    hash,
    signAlgo
  };
  if (hashAlgo !== undefined) {
    body.hashAlgo = hashAlgo;
  }
  if (signAlgoParams !== undefined) {
    body.signAlgoParams = signAlgoParams;
  }
  if (clientData !== undefined) {
    body.clientData = clientData;
  }
  return await cscJsonPost({
    url: joinCscUrl({
      baseUrl,
      path: 'signatures/signHash'
    }),
    body,
    accessToken,
    signal
  }, ZCscSignHashResponseSchema);
};
/**
 * `signatures/timestamp` (§11.10) — request an RFC 3161 / RFC 5816 time-stamp
 * token for a pre-computed hash. Driven by {@link CscTspTimestampAuthority}
 * at sign time, when {@link resolveCscSignTimeTsa} selects the TSP source
 * (TSP advertises `signatures/timestamp` in `info.methods`). The bearer is
 * the current recipient's own service-scope token. Seal-time archival
 * timestamps do not go through this endpoint — they use the env-configured
 * RFC 3161 TSA directly.
 *
 * If `nonce` is supplied, the TSP MUST round-trip it in the token — we leave
 * verification to LibPDF / our TSA helper, not this client.
 */
const cscTimestamp = async opts => {
  const {
    baseUrl,
    accessToken,
    signal,
    hash,
    hashAlgo,
    nonce,
    clientData
  } = opts;
  const body = {
    hash,
    hashAlgo
  };
  if (nonce !== undefined) {
    body.nonce = nonce;
  }
  if (clientData !== undefined) {
    body.clientData = clientData;
  }
  return await cscJsonPost({
    url: joinCscUrl({
      baseUrl,
      path: 'signatures/timestamp'
    }),
    body,
    accessToken,
    signal
  }, ZCscTimestampResponseSchema);
};

export { cscSignHash, cscTimestamp };
//# sourceMappingURL=signatures.js.map
