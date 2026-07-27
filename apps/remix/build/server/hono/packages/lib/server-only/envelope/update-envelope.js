import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, FolderType, DocumentStatus, WebhookTriggerEvents } from '@prisma/client';
import { isDeepEqual } from 'remeda';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { ZWebhookDocumentSchema, mapEnvelopeToWebhookDocumentPayload } from '../../types/webhook-payload.js';
import { extractDocumentAuthMethods, createDocumentAuthOptions } from '../../utils/document-auth.js';
import { canAccessTeamDocument, buildTeamWhereQuery } from '../../utils/teams.js';
import { recomputeNextReminderForEnvelope } from '../recipient/update-recipient-next-reminder.js';
import { assertCompatibleDictateNextSigner } from '../signature-level/assert-compatible-dictate-next-signer.js';
import { assertCompatibleSigningOrder } from '../signature-level/assert-compatible-signing-order.js';
import { triggerWebhook } from '../webhooks/trigger/trigger-webhook.js';
import { assertEnvelopeMutable } from './assert-envelope-mutable.js';
import { getEnvelopeWhereInput } from './get-envelope-by-id.js';

const updateEnvelope = async ({
  userId,
  teamId,
  id,
  data = {},
  meta = {},
  requestMetadata
}) => {
  const {
    envelopeWhereInput,
    team
  } = await getEnvelopeWhereInput({
    id,
    type: null,
    // Allow updating both documents and templates.
    userId,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    include: {
      documentMeta: true,
      team: {
        select: {
          organisationId: true,
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
  if (meta.signingOrder !== undefined) {
    assertCompatibleSigningOrder({
      signatureLevel: envelope.signatureLevel,
      signingOrder: meta.signingOrder
    });
  }
  if (meta.allowDictateNextSigner !== undefined) {
    assertCompatibleDictateNextSigner({
      signatureLevel: envelope.signatureLevel,
      allowDictateNextSigner: meta.allowDictateNextSigner
    });
  }
  if (envelope.type !== EnvelopeType.TEMPLATE && (data.publicTitle || data.publicDescription || data.templateType)) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'You cannot update the template fields for document type envelopes'
    });
  }
  // If no data just return the document since this function is normally chained after a meta update.
  if (Object.values(data).length === 0 && Object.keys(meta).length === 0) {
    return envelope;
  }
  const isEnvelopeOwner = envelope.userId === userId;
  // Validate whether the new visibility setting is allowed for the current user.
  if (!isEnvelopeOwner && data?.visibility && !canAccessTeamDocument(team.currentTeamRole, data.visibility)) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You do not have permission to update the envelope visibility'
    });
  }
  const {
    documentAuthOption
  } = extractDocumentAuthMethods({
    documentAuth: envelope.authOptions
  });
  const documentGlobalAccessAuth = documentAuthOption?.globalAccessAuth ?? null;
  const documentGlobalActionAuth = documentAuthOption?.globalActionAuth ?? null;
  // If the new global auth values aren't passed in, fallback to the current document values.
  const newGlobalAccessAuth = data?.globalAccessAuth === undefined ? documentGlobalAccessAuth : data.globalAccessAuth;
  const newGlobalActionAuth = data?.globalActionAuth === undefined ? documentGlobalActionAuth : data.globalActionAuth;
  // Check if user has permission to set the global action auth.
  if (newGlobalActionAuth.length > 0 && !envelope.team.organisation.organisationClaim.flags.cfr21) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You do not have permission to set the action auth'
    });
  }
  const authOptions = createDocumentAuthOptions({
    globalAccessAuth: newGlobalAccessAuth,
    globalActionAuth: newGlobalActionAuth
  });
  const emailId = meta.emailId;
  // Validate the emailId belongs to the organisation.
  if (emailId) {
    const email = await prismaWithReplicas.organisationEmail.findFirst({
      where: {
        id: emailId,
        organisationId: envelope.team.organisationId
      }
    });
    if (!email) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Email not found'
      });
    }
  }
  let folderUpdateQuery;
  // Validate folder ID.
  if (data.folderId) {
    const folder = await prismaWithReplicas.folder.findFirst({
      where: {
        id: data.folderId,
        team: buildTeamWhereQuery({
          teamId,
          userId
        }),
        type: envelope.type === EnvelopeType.TEMPLATE ? FolderType.TEMPLATE : FolderType.DOCUMENT,
        visibility: {
          in: TEAM_DOCUMENT_VISIBILITY_MAP[team.currentTeamRole]
        }
      }
    });
    if (!folder) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Folder not found'
      });
    }
    folderUpdateQuery = {
      connect: {
        id: data.folderId
      }
    };
  }
  // Move to root folder if folderId is null.
  if (data.folderId === null) {
    folderUpdateQuery = {
      disconnect: true
    };
  }
  const isTitleSame = data.title === undefined || data.title === envelope.title;
  const isExternalIdSame = data.externalId === undefined || data.externalId === envelope.externalId;
  const isGlobalAccessSame = documentGlobalAccessAuth === undefined || isDeepEqual(documentGlobalAccessAuth, newGlobalAccessAuth);
  const isGlobalActionSame = documentGlobalActionAuth === undefined || isDeepEqual(documentGlobalActionAuth, newGlobalActionAuth);
  const isDocumentVisibilitySame = data.visibility === undefined || data.visibility === envelope.visibility;
  data.folderId === undefined || data.folderId === envelope.folderId;
  data.templateType === undefined || data.templateType === envelope.templateType;
  data.publicDescription === undefined || data.publicDescription === envelope.publicDescription;
  data.publicTitle === undefined || data.publicTitle === envelope.publicTitle;
  const auditLogs = [];
  if (!isTitleSame && envelope.status !== DocumentStatus.DRAFT && envelope.status !== DocumentStatus.PENDING) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'Envelope title can only be updated while in draft or pending status'
    });
  }
  if (!isTitleSame) {
    auditLogs.push(createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_TITLE_UPDATED,
      envelopeId: envelope.id,
      metadata: requestMetadata,
      data: {
        from: envelope.title,
        to: data.title || ''
      }
    }));
  }
  if (!isExternalIdSame) {
    auditLogs.push(createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_EXTERNAL_ID_UPDATED,
      envelopeId: envelope.id,
      metadata: requestMetadata,
      data: {
        from: envelope.externalId,
        to: data.externalId || ''
      }
    }));
  }
  if (!isGlobalAccessSame) {
    auditLogs.push(createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_GLOBAL_AUTH_ACCESS_UPDATED,
      envelopeId: envelope.id,
      metadata: requestMetadata,
      data: {
        from: documentGlobalAccessAuth,
        to: newGlobalAccessAuth
      }
    }));
  }
  if (!isGlobalActionSame) {
    auditLogs.push(createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_GLOBAL_AUTH_ACTION_UPDATED,
      envelopeId: envelope.id,
      metadata: requestMetadata,
      data: {
        from: documentGlobalActionAuth,
        to: newGlobalActionAuth
      }
    }));
  }
  if (!isDocumentVisibilitySame) {
    auditLogs.push(createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_VISIBILITY_UPDATED,
      envelopeId: envelope.id,
      metadata: requestMetadata,
      data: {
        from: envelope.visibility,
        to: data.visibility || ''
      }
    }));
  }
  // Todo: Decide if we want to log moving the document around.
  // if (!isFolderSame) {
  //   auditLogs.push(
  //     createDocumentAuditLogData({
  //       type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FOLDER_UPDATED,
  //       envelopeId: envelope.id,
  //       metadata: requestMetadata,
  //       data: {
  //         from: envelope.folderId,
  //         to: data.folderId || '',
  //       },
  //     }),
  //   );
  // }
  // Todo: Determine if changes are made
  // Commented out since we didn't detect the changes to sequence.
  // const isMetaSame = isDeepEqual(envelope.documentMeta, meta);
  // Early return if nothing is required.
  // if (
  //   auditLogs.length === 0 &&
  //   data.useLegacyFieldInsertion === undefined &&
  //   isFolderSame &&
  //   isTemplateTypeSame &&
  //   isPublicDescriptionSame &&
  //   isPublicTitleSame
  // ) {
  //   return envelope;
  // }
  const updatedEnvelope = await prismaWithReplicas.$transaction(async tx => {
    await assertEnvelopeMutable(envelope, tx);
    const result = await tx.envelope.update({
      where: {
        id: envelope.id
      },
      data: {
        title: data.title,
        externalId: data.externalId,
        visibility: data.visibility,
        templateType: data.templateType,
        publicDescription: data.publicDescription,
        publicTitle: data.publicTitle,
        useLegacyFieldInsertion: data.useLegacyFieldInsertion,
        authOptions,
        folder: folderUpdateQuery,
        documentMeta: {
          update: {
            ...meta,
            emailSettings: meta?.emailSettings || undefined
          }
        }
      },
      include: {
        documentMeta: true,
        recipients: true
      }
    });
    if (envelope.type === EnvelopeType.DOCUMENT) {
      await tx.documentAuditLog.createMany({
        data: auditLogs
      });
    }
    return result;
  });
  // Recompute reminders for active recipients when reminder settings change.
  if (meta && 'reminderSettings' in meta) {
    await recomputeNextReminderForEnvelope(envelope.id);
  }
  if (envelope.type === EnvelopeType.TEMPLATE) {
    await triggerWebhook({
      event: WebhookTriggerEvents.TEMPLATE_UPDATED,
      data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(updatedEnvelope)),
      userId,
      teamId
    });
  }
  // deconstruct to remove the recipients and documentMeta from the returned object since they aren't needed and can be large.
  const {
    recipients: _recipients,
    documentMeta: _documentMeta,
    ...finalEnvelope
  } = updatedEnvelope;
  return finalEnvelope;
};

export { updateEnvelope };
//# sourceMappingURL=update-envelope.js.map
