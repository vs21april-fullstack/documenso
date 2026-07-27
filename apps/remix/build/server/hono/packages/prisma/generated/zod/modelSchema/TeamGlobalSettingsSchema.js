import { z } from 'zod';
import { DocumentVisibilitySchema } from '../inputTypeSchemas/DocumentVisibilitySchema.js';
import { ZDocumentEmailSettingsSchema } from '../../../../lib/types/document-email.js';
import { ZDefaultRecipientsSchema } from '../../../../lib/types/default-recipients.js';
import { ZEnvelopeExpirationPeriod } from '../../../../lib/constants/envelope-expiration.js';
import { ZEnvelopeReminderSettings } from '../../../../lib/constants/envelope-reminder.js';
import { ZCssVarsSchema } from '../../../../lib/types/css-vars.js';

/////////////////////////////////////////
// TEAM GLOBAL SETTINGS SCHEMA
/////////////////////////////////////////
const TeamGlobalSettingsSchema = z.object({
  documentVisibility: DocumentVisibilitySchema.nullable(),
  id: z.string(),
  documentLanguage: z.string().nullable(),
  documentTimezone: z.string().nullable(),
  documentDateFormat: z.string().nullable(),
  delegateDocumentOwnership: z.boolean().nullable(),
  includeSenderDetails: z.boolean().nullable(),
  includeSigningCertificate: z.boolean().nullable(),
  includeAuditLog: z.boolean().nullable(),
  typedSignatureEnabled: z.boolean().nullable(),
  uploadSignatureEnabled: z.boolean().nullable(),
  drawSignatureEnabled: z.boolean().nullable(),
  /**
   * [DefaultRecipient[]]
   */
  defaultRecipients: ZDefaultRecipientsSchema.nullable(),
  emailId: z.string().nullable(),
  emailReplyTo: z.string().nullable(),
  /**
   * [DocumentEmailSettingsNullable]
   */
  emailDocumentSettings: ZDocumentEmailSettingsSchema.nullable(),
  brandingEnabled: z.boolean().nullable(),
  brandingLogo: z.string().nullable(),
  brandingUrl: z.string().nullable(),
  brandingCompanyDetails: z.string().nullable(),
  /**
   * [TCssVarsSchema]
   */
  brandingColors: ZCssVarsSchema.nullable(),
  brandingCss: z.string().nullable(),
  /**
   * [EnvelopeExpirationPeriod]
   */
  envelopeExpirationPeriod: ZEnvelopeExpirationPeriod.nullable(),
  /**
   * [EnvelopeReminderSettings]
   */
  reminderSettings: ZEnvelopeReminderSettings.nullable(),
  aiFeaturesEnabled: z.boolean().nullable()
});

export { TeamGlobalSettingsSchema, TeamGlobalSettingsSchema as default };
//# sourceMappingURL=TeamGlobalSettingsSchema.js.map
