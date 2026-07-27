import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { canRecipientFieldsBeModified } from '../../utils/recipients.js';
import { assertEnvelopeMutable } from '../envelope/assert-envelope-mutable.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const deleteDocumentField = async ({
  userId,
  teamId,
  fieldId,
  requestMetadata
}) => {
  // Unauthenticated check, we do the real check later.
  const field = await prismaWithReplicas.field.findFirst({
    where: {
      id: fieldId
    }
  });
  if (!field) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Field not found'
    });
  }
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: field.envelopeId
    },
    type: EnvelopeType.DOCUMENT,
    userId,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: envelopeWhereInput,
    include: {
      recipients: {
        where: {
          id: field.recipientId
        },
        include: {
          fields: true
        }
      }
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
  const recipient = envelope.recipients.find(recipient => recipient.id === field.recipientId);
  if (!recipient) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: `Recipient for field ${fieldId} not found`
    });
  }
  // Check whether the recipient associated with the field can have new fields created.
  if (!canRecipientFieldsBeModified(recipient, recipient.fields)) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Recipient has already interacted with the document.'
    });
  }
  return await prismaWithReplicas.$transaction(async tx => {
    await assertEnvelopeMutable(envelope, tx);
    const deletedField = await tx.field.delete({
      where: {
        id: fieldId,
        envelopeId: envelope.id
      }
    });
    // Handle field deleted audit log.
    await tx.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.FIELD_DELETED,
        envelopeId: envelope.id,
        metadata: requestMetadata,
        data: {
          fieldId: deletedField.secondaryId,
          fieldRecipientEmail: recipient.email,
          fieldRecipientId: deletedField.recipientId,
          fieldType: deletedField.type
        }
      })
    });
    return deletedField;
  });
};

export { deleteDocumentField };
//# sourceMappingURL=delete-document-field.js.map
