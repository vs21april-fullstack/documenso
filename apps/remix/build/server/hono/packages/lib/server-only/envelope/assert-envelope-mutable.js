import { DocumentStatus } from '@prisma/client';
import { match } from 'ts-pattern';
import { AppErrorCode, AppError } from '../../errors/app-error.js';
import { isTspEnvelope } from '../../types/signature-level.js';

async function assertEnvelopeMutable(envelope, tx) {
  if (tx) {
    return await refetchAndAssert(tx, envelope.id);
  }
  assertSnapshotMutable(envelope);
}
const refetchAndAssert = async (tx, envelopeId) => {
  const refetched = await tx.envelope.findFirstOrThrow({
    where: {
      id: envelopeId
    },
    select: {
      signatureLevel: true,
      status: true
    }
  });
  assertSnapshotMutable(refetched);
};
const assertSnapshotMutable = envelope => {
  if (!isTspEnvelope(envelope)) {
    return;
  }
  if (envelope.status === DocumentStatus.DRAFT) {
    return;
  }
  const errorCode = match(envelope.status).with(DocumentStatus.PENDING, () => AppErrorCode.ENVELOPE_TSP_LOCKED).with(DocumentStatus.COMPLETED, () => AppErrorCode.ENVELOPE_COMPLETED).with(DocumentStatus.REJECTED, () => AppErrorCode.ENVELOPE_REJECTED).with(DocumentStatus.CANCELLED, () => AppErrorCode.ENVELOPE_CANCELLED).otherwise(() => AppErrorCode.INVALID_REQUEST);
  throw new AppError(errorCode, {
    message: `Envelope is locked — AES/QES envelopes cannot be modified after leaving DRAFT (current status: ${envelope.status}).`
  });
};

export { assertEnvelopeMutable };
//# sourceMappingURL=assert-envelope-mutable.js.map
