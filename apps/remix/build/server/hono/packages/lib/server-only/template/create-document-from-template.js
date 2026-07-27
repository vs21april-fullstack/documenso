import { prefixedId } from '../../universal/id.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, FolderType, DocumentSource, SigningStatus, SendStatus, RecipientRole, WebhookTriggerEvents } from '@prisma/client';
import { DateTime } from 'luxon';
import { match } from 'ts-pattern';
import { DEFAULT_DOCUMENT_DATE_FORMAT } from '../../constants/date-formats.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { ZDefaultRecipientsSchema } from '../../types/default-recipients.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { ZRecipientAuthOptionsSchema } from '../../types/document-auth.js';
import { ZFieldMetaSchema, ZRadioFieldMeta, ZCheckboxFieldMeta, ZDropdownFieldMeta } from '../../types/field-meta.js';
import { ZSignatureLevelSchema } from '../../types/signature-level.js';
import { ZWebhookDocumentSchema, mapEnvelopeToWebhookDocumentPayload } from '../../types/webhook-payload.js';
import { getFileServerSide } from '../../universal/upload/get-file.server.js';
import { putNormalizedPdfFileServerSide } from '../../universal/upload/put-file.server.js';
import { extractDerivedDocumentMeta } from '../../utils/document.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { extractDocumentAuthMethods, createRecipientAuthOptions, createDocumentAuthOptions } from '../../utils/document-auth.js';
import { mapSecondaryIdToTemplateId } from '../../utils/envelope.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';
import { incrementDocumentId } from '../envelope/increment-id.js';
import { insertFormValuesInPdf } from '../pdf/insert-form-values-in-pdf.js';
import { assertOrganisationRatesAndLimits } from '../rate-limit/assert-organisation-rates-and-limits.js';
import { resolveSignatureLevel } from '../signature-level/resolve-signature-level.js';
import { getTeamSettings } from '../team/get-team-settings.js';
import { triggerWebhook } from '../webhooks/trigger/trigger-webhook.js';
import { getOrganisationTemplateWhereInput } from './get-organisation-template-by-id.js';
import { nanoid } from 'nanoid';

