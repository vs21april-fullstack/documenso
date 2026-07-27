import '../../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import '@prisma/client';

/**
 * Create or refresh the per-recipient credential row at service-scope OAuth
 * callback success. Replaces every prior byte payload — a re-auth always
 * supersedes the prior cert + token (TSPs may have rotated either).
 */
const upsertCscCredential = async input => {
  const {
    recipientId,
    providerId,
    credentialId,
    certCache,
    signatureAlgorithm,
    keyType,
    digestAlgorithm,
    keyLenBits,
    signAlgoParams,
    serviceTokenCiphertext,
    serviceTokenExpiresAt
  } = input;
  const row = await prismaWithReplicas.cscCredential.upsert({
    where: {
      recipientId
    },
    create: {
      recipientId,
      providerId,
      credentialId,
      certCache,
      signatureAlgorithm,
      keyType,
      digestAlgorithm,
      keyLenBits,
      signAlgoParams: signAlgoParams ?? null,
      serviceTokenCiphertext,
      serviceTokenExpiresAt
    },
    update: {
      providerId,
      credentialId,
      certCache,
      signatureAlgorithm,
      keyType,
      digestAlgorithm,
      keyLenBits,
      signAlgoParams: signAlgoParams ?? null,
      serviceTokenCiphertext,
      serviceTokenExpiresAt
    }
  });
  return toCscCredentialRow(row);
};
/**
 * Fetch the credential row for a recipient. Returns `null` when absent — the
 * recipient hasn't completed service-scope OAuth yet (loader path) or the
 * recipient cascade fired (cleanup path). Both are normal terminal outcomes.
 */
const loadCscCredential = async recipientId => {
  const row = await prismaWithReplicas.cscCredential.findUnique({
    where: {
      recipientId
    }
  });
  return row ? toCscCredentialRow(row) : null;
};
const toCscCredentialRow = row => ({
  id: row.id,
  recipientId: row.recipientId,
  providerId: row.providerId,
  credentialId: row.credentialId,
  certCache: row.certCache,
  signatureAlgorithm: row.signatureAlgorithm,
  keyType: row.keyType,
  digestAlgorithm: row.digestAlgorithm,
  keyLenBits: row.keyLenBits,
  signAlgoParams: row.signAlgoParams,
  serviceTokenCiphertext: row.serviceTokenCiphertext,
  serviceTokenExpiresAt: row.serviceTokenExpiresAt,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt
});

export { loadCscCredential, upsertCscCredential };
//# sourceMappingURL=credential.js.map
