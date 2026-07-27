import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import '../../universal/id.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { createRecipientAuthOptions } from '../../utils/document-auth.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { SigningStatus, SendStatus, RecipientRole, EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { mapRecipientToLegacyRecipient } from '../../utils/recipients.js';
import { assertEnvelopeMutable } from '../envelope/assert-envelope-mutable.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';
import { assertCompatibleRecipientRole } from '../signature-level/assert-compatible-recipient-role.js';
import { nanoid } from 'nanoid';

const createEnvelopeRecipients = async ({
  userId,
  teamId,
  id,
  recipients: recipientsToCreate,
  requestMetadata
}) => {
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id,
    type: null,
    userId,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    include: {
      recipients: true,
      team: {
        select: {
          organisation: {
            select: {
              organisationClaim: true
            }
          }
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  assertEnvelopeMutable(envelope);
  if (envelope.completedAt) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Envelope already complete'
    });
  }
  const recipientsHaveActionAuth = recipientsToCreate.some(recipient => recipient.actionAuth && recipient.actionAuth.length > 0);
  // Check if user has permission to set the global action auth.
  if (recipientsHaveActionAuth && !envelope.team.organisation.organisationClaim.flags.cfr21) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You do not have permission to set the action auth'
    });
  }
  for (const recipient of recipientsToCreate) {
    assertCompatibleRecipientRole({
      signatureLevel: envelope.signatureLevel,
      role: recipient.role
    });
  }
  const normalizedRecipients = recipientsToCreate.map(recipient => ({
    ...recipient,
    email: recipient.email.toLowerCase()
  }));
  const createdRecipients = await prismaWithReplicas.$transaction(async tx => {
    await assertEnvelopeMutable(envelope, tx);
    return await Promise.all(normalizedRecipients.map(async recipient => {
      const authOptions = createRecipientAuthOptions({
        accessAuth: recipient.accessAuth ?? [],
        actionAuth: recipient.actionAuth ?? []
      });
      const createdRecipient = await tx.recipient.create({
        data: {
          envelopeId: envelope.id,
          name: recipient.name,
          email: recipient.email,
          role: recipient.role,
          signingOrder: recipient.signingOrder,
          token: nanoid(),
          sendStatus: recipient.role === RecipientRole.CC ? SendStatus.SENT : SendStatus.NOT_SENT,
          signingStatus: recipient.role === RecipientRole.CC ? SigningStatus.SIGNED : SigningStatus.NOT_SIGNED,
          authOptions
        }
      });
      // Handle recipient created audit log.
      if (envelope.type === EnvelopeType.DOCUMENT) {
        await tx.documentAuditLog.create({
          data: createDocumentAuditLogData({
            type: DOCUMENT_AUDIT_LOG_TYPE.RECIPIENT_CREATED,
            envelopeId: envelope.id,
            metadata: requestMetadata,
            data: {
              recipientEmail: createdRecipient.email,
              recipientName: createdRecipient.name,
              recipientId: createdRecipient.id,
              recipientRole: createdRecipient.role,
              accessAuth: recipient.accessAuth ?? [],
              actionAuth: recipient.actionAuth ?? []
            }
          })
        });
      }
      return createdRecipient;
    }));
  });
  return {
    recipients: createdRecipients.map(recipient => mapRecipientToLegacyRecipient(recipient, envelope))
  };
};

export { createEnvelopeRecipients };
//# sourceMappingURL=create-envelope-recipients.js.map
