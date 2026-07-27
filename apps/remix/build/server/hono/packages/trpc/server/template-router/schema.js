import { ZEnvelopeExpirationPeriod } from '../../../lib/constants/envelope-expiration.js';
import { ZDocumentSchema } from '../../../lib/types/document.js';
import { ZDocumentActionAuthTypesSchema, ZDocumentAccessAuthTypesSchema } from '../../../lib/types/document-auth.js';
import { ZDocumentEmailSettingsSchema } from '../../../lib/types/document-email.js';
import { ZDocumentFormValuesSchema } from '../../../lib/types/document-form-values.js';
import { ZDocumentMetaDrawSignatureEnabledSchema, ZDocumentMetaUploadSignatureEnabledSchema, ZDocumentMetaTypedSignatureEnabledSchema, ZDocumentMetaLanguageSchema, ZDocumentMetaRedirectUrlSchema, ZDocumentMetaDistributionMethodSchema, ZDocumentMetaDateFormatSchema, ZDocumentMetaTimezoneSchema, ZDocumentMetaMessageSchema, ZDocumentMetaSubjectSchema } from '../../../lib/types/document-meta.js';
import { ZEnvelopeSchema } from '../../../lib/types/envelope.js';
import { ZEnvelopeAttachmentTypeSchema } from '../../../lib/types/envelope-attachment.js';
import { ZFieldMetaPrefillFieldsSchema } from '../../../lib/types/field-meta.js';
import { ZRecipientEmailSchema } from '../../../lib/types/recipient.js';
import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { ZTemplateSchema, ZTemplateManySchema, ZTemplateLiteSchema } from '../../../lib/types/template.js';
import { zEmail } from '../../../lib/utils/zod.js';
import { LegacyTemplateDirectLinkSchema } from '../../../prisma/types/template-legacy-schema.js';
import { ZDocumentExternalIdSchema } from '../document-router/schema.js';
import { DocumentSigningOrder, TemplateType, DocumentVisibility } from '@prisma/client';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { zodFormData, zfdFile } from '../../utils/zod-form-data.js';
import { ZSignFieldWithTokenMutationSchema } from '../field-router/schema.js';

