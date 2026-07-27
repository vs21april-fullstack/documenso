import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { ZCscSessionItemsSchema } from '../../../../lib/types/csc-session.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { Prisma } from '@prisma/client';

/**
 * Create or refresh the per-recipient session row at prep time. The recipient
 * has at most one in-flight session (`@@unique([recipientId])`); re-clicking
 * Sign overwrites prior `itemsJson` + clears `encryptedSad` / `sadExpiresAt`
 * so the next credential-scope callback starts from a clean SAD slot.
 */
const upsertCscSession = async input => {
  const {
    recipientId,
    envelopeId,
    signingTime,
    items
  } = input;
  const row = await prismaWithReplicas.cscSession.upsert({
    where: {
      recipientId
    },
    create: {
      recipientId,
      envelopeId,
      signingTime,
      itemsJson: items,
      encryptedSad: null,
      sadExpiresAt: null
    },
    update: {
      envelopeId,
      signingTime,
      itemsJson: items,
      encryptedSad: null,
      sadExpiresAt: null
    }
  });
  return toCscSessionRow(row);
};
/**
 * Stamp the credential-scope SAD onto an existing session at the OAuth
 * callback. Throws when the session id was already consumed or never existed
 * — that's a flow-state bug the caller must surface, not silently skip.
 */
const updateCscSessionWithSad = async input => {
  const {
    sessionId,
    encryptedSad,
    sadExpiresAt
  } = input;
  try {
    const row = await prismaWithReplicas.cscSession.update({
      where: {
        id: sessionId
      },
      data: {
        encryptedSad: Buffer.from(encryptedSad),
        sadExpiresAt
      }
    });
    return toCscSessionRow(row);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: `CSC session "${sessionId}" not found at SAD attach time.`
      });
    }
    throw err;
  }
};
/**
 * Fetch a session by id. Returns `null` when the row is absent — callers MUST
 * handle the missing case (cookie outliving the row is a normal terminal
 * outcome, not an error).
 */
const loadCscSession = async sessionId => {
  const row = await prismaWithReplicas.cscSession.findUnique({
    where: {
      id: sessionId
    }
  });
  return row ? toCscSessionRow(row) : null;
};
/**
 * Atomically delete the session row and return its parsed contents. Used by
 * the sync mutation's success path so the caller still has the session data
 * for post-sign side effects (audit log, webhook payloads).
 *
 * Throws `NOT_FOUND` when the row is already gone — semantically distinct
 * from {@link loadCscSession}'s nullable return because consume is the
 * success-path single-use closer; a missing row at that point means another
 * branch raced to consume and the caller should not double-count.
 */
const consumeCscSession = async (sessionId, tx) => {
  const client = tx ?? prismaWithReplicas;
  try {
    const row = await client.cscSession.delete({
      where: {
        id: sessionId
      }
    });
    return toCscSessionRow(row);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: `CSC session "${sessionId}" already consumed or never existed.`
      });
    }
    throw err;
  }
};
/**
 * Project a raw Prisma `CscSession` into the helper's parsed shape. Throws
 * on `itemsJson` parse failure — that's a data-integrity issue, not a
 * recoverable runtime case.
 */
const toCscSessionRow = row => {
  const items = ZCscSessionItemsSchema.parse(row.itemsJson);
  return {
    id: row.id,
    recipientId: row.recipientId,
    envelopeId: row.envelopeId,
    signingTime: row.signingTime,
    items,
    encryptedSad: row.encryptedSad,
    sadExpiresAt: row.sadExpiresAt,
    createdAt: row.createdAt
  };
};

export { consumeCscSession, loadCscSession, updateCscSessionWithSad, upsertCscSession };
//# sourceMappingURL=sign-session.js.map
