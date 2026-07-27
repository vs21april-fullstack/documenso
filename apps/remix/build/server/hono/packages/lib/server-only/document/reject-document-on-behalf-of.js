import { jobs } from '../../jobs/client.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, DocumentStatus, SigningStatus } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { mapSecondaryIdToDocumentId } from '../../utils/envelope.js';
import { assertRecipientNotExpired } from '../../utils/recipients.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

// This is closely related to `reject-document-with-token.ts` but is intentionally
// kept as a separate method rather than merged into one. This file focuses on
// rejection from an API/programmatic perspective (an authenticated API user acting
// on behalf of a recipient), whereas `reject-document-with-token.ts` focuses on it
// from a recipient perspective (the recipient rejecting via their token).
//
// Code changes in one should probably be mirrored to the other, particularly in
// relation to the jobs triggered after a rejection.
/**
 * Reject a document on behalf of a recipient as an authenticated API user.
 *
 * This is used to programmatically record a rejection for cases where the
 * recipient declined to sign outside of the platform (e.g. before ever
 * reaching it). The rejection is flagged as `isExternal` in the audit log to
 * distinguish it from a rejection performed by the recipient directly.
 *
 * The action can optionally be attributed to a specific team member via
 * `actAsEmail`; otherwise it is attributed to the API user.
 */
async function rejectDocumentOnBehalfOf({
  envelopeId,
  recipientId,
  userId,
  teamId,
  reason,
  actAsEmail,
  requestMetadata
}) {
  // Build the access-controlled envelope query. This enforces team membership
  // AND document visibility (and owner / team-email access), mirroring the
  // canonical envelope access checks used across the app.
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    type: EnvelopeType.DOCUMENT,
    userId,
    teamId
  });
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      id: recipientId,
      envelope: envelopeWhereInput
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
  if (recipient.signingStatus !== SigningStatus.NOT_SIGNED) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: `Recipient ${recipient.id} has already actioned this document`
    });
  }
  assertRecipientNotExpired(recipient);
  // Resolve the user the rejection should be attributed to. When `actAsEmail`
  // is supplied it must resolve to a member of the team; otherwise the rejection
  // is attributed to the API user that owns the token.
  const electedUser = await getValidatedElectedUser({
    actAsEmail,
    teamId
  });
  const actingUser = electedUser ?? (await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    }
  }));
  // Update the recipient status to rejected and record an external rejection
  // audit log within the same transaction.
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
      // Always attribute the audit log to a concrete user: the elected team
      // member when supplied, otherwise the API user that owns the token.
      user: {
        id: actingUser.id,
        email: actingUser.email,
        name: actingUser.name
      },
      metadata: requestMetadata,
      data: {
        recipientEmail: recipient.email,
        recipientName: recipient.name,
        recipientId: recipient.id,
        recipientRole: recipient.role,
        reason,
        isExternal: true,
        // Only set when a member was explicitly elected via `actAsEmail`.
        onBehalfOfUserEmail: electedUser?.email,
        onBehalfOfUserName: electedUser?.name
      }
    })
  })]);
  const legacyDocumentId = mapSecondaryIdToDocumentId(envelope.secondaryId);
  // Trigger the seal document job to process the document asynchronously.
  await jobs.triggerJob({
    name: 'internal.seal-document',
    payload: {
      documentId: legacyDocumentId,
      requestMetadata: requestMetadata.requestMetadata
    }
  });
  // Send email notifications to the rejecting recipient.
  await jobs.triggerJob({
    name: 'send.signing.rejected.emails',
    payload: {
      recipientId: recipient.id,
      documentId: legacyDocumentId
    }
  });
  // Send cancellation emails to other recipients.
  await jobs.triggerJob({
    name: 'send.document.cancelled.emails',
    payload: {
      documentId: legacyDocumentId,
      cancellationReason: reason,
      requestMetadata: requestMetadata.requestMetadata
    }
  });
  return updatedRecipient;
}
/**
 * Resolve and validate the team member elected via `actAsEmail`. Returns `null`
 * when no `actAsEmail` is supplied (the rejection is then attributed to the API
 * user). Throws when the email does not resolve to a member of the team.
 */
const getValidatedElectedUser = async ({
  actAsEmail,
  teamId
}) => {
  if (!actAsEmail) {
    return null;
  }
  const electedUser = await prismaWithReplicas.user.findFirst({
    where: {
      email: actAsEmail
    }
  });
  if (!electedUser) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'The user to act on behalf of must be a member of the team'
    });
  }
  const isTeamMember = await prismaWithReplicas.team.findFirst({
    where: buildTeamWhereQuery({
      teamId,
      userId: electedUser.id
    })
  });
  if (!isTeamMember) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'The user to act on behalf of must be a member of the team'
    });
  }
  return electedUser;
};

export { rejectDocumentOnBehalfOf };
//# sourceMappingURL=reject-document-on-behalf-of.js.map
