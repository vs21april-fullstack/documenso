import { jobs } from '../../jobs/client.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, DocumentStatus, SigningStatus } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { unsafeBuildEnvelopeIdQuery, mapSecondaryIdToDocumentId } from '../../utils/envelope.js';
import { assertRecipientNotExpired } from '../../utils/recipients.js';

// This is closely related to `reject-document-on-behalf-of.ts` but is intentionally
// kept as a separate method rather than merged into one. This file focuses on
// rejection from a recipient perspective (the recipient rejecting via their token),
// whereas `reject-document-on-behalf-of.ts` focuses on it from an API/programmatic
// perspective (an authenticated API user acting on behalf of a recipient).
//
// Code changes in one should probably be mirrored to the other, particularly in
// relation to the jobs triggered after a rejection.
async function rejectDocumentWithToken({
  token,
  id,
  reason,
  requestMetadata
}) {
  // Find the recipient and document in a single query
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      token,
      envelope: unsafeBuildEnvelopeIdQuery(id, EnvelopeType.DOCUMENT)
    },
    include: {
      envelope: true
    }
  });
  const envelope = recipient?.envelope;
  if (!recipient || !envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Document or recipient not found'
    });
  }
  if (envelope.status !== DocumentStatus.PENDING) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: `Document ${envelope.id} must be pending to reject`
    });
  }
  assertRecipientNotExpired(recipient);
  // Update the recipient status to rejected
  const [updatedRecipient] = await prismaWithReplicas.$transaction([prismaWithReplicas.recipient.update({
    where: {
      id: recipient.id
    },
    data: {
      signedAt: new Date(),
      signingStatus: SigningStatus.REJECTED,
      rejectionReason: reason
    }
  }), prismaWithReplicas.documentAuditLog.create({
    data: createDocumentAuditLogData({
      envelopeId: envelope.id,
      type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_REJECTED,
      user: {
        name: recipient.name,
        email: recipient.email
      },
      data: {
        recipientEmail: recipient.email,
        recipientName: recipient.name,
        recipientId: recipient.id,
        recipientRole: recipient.role,
        reason
      },
      requestMetadata
    })
  })]);
  const legacyDocumentId = mapSecondaryIdToDocumentId(envelope.secondaryId);
  // Trigger the seal document job to process the document asynchronously
  await jobs.triggerJob({
    name: 'internal.seal-document',
    payload: {
      documentId: legacyDocumentId,
      requestMetadata
    }
  });
  // Send email notifications to the rejecting recipient
  await jobs.triggerJob({
    name: 'send.signing.rejected.emails',
    payload: {
      recipientId: recipient.id,
      documentId: legacyDocumentId
    }
  });
  // Send cancellation emails to other recipients
  await jobs.triggerJob({
    name: 'send.document.cancelled.emails',
    payload: {
      documentId: legacyDocumentId,
      cancellationReason: reason,
      requestMetadata
    }
  });
  return updatedRecipient;
}

export { rejectDocumentWithToken };
//# sourceMappingURL=reject-document-with-token.js.map
