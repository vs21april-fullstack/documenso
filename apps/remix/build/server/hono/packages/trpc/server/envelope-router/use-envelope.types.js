import { ZEnvelopeExpirationPeriod } from '../../../lib/constants/envelope-expiration.js';
import { ZDocumentEmailSettingsSchema } from '../../../lib/types/document-email.js';
import { ZDocumentFormValuesSchema } from '../../../lib/types/document-form-values.js';
import { ZDocumentMetaDrawSignatureEnabledSchema, ZDocumentMetaUploadSignatureEnabledSchema, ZDocumentMetaTypedSignatureEnabledSchema, ZDocumentMetaLanguageSchema, ZDocumentMetaDistributionMethodSchema, ZDocumentMetaRedirectUrlSchema, ZDocumentMetaDateFormatSchema, ZDocumentMetaTimezoneSchema, ZDocumentMetaMessageSchema, ZDocumentMetaSubjectSchema } from '../../../lib/types/document-meta.js';
import { ZEnvelopeAttachmentTypeSchema } from '../../../lib/types/envelope-attachment.js';
import { ZFieldMetaPrefillFieldsSchema } from '../../../lib/types/field-meta.js';
import { ZRecipientEmailSchema } from '../../../lib/types/recipient.js';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { zodFormData, zfdFile } from '../../utils/zod-form-data.js';
import { ZRecipientWithSigningUrlSchema } from './schema.js';

const useEnvelopeMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/use',
    contentTypes: ['multipart/form-data'],
    summary: 'Use envelope',
    description: 'Create a document envelope from a template envelope. Upload custom files to replace the template PDFs and map them to specific envelope items using identifiers.',
    tags: ['Envelope']
  }
};
const ZUseEnvelopePayloadSchema = z.object({
  envelopeId: z.string().describe('The ID of the template envelope to use.'),
  externalId: z.string().optional().describe('External ID for the created document.'),
  recipients: z.array(z.object({
    id: z.number().describe('The ID of the recipient in the template.'),
    email: ZRecipientEmailSchema,
    name: z.string().max(255).optional(),
    signingOrder: z.number().optional()
  })).describe('The information of the recipients to create the document with.').optional(),
  distributeDocument: z.boolean().describe('Whether to create the document as pending and distribute it to recipients.').optional(),
  customDocumentData: z.array(z.object({
    identifier: z.union([z.string(), z.number()]).describe('Either the filename or the index of the file that was uploaded. This maps to which envelope item in the template should use this file.'),
    envelopeItemId: z.string().describe('The envelope item ID from the template to replace with the uploaded file.')
  })).describe('Map uploaded files to specific envelope items in the template. If not provided, files will be ignored.').optional(),
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
const ZUseEnvelopeRequestSchema = zodFormData({
  payload: zfd.json(ZUseEnvelopePayloadSchema),
  files: zfd.repeatableOfType(zfdFile()).optional()
});
const ZUseEnvelopeResponseSchema = z.object({
  id: z.string().describe('The ID of the created envelope.'),
  recipients: ZRecipientWithSigningUrlSchema.array()
});

export { ZUseEnvelopePayloadSchema, ZUseEnvelopeRequestSchema, ZUseEnvelopeResponseSchema, useEnvelopeMeta };
//# sourceMappingURL=use-envelope.types.js.map
