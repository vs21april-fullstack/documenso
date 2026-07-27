import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, DocumentSource, WebhookTriggerEvents } from '@prisma/client';
import pMap from 'p-map';
import { omit } from 'remeda';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { ZSignatureLevelSchema } from '../../types/signature-level.js';
import { ZWebhookDocumentSchema, mapEnvelopeToWebhookDocumentPayload } from '../../types/webhook-payload.js';
import { prefixedId } from '../../universal/id.js';
import { getEnvelopeWhereInput } from './get-envelope-by-id.js';
import { incrementDocumentId, incrementTemplateId } from './increment-id.js';
import { assertOrganisationRatesAndLimits } from '../rate-limit/assert-organisation-rates-and-limits.js';
import { resolveSignatureLevel } from '../signature-level/resolve-signature-level.js';
import { triggerWebhook } from '../webhooks/trigger/trigger-webhook.js';
import { nanoid } from 'nanoid';

const duplicateEnvelope = async ({
  id,
  userId,
  teamId,
  overrides
}) => {
  const {
    duplicateAsTemplate = false,
    includeRecipients = true,
    includeFields = true
  } = overrides ?? {};
  const {
    envelopeWhereInput,
    team
  } = await getEnvelopeWhereInput({
    id,
    type: null,
    userId,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    select: {
      type: true,
      title: true,
      userId: true,
      internalVersion: true,
      signatureLevel: true,
      templateType: true,
      publicTitle: true,
      publicDescription: true,
      envelopeItems: {
        include: {
          documentData: {
            select: {
              data: true,
              initialData: true,
              type: true
            }
          }
        }
      },
      authOptions: true,
      visibility: true,
      documentMeta: true,
      recipients: {
        select: {
          email: true,
          name: true,
          role: true,
          signingOrder: true,
          fields: true
        }
      },
      teamId: true
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Document not found'
    });
  }
  if (duplicateAsTemplate && envelope.type !== EnvelopeType.DOCUMENT) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Only documents can be saved as templates'
    });
  }
  const targetType = duplicateAsTemplate ? EnvelopeType.TEMPLATE : envelope.type;
  // Enforce the organisation document-creation limit before creating the duplicate.
  if (targetType === EnvelopeType.DOCUMENT) {
    await assertOrganisationRatesAndLimits({
      organisationId: team.organisationId,
      type: 'document',
      count: 1
    });
  }
  const [{
    legacyNumberId,
    secondaryId
  }, createdDocumentMeta] = await Promise.all([targetType === EnvelopeType.DOCUMENT ? incrementDocumentId().then(({
    documentId,
    formattedDocumentId
  }) => ({
    legacyNumberId: documentId,
    secondaryId: formattedDocumentId
  })) : incrementTemplateId().then(({
    templateId,
    formattedTemplateId
  }) => ({
    legacyNumberId: templateId,
    secondaryId: formattedTemplateId
  })), prismaWithReplicas.documentMeta.create({
    data: {
      ...omit(envelope.documentMeta, ['id']),
      emailSettings: envelope.documentMeta.emailSettings || undefined
    }
  })]);
  const duplicatedTemplateType = envelope.templateType === 'ORGANISATION' && envelope.teamId !== teamId ? 'PRIVATE' : envelope.templateType ?? undefined;
  // The source level is a free-form TEXT column — parse defensively before
  // handing to the resolver. Coerce (not strict) because instance mode may have
  // changed since the source envelope was created.
  const duplicatedSignatureLevel = resolveSignatureLevel({
    requested: ZSignatureLevelSchema.parse(envelope.signatureLevel),
    strict: false
  });
  const duplicatedEnvelope = await prismaWithReplicas.envelope.create({
    data: {
      id: prefixedId('envelope'),
      secondaryId,
      type: targetType,
      internalVersion: envelope.internalVersion,
      signatureLevel: duplicatedSignatureLevel,
      userId,
      teamId,
      title: envelope.title + ' (copy)',
      documentMetaId: createdDocumentMeta.id,
      authOptions: envelope.authOptions || undefined,
      visibility: envelope.visibility,
      templateType: duplicatedTemplateType,
      publicTitle: envelope.publicTitle ?? undefined,
      publicDescription: envelope.publicDescription ?? undefined,
      source: targetType === EnvelopeType.DOCUMENT ? DocumentSource.DOCUMENT : DocumentSource.TEMPLATE
    },
    include: {
      recipients: true,
      documentMeta: true
    }
  });
  // Key = original envelope item ID
  // Value = duplicated envelope item ID.
  const oldEnvelopeItemToNewEnvelopeItemIdMap = {};
  // Duplicate the envelope items.
  await Promise.all(envelope.envelopeItems.map(async envelopeItem => {
    const duplicatedDocumentData = await prismaWithReplicas.documentData.create({
      data: {
        type: envelopeItem.documentData.type,
        data: envelopeItem.documentData.initialData,
        initialData: envelopeItem.documentData.initialData
      }
    });
    const duplicatedEnvelopeItem = await prismaWithReplicas.envelopeItem.create({
      data: {
        id: prefixedId('envelope_item'),
        title: envelopeItem.title,
        order: envelopeItem.order,
        envelopeId: duplicatedEnvelope.id,
        documentDataId: duplicatedDocumentData.id
      }
    });
    oldEnvelopeItemToNewEnvelopeItemIdMap[envelopeItem.id] = duplicatedEnvelopeItem.id;
  }));
  if (includeRecipients) {
    await pMap(envelope.recipients, async recipient => prismaWithReplicas.recipient.create({
      data: {
        envelopeId: duplicatedEnvelope.id,
        email: recipient.email,
        name: recipient.name,
        role: recipient.role,
        signingOrder: recipient.signingOrder,
        token: nanoid(),
        fields: includeFields ? {
          createMany: {
            data: recipient.fields.map(field => ({
              envelopeId: duplicatedEnvelope.id,
              envelopeItemId: oldEnvelopeItemToNewEnvelopeItemIdMap[field.envelopeItemId],
              type: field.type,
              page: field.page,
              positionX: field.positionX,
              positionY: field.positionY,
              width: field.width,
              height: field.height,
              customText: '',
              inserted: false,
              fieldMeta: field.fieldMeta
            }))
          }
        } : undefined
      }
    }), {
      concurrency: 5
    });
  }
  if (duplicatedEnvelope.type === EnvelopeType.DOCUMENT) {
    const refetchedEnvelope = await prismaWithReplicas.envelope.findFirstOrThrow({
      where: {
        id: duplicatedEnvelope.id
      },
      include: {
        documentMeta: true,
        recipients: true
      }
    });
    await triggerWebhook({
      event: WebhookTriggerEvents.DOCUMENT_CREATED,
      data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(refetchedEnvelope)),
      userId: userId,
      teamId: teamId
    });
  }
  return {
    id: duplicatedEnvelope.id,
    envelope: duplicatedEnvelope,
    legacyId: {
      type: duplicatedEnvelope.type,
      id: legacyNumberId
    }
  };
};

export { duplicateEnvelope };
//# sourceMappingURL=duplicate-envelope.js.map
