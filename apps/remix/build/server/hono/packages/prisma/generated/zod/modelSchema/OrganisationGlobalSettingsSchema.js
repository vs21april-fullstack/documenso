import { z } from 'zod';
import { DocumentVisibilitySchema } from '../inputTypeSchemas/DocumentVisibilitySchema.js';
import { ZDocumentEmailSettingsSchema } from '../../../../lib/types/document-email.js';
import { ZDefaultRecipientsSchema } from '../../../../lib/types/default-recipients.js';
import { ZEnvelopeExpirationPeriod } from '../../../../lib/constants/envelope-expiration.js';
import { ZEnvelopeReminderSettings } from '../../../../lib/constants/envelope-reminder.js';
import { ZCssVarsSchema } from '../../../../lib/types/css-vars.js';

/////////////////////////////////////////
// ORGANISATION GLOBAL SETTINGS SCHEMA
/////////////////////////////////////////
const OrganisationGlobalSettingsSchema = z.object({
  documentVisibility: DocumentVisibilitySchema,
  id: z.string(),
  documentLanguage: z.string(),
  includeSenderDetails: z.boolean(),
  includeSigningCertificate: z.boolean(),
  includeAuditLog: z.boolean(),
  documentTimezone: z.string().nullable(),
  documentDateFormat: z.string(),
  delegateDocumentOwnership: z.boolean(),
  typedSignatureEnabled: z.boolean(),
  uploadSignatureEnabled: z.boolean(),
  drawSignatureEnabled: z.boolean(),
  /**
   * [DefaultRecipient[]]
   */
  defaultRecipients: ZDefaultRecipientsSchema.nullable(),
  emailId: z.string().nullable(),
  emailReplyTo: z.string().nullable(),
  /**
   * [DocumentEmailSettings]
   */
  emailDocumentSettings: ZDocumentEmailSettingsSchema,
  brandingEnabled: z.boolean(),
  brandingLogo: z.string(),
  brandingUrl: z.string(),
  brandingCompanyDetails: z.string(),
  /**
   * [TCssVarsSchema]
   */
  brandingColors: ZCssVarsSchema.nullable(),
  brandingCss: z.string(),
  /**
   * [EnvelopeExpirationPeriod]
   */
  envelopeExpirationPeriod: ZEnvelopeExpirationPeriod.nullable(),
  /**
   * [EnvelopeReminderSettings]
   */
  reminderSettings: ZEnvelopeReminderSettings.nullable(),
  aiFeaturesEnabled: z.boolean()
});

export { OrganisationGlobalSettingsSchema, OrganisationGlobalSettingsSchema as default };
//# sourceMappingURL=OrganisationGlobalSettingsSchema.js.map
