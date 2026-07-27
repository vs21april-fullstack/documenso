import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { getEnvelopeWhereInput } from '../../../../lib/server-only/envelope/get-envelope-by-id.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../../../lib/types/document-audit-logs.js';
import { createDocumentAuditLogData } from '../../../../lib/utils/document-audit-logs.js';
import { canRecipientFieldsBeModified } from '../../../../lib/utils/recipients.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { ZGenericSuccessResponse } from '../../schema.js';
import { authenticatedProcedure } from '../../trpc.js';
import { deleteEnvelopeFieldMeta, ZDeleteEnvelopeFieldRequestSchema, ZDeleteEnvelopeFieldResponseSchema } from './delete-envelope-field.types.js';

const deleteEnvelopeFieldRoute = authenticatedProcedure.meta(deleteEnvelopeFieldMeta).input(ZDeleteEnvelopeFieldRequestSchema).output(ZDeleteEnvelopeFieldResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId,
    metadata
  } = ctx;
  const {
    fieldId
  } = input;
  ctx.logger.info({
    input: {
      fieldId
    }
  });
  const unsafeField = await prismaWithReplicas.field.findUnique({
    where: {
      id: fieldId
    },
    select: {
      envelopeId: true
    }
  });
  if (!unsafeField) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Field not found'
    });
  }
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: unsafeField.envelopeId
    },
    type: null,
    userId: user.id,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: envelopeWhereInput,
    include: {
      recipients: {
        include: {
          fields: true
        }
      }
    }
  });
  const recipientWithFields = envelope?.recipients.find(recipient => recipient.fields.some(field => field.id === fieldId));
  const fieldToDelete = recipientWithFields?.fields.find(field => field.id === fieldId);
  if (!envelope || !recipientWithFields || !fieldToDelete) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Field not found'
    });
  }
  if (envelope.completedAt) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Envelope already complete'
    });
  }
  // Check whether the recipient associated with the field can have new fields created.
  if (!canRecipientFieldsBeModified(recipientWithFields, recipientWithFields.fields)) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Recipient has already interacted with the document.'
    });
  }
  await prismaWithReplicas.$transaction(async tx => {
    const deletedField = await tx.field.delete({
      where: {
        id: fieldToDelete.id,
        envelopeId: envelope.id
      }
    });
    // Handle field deleted audit log.
    if (envelope.type === EnvelopeType.DOCUMENT) {
      await tx.documentAuditLog.create({
        data: createDocumentAuditLogData({
          type: DOCUMENT_AUDIT_LOG_TYPE.FIELD_DELETED,
          envelopeId: envelope.id,
          metadata,
          data: {
            fieldId: deletedField.secondaryId,
            fieldRecipientEmail: recipientWithFields.email,
            fieldRecipientId: deletedField.recipientId,
            fieldType: deletedField.type
          }
        })
      });
    }
    return deletedField;
  });
  return ZGenericSuccessResponse;
});

export { deleteEnvelopeFieldRoute };
//# sourceMappingURL=delete-envelope-field.js.map