const getUpdatedFieldMeta = (field, prefillField) => {
  if (!prefillField) {
    return field.fieldMeta;
  }
  const advancedField = ['NUMBER', 'RADIO', 'CHECKBOX', 'DROPDOWN', 'TEXT'].includes(field.type);
  if (!advancedField) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: `Field ${field.id} is not an advanced field and cannot have field meta information. Allowed types: NUMBER, RADIO, CHECKBOX, DROPDOWN, TEXT.`
    });
  }
  // We've already validated that the field types match at a higher level
  // Start with the existing field meta or an empty object
  const existingMeta = field.fieldMeta || {};
  // Apply type-specific updates based on the prefill field type using ts-pattern
  return match(prefillField).with({
    type: 'text'
  }, field => {
    if (typeof field.value !== 'string') {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid value for TEXT field ${field.id}: expected string, got ${typeof field.value}`
      });
    }
    const meta = {
      ...existingMeta,
      type: 'text',
      label: field.label,
      placeholder: field.placeholder,
      text: field.value
    };
    return meta;
  }).with({
    type: 'number'
  }, field => {
    if (typeof field.value !== 'string') {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid value for NUMBER field ${field.id}: expected string, got ${typeof field.value}`
      });
    }
    const meta = {
      ...existingMeta,
      type: 'number',
      label: field.label,
      placeholder: field.placeholder,
      value: field.value
    };
    return meta;
  }).with({
    type: 'radio'
  }, field => {
    if (typeof field.value !== 'string') {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid value for RADIO field ${field.id}: expected string, got ${typeof field.value}`
      });
    }
    const result = ZRadioFieldMeta.safeParse(existingMeta);
    if (!result.success) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid field meta for RADIO field ${field.id}`
      });
    }
    const radioMeta = result.data;
    // Validate that the value exists in the options
    const valueExists = radioMeta.values?.some(option => option.value === field.value);
    if (!valueExists) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Value "${field.value}" not found in options for RADIO field ${field.id}`
      });
    }
    const newValues = radioMeta.values?.map(option => ({
      ...option,
      checked: option.value === field.value
    }));
    const meta = {
      ...existingMeta,
      type: 'radio',
      label: field.label,
      values: newValues,
      direction: radioMeta.direction ?? 'vertical'
    };
    return meta;
  }).with({
    type: 'checkbox'
  }, field => {
    const result = ZCheckboxFieldMeta.safeParse(existingMeta);
    if (!result.success) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid field meta for CHECKBOX field ${field.id}`
      });
    }
    const checkboxMeta = result.data;
    if (!field.value) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Value is required for CHECKBOX field ${field.id}`
      });
    }
    const fieldValue = field.value;
    // Validate that all values exist in the options
    for (const value of fieldValue) {
      const valueExists = checkboxMeta.values?.some(option => option.value === value);
      if (!valueExists) {
        throw new AppError(AppErrorCode.INVALID_BODY, {
          message: `Value "${value}" not found in options for CHECKBOX field ${field.id}`
        });
      }
    }
    const newValues = checkboxMeta.values?.map(option => ({
      ...option,
      checked: fieldValue.includes(option.value)
    }));
    const meta = {
      ...existingMeta,
      type: 'checkbox',
      label: field.label,
      values: newValues,
      direction: checkboxMeta.direction ?? 'vertical'
    };
    return meta;
  }).with({
    type: 'dropdown'
  }, field => {
    const result = ZDropdownFieldMeta.safeParse(existingMeta);
    if (!result.success) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid field meta for DROPDOWN field ${field.id}`
      });
    }
    const dropdownMeta = result.data;
    // Validate that the value exists in the options if values are defined
    const valueExists = dropdownMeta.values?.some(option => option.value === field.value);
    if (!valueExists) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Value "${field.value}" not found in options for DROPDOWN field ${field.id}`
      });
    }
    const meta = {
      ...existingMeta,
      type: 'dropdown',
      label: field.label,
      defaultValue: field.value
    };
    return meta;
  }).otherwise(() => field.fieldMeta);
};
const createDocumentFromTemplate = async ({
  id,
  externalId,
  userId,
  teamId,
  recipients,
  customDocumentData = [],
  override,
  requestMetadata,
  folderId,
  prefillFields,
  attachments,
  formValues
}) => {
  const templateInclude = {
    recipients: {
      include: {
        fields: true
      }
    },
    envelopeItems: {
      include: {
        documentData: true
      }
    },
    documentMeta: true
  };
  const {
    envelopeWhereInput,
    team: callerTeam
  } = await getEnvelopeWhereInput({
    id,
    type: EnvelopeType.TEMPLATE,
    userId,
    teamId
  });
  const [teamTemplate, organisationTemplate] = await Promise.all([prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    include: templateInclude
  }), prismaWithReplicas.envelope.findFirst({
    where: getOrganisationTemplateWhereInput({
      id,
      organisationId: callerTeam.organisationId,
      teamRole: callerTeam.currentTeamRole
    }),
    include: templateInclude
  })]);
  const template = teamTemplate ?? organisationTemplate;
  if (!template) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Template not found'
    });
  }
  if (folderId) {
    const folder = await prismaWithReplicas.folder.findUnique({
      where: {
        id: folderId,
        type: FolderType.DOCUMENT,
        team: buildTeamWhereQuery({
          teamId,
          userId
        })
      }
    });
    if (!folder) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Folder not found'
      });
    }
  }
  const legacyTemplateId = mapSecondaryIdToTemplateId(template.secondaryId);
  const finalEnvelopeTitle = override?.title || template.title;
  if (template.envelopeItems.length < 1) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'Template must have at least 1 envelope item'
    });
  }
  const settings = await getTeamSettings({
    userId,
    teamId
  });
  // Check that all the passed in recipient IDs can be associated with a template recipient.
  recipients.forEach(recipient => {
    const foundRecipient = template.recipients.find(templateRecipient => templateRecipient.id === recipient.id);
    if (!foundRecipient) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Recipient with ID ${recipient.id} not found in the template.`
      });
    }
  });
  const {
    documentAuthOption: templateAuthOptions
  } = extractDocumentAuthMethods({
    documentAuth: template.authOptions
  });
  const finalRecipients = template.recipients.map(templateRecipient => {
    const foundRecipient = recipients.find(recipient => recipient.id === templateRecipient.id);
    return {
      templateRecipientId: templateRecipient.id,
      fields: templateRecipient.fields,
      name: foundRecipient ? foundRecipient.name ?? '' : templateRecipient.name,
      email: foundRecipient ? foundRecipient.email : templateRecipient.email,
      role: templateRecipient.role,
      signingOrder: foundRecipient?.signingOrder ?? templateRecipient.signingOrder,
      authOptions: templateRecipient.authOptions,
      token: nanoid()
    };
  });
  const defaultRecipients = settings.defaultRecipients ? ZDefaultRecipientsSchema.parse(settings.defaultRecipients) : [];
  const defaultRecipientsFinal = defaultRecipients.map(recipient => {
    const authOptions = ZRecipientAuthOptionsSchema.parse({});
    return {
      templateRecipientId: -1,
      fields: [],
      name: recipient.name || recipient.email,
      email: recipient.email,
      role: recipient.role,
      signingOrder: null,
      authOptions: createRecipientAuthOptions({
        accessAuth: authOptions.accessAuth,
        actionAuth: authOptions.actionAuth
      }),
      token: nanoid()
    };
  });
  const allFinalRecipients = [...finalRecipients, ...defaultRecipientsFinal];
  // Key = original envelope item ID
  // Value = duplicated envelope item ID.
  const oldEnvelopeItemToNewEnvelopeItemIdMap = {};
  // Duplicate the envelope item data.
  // Note: This is duplicated in createDocumentFromDirectTemplate
  const envelopeItemsToCreate = await Promise.all(template.envelopeItems.map(async (item, i) => {
    let documentDataIdToDuplicate = item.documentDataId;
    const foundCustomDocumentData = customDocumentData.find(customDocumentDataItem => {
      // Handle empty envelopeItemId for backwards compatibility reasons.
      if (customDocumentDataItem.documentDataId && !customDocumentDataItem.envelopeItemId) {
        return true;
      }
      return customDocumentDataItem.envelopeItemId === item.id;
    });
    if (foundCustomDocumentData) {
      documentDataIdToDuplicate = foundCustomDocumentData.documentDataId;
    }
    const documentDataToDuplicate = await prismaWithReplicas.documentData.findFirst({
      where: {
        id: documentDataIdToDuplicate
      }
    });
    if (!documentDataToDuplicate) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Document data not found'
      });
    }
    let buffer = await getFileServerSide(documentDataToDuplicate);
    const titleToUse = item.title || finalEnvelopeTitle;
    if (formValues) {
      // eslint-disable-next-line require-atomic-updates
      buffer = await insertFormValuesInPdf({
        pdf: Buffer.from(buffer),
        formValues
      });
    }
    const duplicatedFile = await putNormalizedPdfFileServerSide({
      name: titleToUse,
      type: 'application/pdf',
      arrayBuffer: async () => Promise.resolve(buffer)
    });
    const newDocumentData = await prismaWithReplicas.documentData.create({
      data: {
        type: duplicatedFile.type,
        data: duplicatedFile.data,
        initialData: documentDataToDuplicate.data
      }
    });
    const newEnvelopeItemId = prefixedId('envelope_item');
    oldEnvelopeItemToNewEnvelopeItemIdMap[item.id] = newEnvelopeItemId;
    return {
      id: newEnvelopeItemId,
      title: titleToUse.endsWith('.pdf') ? titleToUse.slice(0, -4) : titleToUse,
      documentDataId: newDocumentData.id,
      order: item.order !== undefined ? item.order : i + 1
    };
  }));
  // Enforce the organisation document-creation limit before creating the document.
  await assertOrganisationRatesAndLimits({
    organisationId: callerTeam.organisationId,
    type: 'document',
    count: 1
  });
  const incrementedDocumentId = await incrementDocumentId();
  // Carry the template's level forward, coercing if the instance mode has
  // changed since the template was created. ZSignatureLevelSchema parses the
  // free-form TEXT column defensively. Resolved before meta extraction so
  // signingOrder picks up the TSP-appropriate default + assertion.
  const signatureLevel = resolveSignatureLevel({
    requested: ZSignatureLevelSchema.parse(template.signatureLevel),
    strict: false
  });
  const documentMeta = await prismaWithReplicas.documentMeta.create({
    data: extractDerivedDocumentMeta(settings, {
      subject: override?.subject || template.documentMeta?.subject,
      message: override?.message || template.documentMeta?.message,
      timezone: override?.timezone || template.documentMeta?.timezone,
      dateFormat: override?.dateFormat || template.documentMeta?.dateFormat,
      redirectUrl: override?.redirectUrl || template.documentMeta?.redirectUrl,
      distributionMethod: override?.distributionMethod || template.documentMeta?.distributionMethod,
      emailSettings: override?.emailSettings || template.documentMeta?.emailSettings,
      signingOrder: override?.signingOrder || template.documentMeta?.signingOrder,
      language: override?.language || template.documentMeta?.language || settings.documentLanguage,
      typedSignatureEnabled: override?.typedSignatureEnabled ?? template.documentMeta?.typedSignatureEnabled,
      uploadSignatureEnabled: override?.uploadSignatureEnabled ?? template.documentMeta?.uploadSignatureEnabled,
      drawSignatureEnabled: override?.drawSignatureEnabled ?? template.documentMeta?.drawSignatureEnabled,
      allowDictateNextSigner: override?.allowDictateNextSigner ?? template.documentMeta?.allowDictateNextSigner,
      envelopeExpirationPeriod: override?.envelopeExpirationPeriod ?? template.documentMeta?.envelopeExpirationPeriod
    }, signatureLevel)
  });
  const {
    envelope,
    createdEnvelope
  } = await prismaWithReplicas.$transaction(async tx => {
    const envelope = await tx.envelope.create({
      data: {
        id: prefixedId('envelope'),
        secondaryId: incrementedDocumentId.formattedDocumentId,
        type: EnvelopeType.DOCUMENT,
        internalVersion: template.internalVersion,
        signatureLevel,
        qrToken: prefixedId('qr'),
        source: DocumentSource.TEMPLATE,
        externalId: externalId || template.externalId,
        templateId: legacyTemplateId,
        // The template this envelope was created from.
        userId,
        folderId,
        teamId,
        title: finalEnvelopeTitle,
        envelopeItems: {
          createMany: {
            data: envelopeItemsToCreate
          }
        },
        authOptions: createDocumentAuthOptions({
          globalAccessAuth: templateAuthOptions.globalAccessAuth,
          globalActionAuth: templateAuthOptions.globalActionAuth
        }),
        visibility: template.visibility || settings.documentVisibility,
        useLegacyFieldInsertion: template.useLegacyFieldInsertion ?? false,
        documentMetaId: documentMeta.id,
        formValues: formValues ?? undefined,
        recipients: {
          createMany: {
            data: allFinalRecipients.map(recipient => {
              const authOptions = ZRecipientAuthOptionsSchema.parse(recipient?.authOptions);
              return {
                email: recipient.email,
                name: recipient.name,
                role: recipient.role,
                authOptions: createRecipientAuthOptions({
                  accessAuth: authOptions.accessAuth,
                  actionAuth: authOptions.actionAuth
                }),
                sendStatus: recipient.role === RecipientRole.CC ? SendStatus.SENT : SendStatus.NOT_SENT,
                signingStatus: recipient.role === RecipientRole.CC ? SigningStatus.SIGNED : SigningStatus.NOT_SIGNED,
                signingOrder: recipient.signingOrder,
                token: recipient.token
              };
            })
          }
        }
      },
      include: {
        recipients: {
          orderBy: {
            id: 'asc'
          }
        },
        envelopeItems: {
          select: {
            id: true
          }
        }
      }
    });
    let fieldsToCreate = [];
    // Get all template field IDs first so we can validate later
    const allTemplateFieldIds = finalRecipients.flatMap(recipient => recipient.fields.map(field => field.id));
    if (prefillFields?.length) {
      // Validate that all prefill field IDs exist in the template
      const invalidFieldIds = prefillFields.map(prefillField => prefillField.id).filter(id => !allTemplateFieldIds.includes(id));
      if (invalidFieldIds.length > 0) {
        throw new AppError(AppErrorCode.INVALID_BODY, {
          message: `The following field IDs do not exist in the template: ${invalidFieldIds.join(', ')}`
        });
      }
      // Validate that all prefill fields have the correct type
      for (const prefillField of prefillFields) {
        const templateField = finalRecipients.flatMap(recipient => recipient.fields).find(field => field.id === prefillField.id);
        if (!templateField) {
          // This should never happen due to the previous validation, but just in case
          throw new AppError(AppErrorCode.INVALID_BODY, {
            message: `Field with ID ${prefillField.id} not found in the template`
          });
        }
        const expectedType = templateField.type.toLowerCase();
        const actualType = prefillField.type;
        if (expectedType !== actualType) {
          throw new AppError(AppErrorCode.INVALID_BODY, {
            message: `Field type mismatch for field ${prefillField.id}: expected ${expectedType}, got ${actualType}`
          });
        }
      }
    }
    Object.values(allFinalRecipients).forEach(({
      token,
      fields
    }) => {
      const recipient = envelope.recipients.find(recipient => recipient.token === token);
      if (!recipient) {
        throw new Error('Recipient not found.');
      }
      fieldsToCreate = fieldsToCreate.concat(fields.map(field => {
        const prefillField = prefillFields?.find(value => value.id === field.id);
        const payload = {
          envelopeItemId: oldEnvelopeItemToNewEnvelopeItemIdMap[field.envelopeItemId],
          envelopeId: envelope.id,
          recipientId: recipient.id,
          type: field.type,
          page: field.page,
          positionX: field.positionX,
          positionY: field.positionY,
          width: field.width,
          height: field.height,
          customText: '',
          inserted: false,
          fieldMeta: field.fieldMeta
        };
        if (prefillField) {
          match(prefillField).with({
            type: 'date'
          }, selector => {
            if (!selector.value) {
              throw new AppError(AppErrorCode.INVALID_BODY, {
                message: `Date value is required for field ${field.id}`
              });
            }
            const date = new Date(selector.value);
            if (isNaN(date.getTime())) {
              throw new AppError(AppErrorCode.INVALID_BODY, {
                message: `Invalid date value for field ${field.id}: ${selector.value}`
              });
            }
            payload.customText = DateTime.fromJSDate(date).toFormat(template.documentMeta?.dateFormat ?? DEFAULT_DOCUMENT_DATE_FORMAT);
            payload.inserted = true;
          }).otherwise(selector => {
            payload.fieldMeta = getUpdatedFieldMeta(field, selector);
          });
        }
        return payload;
      }));
    });
    await tx.field.createMany({
      data: fieldsToCreate.map(field => ({
        ...field,
        fieldMeta: field.fieldMeta ? ZFieldMetaSchema.parse(field.fieldMeta) : undefined
      }))
    });
    await tx.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_CREATED,
        envelopeId: envelope.id,
        metadata: requestMetadata,
        data: {
          title: envelope.title,
          source: {
            type: DocumentSource.TEMPLATE,
            templateId: legacyTemplateId
          }
        }
      })
    });
    const templateAttachments = await tx.envelopeAttachment.findMany({
      where: {
        envelopeId: template.id
      }
    });
    const attachmentsToCreate = [...templateAttachments.map(attachment => ({
      envelopeId: envelope.id,
      type: attachment.type,
      label: attachment.label,
      data: attachment.data
    })), ...(attachments || []).map(attachment => ({
      envelopeId: envelope.id,
      type: attachment.type || 'link',
      label: attachment.label,
      data: attachment.data
    }))];
    if (attachmentsToCreate.length > 0) {
      await tx.envelopeAttachment.createMany({
        data: attachmentsToCreate
      });
    }
    const createdEnvelope = await tx.envelope.findFirst({
      where: {
        id: envelope.id
      },
      include: {
        documentMeta: true,
        recipients: true
      }
    });
    if (!createdEnvelope) {
      throw new Error('Document not found');
    }
    return {
      envelope,
      createdEnvelope
    };
  });
  // Trigger webhook outside the transaction to avoid holding the connection
  // open during network I/O.
  await Promise.allSettled([triggerWebhook({
    event: WebhookTriggerEvents.DOCUMENT_CREATED,
    data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(createdEnvelope)),
    userId,
    teamId
  }), triggerWebhook({
    event: WebhookTriggerEvents.TEMPLATE_USED,
    data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(createdEnvelope)),
    userId,
    teamId
  })]);
  return envelope;
};

export { createDocumentFromTemplate };
//# sourceMappingURL=create-document-from-template.js.map
