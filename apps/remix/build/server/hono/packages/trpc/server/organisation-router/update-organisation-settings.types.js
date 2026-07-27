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

const ZUpdateOrganisationSettingsRequestSchema = z.object({
  organisationId: z.string(),
  data: z.object({
    // Document related settings.
    documentVisibility: z.nativeEnum(DocumentVisibility).optional(),
    documentLanguage: z.enum(SUPPORTED_LANGUAGE_CODES).optional(),
    documentTimezone: ZDocumentMetaTimezoneSchema.nullish(),
    // Null means local timezone.
    documentDateFormat: ZDocumentMetaDateFormatSchema.optional(),
    includeSenderDetails: z.boolean().optional(),
    includeSigningCertificate: z.boolean().optional(),
    includeAuditLog: z.boolean().optional(),
    typedSignatureEnabled: z.boolean().optional(),
    uploadSignatureEnabled: z.boolean().optional(),
    drawSignatureEnabled: z.boolean().optional(),
    defaultRecipients: ZDefaultRecipientsSchema.nullish(),
    delegateDocumentOwnership: z.boolean().nullish(),
    envelopeExpirationPeriod: ZEnvelopeExpirationPeriod.optional(),
    reminderSettings: ZEnvelopeReminderSettings.optional(),
    // Branding related settings.
    brandingEnabled: z.boolean().optional(),
    brandingUrl: z.string().optional(),
    brandingCompanyDetails: z.string().optional(),
    brandingColors: ZCssVarsSchema.nullish(),
    brandingCss: z.string().max(BRANDING_CSS_MAX_LENGTH).optional(),
    // Email related settings.
    emailId: z.string().nullish(),
    emailReplyTo: zEmail().nullish(),
    // emailReplyToName: z.string().optional(),
    emailDocumentSettings: ZDocumentEmailSettingsSchema.optional(),
    // AI features settings.
    aiFeaturesEnabled: z.boolean().optional()
  })
});
const ZUpdateOrganisationSettingsResponseSchema = z.object({
  cssWarnings: z.array(ZSanitizeBrandingCssWarningSchema).optional()
});

export { ZUpdateOrganisationSettingsRequestSchema, ZUpdateOrganisationSettingsResponseSchema };
//# sourceMappingURL=update-organisation-settings.types.js.map
