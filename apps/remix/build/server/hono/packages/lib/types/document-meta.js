import { VALID_DATE_FORMAT_VALUES } from '../constants/date-formats.js';
import { ZEnvelopeExpirationPeriod } from '../constants/envelope-expiration.js';
import { ZEnvelopeReminderSettings } from '../constants/envelope-reminder.js';
import { SUPPORTED_LANGUAGE_CODES } from '../constants/locales.js';
import { isValidRedirectUrl } from '../utils/is-valid-redirect-url.js';
import { zEmail } from '../utils/zod.js';
import { DocumentMetaSchema } from '../../prisma/generated/zod/modelSchema/DocumentMetaSchema.js';
import { DocumentDistributionMethod, DocumentSigningOrder } from '@prisma/client';
import { z } from 'zod';
import { ZDocumentEmailSettingsSchema } from './document-email.js';

/**
 * The full document response schema.
 *
 * Mainly used for returning a single document from the API.
 */
DocumentMetaSchema.pick({
  signingOrder: true,
  distributionMethod: true,
  id: true,
  subject: true,
  message: true,
  timezone: true,
  dateFormat: true,
  redirectUrl: true,
  typedSignatureEnabled: true,
  uploadSignatureEnabled: true,
  drawSignatureEnabled: true,
  language: true,
  emailSettings: true
});
/**
 * If you update this, you must also update the schema.prisma @default value for
 * - Template meta
 * - Document meta
 */
z.object({
  typedSignatureEnabled: z.boolean(),
  uploadSignatureEnabled: z.boolean(),
  drawnSignatureEnabled: z.boolean()
}).refine(data => {
  return data.typedSignatureEnabled || data.uploadSignatureEnabled || data.drawnSignatureEnabled;
}, {
  message: 
  /*i18n*/
  {
    id: "R2bpwe"
  }.id
});
const ZDocumentMetaTimezoneSchema = z.string().describe('The timezone to use for date fields and signing the document. Example Etc/UTC, Australia/Melbourne');
const ZDocumentMetaDateFormatSchema = z.enum(VALID_DATE_FORMAT_VALUES).describe('The date format to use for date fields and signing the document.');
const ZDocumentMetaRedirectUrlSchema = z.string().describe('The URL to which the recipient should be redirected after signing the document.').refine(value => value === undefined || value === '' || isValidRedirectUrl(value), {
  message: 'Please enter a valid URL, make sure you include http:// or https:// part of the url.'
});
const ZDocumentMetaLanguageSchema = z.enum(SUPPORTED_LANGUAGE_CODES).describe('The language to use for email communications with recipients.');
const ZDocumentMetaSubjectSchema = z.string().max(254).describe('The subject of the email that will be sent to the recipients.');
const ZDocumentMetaMessageSchema = z.string().max(5000).describe('The message of the email that will be sent to the recipients.');
const ZDocumentMetaDistributionMethodSchema = z.nativeEnum(DocumentDistributionMethod).describe('The distribution method to use when sending the document to the recipients.');
const ZDocumentMetaTypedSignatureEnabledSchema = z.boolean().describe('Whether to allow recipients to sign using a typed signature.');
const ZDocumentMetaDrawSignatureEnabledSchema = z.boolean().describe('Whether to allow recipients to sign using a draw signature.');
const ZDocumentMetaUploadSignatureEnabledSchema = z.boolean().describe('Whether to allow recipients to sign using an uploaded signature.');
/**
 * Note: Any updates to this will cause public API changes. You will need to update
 * all corresponding areas where this is used (some places that use this needs to pass
 * it through to another function).
 */
const ZDocumentMetaCreateSchema = z.object({
  subject: ZDocumentMetaSubjectSchema.optional(),
  message: ZDocumentMetaMessageSchema.optional(),
  timezone: ZDocumentMetaTimezoneSchema.optional(),
  dateFormat: ZDocumentMetaDateFormatSchema.optional(),
  distributionMethod: ZDocumentMetaDistributionMethodSchema.optional(),
  signingOrder: z.nativeEnum(DocumentSigningOrder).optional(),
  allowDictateNextSigner: z.boolean().optional(),
  redirectUrl: ZDocumentMetaRedirectUrlSchema.optional(),
  language: ZDocumentMetaLanguageSchema.optional(),
  typedSignatureEnabled: ZDocumentMetaTypedSignatureEnabledSchema.optional(),
  uploadSignatureEnabled: ZDocumentMetaUploadSignatureEnabledSchema.optional(),
  drawSignatureEnabled: ZDocumentMetaDrawSignatureEnabledSchema.optional(),
  emailId: z.string().nullish(),
  emailReplyTo: zEmail().nullish(),
  emailSettings: ZDocumentEmailSettingsSchema.nullish(),
  envelopeExpirationPeriod: ZEnvelopeExpirationPeriod.nullish(),
  reminderSettings: ZEnvelopeReminderSettings.nullish()
});
/**
 * Note: This is the same as the create schema for now since there are
 * no nullable values. Once there is we will need to update this properly.
 */
const ZDocumentMetaUpdateSchema = ZDocumentMetaCreateSchema;

export { ZDocumentMetaCreateSchema, ZDocumentMetaDateFormatSchema, ZDocumentMetaDistributionMethodSchema, ZDocumentMetaDrawSignatureEnabledSchema, ZDocumentMetaLanguageSchema, ZDocumentMetaMessageSchema, ZDocumentMetaRedirectUrlSchema, ZDocumentMetaSubjectSchema, ZDocumentMetaTimezoneSchema, ZDocumentMetaTypedSignatureEnabledSchema, ZDocumentMetaUpdateSchema, ZDocumentMetaUploadSignatureEnabledSchema };
//# sourceMappingURL=document-meta.js.map