const MAX_TEMPLATE_PUBLIC_TITLE_LENGTH = 50;
const MAX_TEMPLATE_PUBLIC_DESCRIPTION_LENGTH = 256;
const ZTemplateTitleSchema = z.string().trim().min(1).max(255).describe('The title of the document.');
const ZTemplatePublicTitleSchema = z.string().trim().min(1).max(MAX_TEMPLATE_PUBLIC_TITLE_LENGTH).describe('The title of the template that will be displayed to the public. Only applicable for public templates.');
const ZTemplatePublicDescriptionSchema = z.string().trim().min(1).max(MAX_TEMPLATE_PUBLIC_DESCRIPTION_LENGTH).describe('The description of the template that will be displayed to the public. Only applicable for public templates.');
const ZTemplateMetaUpsertSchema = z.object({
  subject: ZDocumentMetaSubjectSchema.optional(),
  message: ZDocumentMetaMessageSchema.optional(),
  timezone: ZDocumentMetaTimezoneSchema.optional(),
  dateFormat: ZDocumentMetaDateFormatSchema.optional(),
  distributionMethod: ZDocumentMetaDistributionMethodSchema.optional(),
  emailId: z.string().nullish(),
  emailReplyTo: zEmail().nullish(),
  emailSettings: ZDocumentEmailSettingsSchema.optional(),
  redirectUrl: ZDocumentMetaRedirectUrlSchema.optional(),
  language: ZDocumentMetaLanguageSchema.optional(),
  typedSignatureEnabled: ZDocumentMetaTypedSignatureEnabledSchema.optional(),
  uploadSignatureEnabled: ZDocumentMetaUploadSignatureEnabledSchema.optional(),
  drawSignatureEnabled: ZDocumentMetaDrawSignatureEnabledSchema.optional(),
  signingOrder: z.nativeEnum(DocumentSigningOrder).optional(),
  allowDictateNextSigner: z.boolean().optional()
});
const ZCreateDocumentFromDirectTemplateRequestSchema = z.object({
  directRecipientName: z.string().max(255).optional(),
  directRecipientEmail: zEmail().max(254),
  directTemplateToken: z.string().min(1),
  directTemplateExternalId: z.string().optional(),
  signedFieldValues: z.array(ZSignFieldWithTokenMutationSchema),
  templateUpdatedAt: z.date(),
  nextSigner: z.object({
    email: zEmail().max(254),
    name: z.string().min(1).max(255)
  }).optional()
});
const ZCreateDocumentFromTemplateRequestSchema = z.object({
  templateId: z.number(),
  externalId: ZDocumentExternalIdSchema.optional(),
  recipients: z.array(z.object({
    id: z.number().describe('The ID of the recipient in the template.'),
    email: ZRecipientEmailSchema,
    name: z.string().max(255).optional()
  })).describe('The information of the recipients to create the document with.'),
  distributeDocument: z.boolean().describe('Whether to create the document as pending and distribute it to recipients.').optional(),
  customDocumentDataId: z.string().describe('[DEPRECATED] - Use customDocumentData instead. The data ID of an alternative PDF to use when creating the document. If not provided, the PDF attached to the template will be used.').optional(),
  customDocumentData: z.array(z.object({
    documentDataId: z.string(),
    envelopeItemId: z.string()
  })).describe('The data IDs of alternative PDFs to use when creating the document. If not provided, the PDF attached to the template will be used.').optional(),
  folderId: z.string().describe('The ID of the folder to create the document in. If not provided, the document will be created in the root folder.').optional(),
  prefillFields: z.array(ZFieldMetaPrefillFieldsSchema).describe('The fields to prefill on the document before sending it out. Useful when you want to create a document from an existing template and pre-fill the fields with specific values.').optional(),
  override: z.object({
    title: z.string().min(1).max(255).optional(),
    subject: ZDocumentMetaSubjectSchema.optional(),
    message: ZDocumentMetaMessageSchema.optional(),
    timezone: ZDocumentMetaTimezoneSchema.optional(),
    dateFormat: ZDocumentMetaDateFormatSchema.optional(),
    redirectUrl: ZDocumentMetaRedirectUrlSchema.optional(),
    distributionMethod: ZDocumentMetaDistributionMethodSchema.optional(),
    emailSettings: ZDocumentEmailSettingsSchema.optional(),
    language: ZDocumentMetaLanguageSchema.optional(),
    typedSignatureEnabled: ZDocumentMetaTypedSignatureEnabledSchema.optional(),
    uploadSignatureEnabled: ZDocumentMetaUploadSignatureEnabledSchema.optional(),
    drawSignatureEnabled: ZDocumentMetaDrawSignatureEnabledSchema.optional(),
    allowDictateNextSigner: z.boolean().optional(),
    envelopeExpirationPeriod: ZEnvelopeExpirationPeriod.nullish()
  }).describe('Override values from the template for the created document.').optional(),
  attachments: z.array(z.object({
    label: z.string().min(1, 'Label is required'),
    data: z.string().url('Must be a valid URL'),
    type: ZEnvelopeAttachmentTypeSchema.optional().default('link')
  })).optional(),
  formValues: ZDocumentFormValuesSchema.optional()
});
const ZCreateDocumentFromTemplateResponseSchema = ZDocumentSchema;
const ZDuplicateTemplateMutationSchema = z.object({
  templateId: z.number()
});
const ZDuplicateTemplateResponseSchema = ZTemplateLiteSchema;
const ZCreateTemplateDirectLinkRequestSchema = z.object({
  templateId: z.number(),
  directRecipientId: z.number().describe('The of the recipient in the current template to transform into the primary recipient when the template is used.').optional()
});
const GenericDirectLinkResponseSchema = LegacyTemplateDirectLinkSchema.pick({
  id: true,
  token: true,
  createdAt: true,
  enabled: true,
  directTemplateRecipientId: true,
  envelopeId: true,
  templateId: true
});
const ZCreateTemplateDirectLinkResponseSchema = GenericDirectLinkResponseSchema;
const ZDeleteTemplateDirectLinkRequestSchema = z.object({
  templateId: z.number()
});
const ZToggleTemplateDirectLinkRequestSchema = z.object({
  templateId: z.number(),
  enabled: z.boolean()
});
const ZToggleTemplateDirectLinkResponseSchema = GenericDirectLinkResponseSchema;
const ZDeleteTemplateMutationSchema = z.object({
  templateId: z.number()
});
/**
 * Note: This is the same between V1 and V2. Be careful when updating this schema and think of the consequences.
 */
const ZCreateTemplateV2RequestSchema = z.object({
  title: ZTemplateTitleSchema,
  folderId: z.string().optional(),
  externalId: z.string().nullish(),
  visibility: z.nativeEnum(DocumentVisibility).optional(),
  globalAccessAuth: z.array(ZDocumentAccessAuthTypesSchema).optional().default([]),
  globalActionAuth: z.array(ZDocumentActionAuthTypesSchema).optional().default([]),
  publicTitle: ZTemplatePublicTitleSchema.optional(),
  publicDescription: ZTemplatePublicDescriptionSchema.optional(),
  type: z.nativeEnum(TemplateType).optional(),
  meta: ZTemplateMetaUpsertSchema.optional(),
  attachments: z.array(z.object({
    label: z.string().min(1, 'Label is required'),
    data: z.string().url('Must be a valid URL'),
    type: ZEnvelopeAttachmentTypeSchema.optional().default('link')
  })).optional()
});
/**
 * Note: This is the same between V1 and V2. Be careful when updating this schema and think of the consequences.
 */
