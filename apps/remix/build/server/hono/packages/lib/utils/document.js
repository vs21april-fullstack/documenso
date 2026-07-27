import { DocumentStatus, DocumentDistributionMethod } from '@prisma/client';
import { DEFAULT_DOCUMENT_TIME_ZONE } from '../constants/time-zones.js';
import { resolveSigningOrder } from '../server-only/signature-level/resolve-signing-order.js';
import { DEFAULT_DOCUMENT_EMAIL_SETTINGS } from '../types/document-email.js';
import { SignatureLevel } from '../types/signature-level.js';
import { mapSecondaryIdToDocumentId } from './envelope.js';
import { mapRecipientToLegacyRecipient } from './recipients.js';

const isDocumentCompleted = document => {
  const status = typeof document === 'string' ? document : document.status;
  return status === DocumentStatus.COMPLETED || status === DocumentStatus.REJECTED || status === DocumentStatus.CANCELLED;
};
/**
 * Extracts the derived document meta which should be used when creating a document
 * from scratch, or from a template.
 *
 * Uses the following, the lower number overrides the higher number:
 * 1. Merged organisation/team settings
 * 2. Meta overrides
 *
 * @param settings - The merged organisation/team settings.
 * @param overrideMeta - The meta to override the settings with.
 * @param signatureLevel - The envelope's signature level. Optional; defaults
 *   to `SES` for backward compatibility, which preserves the legacy `PARALLEL`
 *   signing-order default. New callers should pass the resolved level so the
 *   TSP envelopes get the `SEQUENTIAL` default + assertion against explicit
 *   `PARALLEL`.
 * @returns The derived document meta.
 */
const extractDerivedDocumentMeta = (settings, overrideMeta, signatureLevel = SignatureLevel.SES) => {
  const meta = overrideMeta ?? {};
  // Note: If you update this you will also need to update `create-document-from-template.ts`
  // since there is custom work there which allows 3 overrides.
  return {
    language: meta.language || settings.documentLanguage,
    timezone: meta.timezone || settings.documentTimezone || DEFAULT_DOCUMENT_TIME_ZONE,
    dateFormat: meta.dateFormat || settings.documentDateFormat,
    message: meta.message || null,
    subject: meta.subject || null,
    redirectUrl: meta.redirectUrl || null,
    signingOrder: resolveSigningOrder({
      signatureLevel,
      requested: meta.signingOrder
    }),
    allowDictateNextSigner: meta.allowDictateNextSigner ?? false,
    distributionMethod: meta.distributionMethod || DocumentDistributionMethod.EMAIL,
    // Todo: Make this a setting.
    // Signature settings.
    typedSignatureEnabled: meta.typedSignatureEnabled ?? settings.typedSignatureEnabled,
    uploadSignatureEnabled: meta.uploadSignatureEnabled ?? settings.uploadSignatureEnabled,
    drawSignatureEnabled: meta.drawSignatureEnabled ?? settings.drawSignatureEnabled,
    // Email settings.
    emailId: meta.emailId ?? settings.emailId,
    emailReplyTo: meta.emailReplyTo ?? settings.emailReplyTo,
    emailSettings: meta.emailSettings || settings.emailDocumentSettings || DEFAULT_DOCUMENT_EMAIL_SETTINGS,
    // Envelope expiration.
    envelopeExpirationPeriod: meta.envelopeExpirationPeriod ?? settings.envelopeExpirationPeriod ?? null,
    // Reminder settings.
    reminderSettings: meta.reminderSettings ?? settings.reminderSettings ?? null
  };
};
/**
 * Map an envelope to a legacy document lite response entity.
 *
 * Do not use spread operator here to avoid unexpected behavior.
 */
const mapEnvelopeToDocumentLite = envelope => {
  const documentId = mapSecondaryIdToDocumentId(envelope.secondaryId);
  return {
    id: documentId,
    // Use legacy ID.
    envelopeId: envelope.id,
    internalVersion: envelope.internalVersion,
    visibility: envelope.visibility,
    status: envelope.status,
    source: envelope.source,
    externalId: envelope.externalId,
    userId: envelope.userId,
    authOptions: envelope.authOptions,
    formValues: envelope.formValues,
    title: envelope.title,
    createdAt: envelope.createdAt,
    documentDataId: '',
    // Backwards compatibility.
    updatedAt: envelope.updatedAt,
    completedAt: envelope.completedAt,
    deletedAt: envelope.deletedAt,
    teamId: envelope.teamId,
    folderId: envelope.folderId,
    useLegacyFieldInsertion: envelope.useLegacyFieldInsertion,
    templateId: envelope.templateId
  };
};
/**
 * Map an envelope to a legacy document many response entity.
 *
 * Do not use spread operator here to avoid unexpected behavior.
 */
const mapEnvelopesToDocumentMany = envelope => {
  const legacyDocumentId = mapSecondaryIdToDocumentId(envelope.secondaryId);
  return {
    id: legacyDocumentId,
    // Use legacy ID.
    envelopeId: envelope.id,
    internalVersion: envelope.internalVersion,
    visibility: envelope.visibility,
    status: envelope.status,
    source: envelope.source,
    externalId: envelope.externalId,
    userId: envelope.userId,
    authOptions: envelope.authOptions,
    formValues: envelope.formValues,
    title: envelope.title,
    createdAt: envelope.createdAt,
    documentDataId: '',
    // Backwards compatibility.
    updatedAt: envelope.updatedAt,
    completedAt: envelope.completedAt,
    deletedAt: envelope.deletedAt,
    teamId: envelope.teamId,
    folderId: envelope.folderId,
    useLegacyFieldInsertion: envelope.useLegacyFieldInsertion,
    templateId: envelope.templateId,
    user: {
      id: envelope.userId,
      name: envelope.user.name,
      email: envelope.user.email
    },
    team: {
      id: envelope.teamId,
      url: envelope.team.url
    },
    recipients: envelope.recipients.map(recipient => mapRecipientToLegacyRecipient(recipient, envelope))
  };
};

export { extractDerivedDocumentMeta, isDocumentCompleted, mapEnvelopeToDocumentLite, mapEnvelopesToDocumentMany };
//# sourceMappingURL=document.js.map
