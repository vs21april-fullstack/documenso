import { BRANDING_CSS_MAX_LENGTH } from '../../../lib/constants/branding.js';
import { ZEnvelopeExpirationPeriod } from '../../../lib/constants/envelope-expiration.js';
import { ZEnvelopeReminderSettings } from '../../../lib/constants/envelope-reminder.js';
import { SUPPORTED_LANGUAGE_CODES } from '../../../lib/constants/locales.js';
import { ZCssVarsSchema } from '../../../lib/types/css-vars.js';
import { ZDefaultRecipientsSchema } from '../../../lib/types/default-recipients.js';
import { ZDocumentEmailSettingsSchema } from '../../../lib/types/document-email.js';
import { ZDocumentMetaDateFormatSchema, ZDocumentMetaTimezoneSchema } from '../../../lib/types/document-meta.js';
import { DocumentVisibility } from '../../../lib/types/document-visibility.js';
import { ZSanitizeBrandingCssWarningSchema } from '../../../lib/utils/sanitize-branding-css.js';
import { zEmail } from '../../../lib/utils/zod.js';
import { z } from 'zod';

/**
 * Null = Inherit from organisation.
 * Undefined = Do nothing
 */
const ZUpdateTeamSettingsRequestSchema = z.object({
  teamId: z.number(),
  data: z.object({
    // Document related settings.
    documentVisibility: z.nativeEnum(DocumentVisibility).nullish(),
    documentLanguage: z.enum(SUPPORTED_LANGUAGE_CODES).nullish(),
    documentTimezone: ZDocumentMetaTimezoneSchema.nullish(),
    documentDateFormat: ZDocumentMetaDateFormatSchema.nullish(),
    includeSenderDetails: z.boolean().nullish(),
    includeSigningCertificate: z.boolean().nullish(),
    includeAuditLog: z.boolean().nullish(),
    typedSignatureEnabled: z.boolean().nullish(),
    uploadSignatureEnabled: z.boolean().nullish(),
    drawSignatureEnabled: z.boolean().nullish(),
    delegateDocumentOwnership: z.boolean().nullish(),
    envelopeExpirationPeriod: ZEnvelopeExpirationPeriod.nullish(),
    reminderSettings: ZEnvelopeReminderSettings.nullish(),
    // Branding related settings.
    brandingEnabled: z.boolean().nullish(),
    brandingUrl: z.string().nullish(),
    brandingCompanyDetails: z.string().nullish(),
    brandingColors: ZCssVarsSchema.nullish(),
    brandingCss: z.string().max(BRANDING_CSS_MAX_LENGTH).nullish(),
    // Email related settings.
    emailId: z.string().nullish(),
    emailReplyTo: zEmail().nullish(),
    // emailReplyToName: z.string().nullish(),
    emailDocumentSettings: ZDocumentEmailSettingsSchema.nullish(),
    // Default recipients settings.
    defaultRecipients: ZDefaultRecipientsSchema.nullish(),
    // AI features settings.
    aiFeaturesEnabled: z.boolean().nullish()
  })
});
const ZUpdateTeamSettingsResponseSchema = z.object({
  cssWarnings: z.array(ZSanitizeBrandingCssWarningSchema).optional()
});

export { ZUpdateTeamSettingsRequestSchema, ZUpdateTeamSettingsResponseSchema };
//# sourceMappingURL=update-team-settings.types.js.map
