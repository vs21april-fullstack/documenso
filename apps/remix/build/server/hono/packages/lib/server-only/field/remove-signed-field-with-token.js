import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { assertRecipientNotExpired } from '../../utils/recipients.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { SigningStatus, RecipientRole, DocumentStatus } from '@prisma/client';

const removeSignedFieldWithToken = async ({
  token,
  fieldId,
  requestMetadata
}) => {
  const recipient = await prismaWithReplicas.recipient.findFirstOrThrow({
    where: {
      token
    }
  });
  const field = await prismaWithReplicas.field.findFirstOrThrow({
    where: {
      id: fieldId,
      recipient: {
        ...(recipient.role !== RecipientRole.ASSISTANT ? {
          id: recipient.id
        } : {
          signingOrder: {
            gte: recipient.signingOrder ?? 0
          },
          signingStatus: {
            not: SigningStatus.SIGNED
          },
          envelopeId: recipient.envelopeId
        })
      }
    },
    include: {
      envelope: true,
      recipient: true
    }
  });
  const {
    envelope
  } = field;
  if (!envelope) {
    throw new Error(`Document not found for field ${field.id}`);
  }
  if (envelope.status !== DocumentStatus.PENDING) {
    throw new Error(`Document ${envelope.id} must be pending`);
  }
  assertRecipientNotExpired(recipient);
  if (recipient?.signingStatus === SigningStatus.SIGNED || field.recipient.signingStatus === SigningStatus.SIGNED) {
    throw new Error(`Recipient ${recipient.id} has already signed`);
  }
  // Unreachable code based on the above query but we need to satisfy TypeScript
  if (field.recipientId === null) {
    throw new Error(`Field ${fieldId} has no recipientId`);
  }
  await prismaWithReplicas.$transaction(async tx => {
    await tx.field.update({
      where: {
        id: field.id
      },
      data: {
        customText: '',
        inserted: false
      }
    });
    await tx.signature.deleteMany({
      where: {
        fieldId: field.id
      }
    });
    if (recipient.role !== RecipientRole.ASSISTANT) {
      await tx.documentAuditLog.create({
        data: createDocumentAuditLogData({
          type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FIELD_UNINSERTED,
          envelopeId: envelope.id,
          user: {
            name: recipient.name,
            email: recipient.email
          },
          requestMetadata,
          data: {
            field: field.type,
            fieldId: field.secondaryId
          }
        })
      });
    }
  });
};

export { removeSignedFieldWithToken };
//# sourceMappingURL=remove-signed-field-with-token.js.map
