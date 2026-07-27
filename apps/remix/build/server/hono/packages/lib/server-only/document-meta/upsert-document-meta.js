import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { diffDocumentMetaChanges, createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { assertEnvelopeMutable } from '../envelope/assert-envelope-mutable.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';
import { assertCompatibleDictateNextSigner } from '../signature-level/assert-compatible-dictate-next-signer.js';
import { assertCompatibleSigningOrder } from '../signature-level/assert-compatible-signing-order.js';

const updateDocumentMeta = async ({
  id,
  userId,
  teamId,
  subject,
  message,
  timezone,
  dateFormat,
  redirectUrl,
  signingOrder,
  allowDictateNextSigner,
  emailId,
  emailReplyTo,
  emailSettings,
  distributionMethod,
  typedSignatureEnabled,
  uploadSignatureEnabled,
  drawSignatureEnabled,
  language,
  requestMetadata
}) => {
  const {
    envelopeWhereInput,
    team
  } = await getEnvelopeWhereInput({
    id,
    type: null,
    // Allow updating both documents and templates meta.
    userId,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    include: {
      documentMeta: true
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Document not found'
    });
  }
  await assertEnvelopeMutable(envelope);
  if (signingOrder !== undefined) {
    assertCompatibleSigningOrder({
      signatureLevel: envelope.signatureLevel,
      signingOrder
    });
  }
  if (allowDictateNextSigner !== undefined) {
    assertCompatibleDictateNextSigner({
      signatureLevel: envelope.signatureLevel,
      allowDictateNextSigner
    });
  }
  const {
    documentMeta: originalDocumentMeta
  } = envelope;
  // Validate the emailId belongs to the organisation.
  if (emailId) {
    const email = await prismaWithReplicas.organisationEmail.findFirst({
      where: {
        id: emailId,
        organisationId: team.organisationId
      }
    });
    if (!email) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Email not found'
      });
    }
  }
  return await prismaWithReplicas.$transaction(async tx => {
    await assertEnvelopeMutable(envelope, tx);
    const upsertedDocumentMeta = await tx.documentMeta.update({
      where: {
        id: envelope.documentMetaId
      },
      data: {
        subject,
        message,
        dateFormat,
        timezone,
        redirectUrl,
        signingOrder,
        allowDictateNextSigner,
        emailId,
        emailReplyTo,
        emailSettings,
        distributionMethod,
        typedSignatureEnabled,
        uploadSignatureEnabled,
        drawSignatureEnabled,
        language
      }
    });
    const changes = diffDocumentMetaChanges(originalDocumentMeta ?? {}, upsertedDocumentMeta);
    // Create audit logs only for document type envelopes.
    if (changes.length > 0 && envelope.type === EnvelopeType.DOCUMENT) {
      await tx.documentAuditLog.create({
        data: createDocumentAuditLogData({
          type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_META_UPDATED,
          envelopeId: envelope.id,
          metadata: requestMetadata,
          data: {
            changes: diffDocumentMetaChanges(originalDocumentMeta ?? {}, upsertedDocumentMeta)
          }
        })
      });
    }
    return upsertedDocumentMeta;
  });
};

export { updateDocumentMeta };
//# sourceMappingURL=upsert-document-meta.js.map