const ZCreateTemplateV2ResponseSchema = z.object({
  template: ZTemplateSchema,
  uploadUrl: z.string().min(1)
});
const ZCreateTemplateResponseSchema = z.object({
  envelopeId: z.string(),
  id: z.number()
});
const ZCreateTemplatePayloadSchema = ZCreateTemplateV2RequestSchema;
const ZCreateTemplateMutationSchema = zodFormData({
  payload: zfd.json(ZCreateTemplatePayloadSchema),
  file: zfdFile()
});
const ZUpdateTemplateRequestSchema = z.object({
  templateId: z.number(),
  data: z.object({
    title: ZTemplateTitleSchema.optional(),
    externalId: z.string().nullish(),
    visibility: z.nativeEnum(DocumentVisibility).optional(),
    globalAccessAuth: z.array(ZDocumentAccessAuthTypesSchema).optional().default([]),
    globalActionAuth: z.array(ZDocumentActionAuthTypesSchema).optional().default([]),
    publicTitle: ZTemplatePublicTitleSchema.optional(),
    publicDescription: ZTemplatePublicDescriptionSchema.optional(),
    type: z.nativeEnum(TemplateType).optional(),
    useLegacyFieldInsertion: z.boolean().optional(),
    folderId: z.string().nullish()
  }).optional(),
  meta: ZTemplateMetaUpsertSchema.optional()
});
const ZUpdateTemplateResponseSchema = ZTemplateLiteSchema;
const ZFindTemplatesRequestSchema = ZFindSearchParamsSchema.extend({
  type: z.nativeEnum(TemplateType).describe('Filter templates by type.').optional(),
  folderId: z.string().describe('The ID of the folder to filter templates by.').optional()
});
const ZFindOrganisationTemplatesRequestSchema = ZFindSearchParamsSchema;
const ZFindTemplatesResponseSchema = ZFindResultResponse.extend({
  data: ZTemplateManySchema.array()
});
const ZGetTemplateByIdRequestSchema = z.object({
  templateId: z.number()
});
const ZGetTemplateByIdResponseSchema = ZTemplateSchema;
const ZGetOrganisationTemplateByIdRequestSchema = z.object({
  envelopeId: z.string()
});
const ZGetOrganisationTemplateByIdResponseSchema = ZEnvelopeSchema;
const ZBulkSendTemplateMutationSchema = z.object({
  templateId: z.number(),
  teamId: z.number(),
  csv: z.string().min(1),
  sendImmediately: z.boolean()
});

export { MAX_TEMPLATE_PUBLIC_DESCRIPTION_LENGTH, MAX_TEMPLATE_PUBLIC_TITLE_LENGTH, ZBulkSendTemplateMutationSchema, ZCreateDocumentFromDirectTemplateRequestSchema, ZCreateDocumentFromTemplateRequestSchema, ZCreateDocumentFromTemplateResponseSchema, ZCreateTemplateDirectLinkRequestSchema, ZCreateTemplateDirectLinkResponseSchema, ZCreateTemplateMutationSchema, ZCreateTemplatePayloadSchema, ZCreateTemplateResponseSchema, ZCreateTemplateV2RequestSchema, ZCreateTemplateV2ResponseSchema, ZDeleteTemplateDirectLinkRequestSchema, ZDeleteTemplateMutationSchema, ZDuplicateTemplateMutationSchema, ZDuplicateTemplateResponseSchema, ZFindOrganisationTemplatesRequestSchema, ZFindTemplatesRequestSchema, ZFindTemplatesResponseSchema, ZGetOrganisationTemplateByIdRequestSchema, ZGetOrganisationTemplateByIdResponseSchema, ZGetTemplateByIdRequestSchema, ZGetTemplateByIdResponseSchema, ZTemplateMetaUpsertSchema, ZTemplatePublicDescriptionSchema, ZTemplatePublicTitleSchema, ZTemplateTitleSchema, ZToggleTemplateDirectLinkRequestSchema, ZToggleTemplateDirectLinkResponseSchema, ZUpdateTemplateRequestSchema, ZUpdateTemplateResponseSchema };
//# sourceMappingURL=schema.js.map
