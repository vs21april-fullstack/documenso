import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, SendStatus, RecipientRole } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { jobs } from '../../jobs/client.js';
import { extractDerivedDocumentEmailSettings } from '../../types/document-email.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { canRecipientBeModified, isRecipientEmailValidForSending } from '../../utils/recipients.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { assertEnvelopeMutable } from '../envelope/assert-envelope-mutable.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const deleteEnvelopeRecipient = async ({
  userId,
  teamId,
  recipientId,
  requestMetadata
}) => {
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      recipients: {
        some: {
          id: recipientId
        }
      },
      team: buildTeamWhereQuery({
        teamId,
        userId
      })
    },
    include: {
      documentMeta: true,
      team: true,
      recipients: {
        where: {
          id: recipientId
        },
        include: {
          fields: true
        }
      }
    }
  });
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Document not found'
    });
  }
  assertEnvelopeMutable(envelope);
  if (envelope.completedAt) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Document already complete'
    });
  }
  if (!user) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'User not found'
    });
  }
  const recipientToDelete = envelope.recipients[0];
  if (!recipientToDelete || recipientToDelete.id !== recipientId) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Recipient not found'
    });
  }
  if (!canRecipientBeModified(recipientToDelete, recipientToDelete.fields)) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Recipient has already interacted with the document.'
    });
  }
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: envelope.id
    },
    type: null,
    userId,
    teamId
  });
  const deletedRecipient = await prismaWithReplicas.$transaction(async tx => {
    await assertEnvelopeMutable(envelope, tx);
    if (envelope.type === EnvelopeType.DOCUMENT) {
      await tx.documentAuditLog.create({
        data: createDocumentAuditLogData({
          type: DOCUMENT_AUDIT_LOG_TYPE.RECIPIENT_DELETED,
          envelopeId: envelope.id,
          metadata: requestMetadata,
          data: {
            recipientEmail: recipientToDelete.email,
            recipientName: recipientToDelete.name,
            recipientId: recipientToDelete.id,
            recipientRole: recipientToDelete.role
          }
        })
      });
    }
    return await tx.recipient.delete({
      where: {
        id: recipientId,
        envelope: envelopeWhereInput
      }
    });
  });
  const isRecipientRemovedEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).recipientRemoved;
  // Send email to deleted recipient.
  if (recipientToDelete.sendStatus === SendStatus.SENT && recipientToDelete.role !== RecipientRole.CC && isRecipientRemovedEmailEnabled && envelope.type === EnvelopeType.DOCUMENT && isRecipientEmailValidForSending(recipientToDelete)) {
    // Enqueue the "removed from document" email as a background job so a
    // transient mail outage doesn't fail the request and the send is retried.
    await jobs.triggerJob({
      name: 'send.recipient.removed.email',
      payload: {
        envelopeId: envelope.id,
        recipientEmail: recipientToDelete.email,
        recipientName: recipientToDelete.name,
        inviterName: envelope.team?.name || user.name || undefined
      }
    });
  }
  return deletedRecipient;
};

export { deleteEnvelopeRecipient };
//# sourceMappingURL=delete-envelope-recipient.js.map
