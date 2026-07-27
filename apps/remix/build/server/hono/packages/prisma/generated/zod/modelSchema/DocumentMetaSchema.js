import { z } from 'zod';
import { DocumentSigningOrderSchema } from '../inputTypeSchemas/DocumentSigningOrderSchema.js';
import { DocumentDistributionMethodSchema } from '../inputTypeSchemas/DocumentDistributionMethodSchema.js';
import { ZDocumentEmailSettingsSchema } from '../../../../lib/types/document-email.js';
import { ZEnvelopeExpirationPeriod } from '../../../../lib/constants/envelope-expiration.js';
import { ZEnvelopeReminderSettings } from '../../../../lib/constants/envelope-reminder.js';

/////////////////////////////////////////
// DOCUMENT META SCHEMA
/////////////////////////////////////////
const DocumentMetaSchema = z.object({
  signingOrder: DocumentSigningOrderSchema,
  distributionMethod: DocumentDistributionMethodSchema,
  id: z.string(),
  subject: z.string().nullable(),
  message: z.string().nullable(),
  timezone: z.string().nullable(),
  dateFormat: z.string().nullable(),
  redirectUrl: z.string().nullable(),
  allowDictateNextSigner: z.boolean(),
  typedSignatureEnabled: z.boolean(),
  uploadSignatureEnabled: z.boolean(),
  drawSignatureEnabled: z.boolean(),
  language: z.string(),
  /**
   * [DocumentEmailSettings]
   */
  emailSettings: ZDocumentEmailSettingsSchema.nullable(),
  emailReplyTo: z.string().nullable(),
  emailId: z.string().nullable(),
  /**
   * [EnvelopeExpirationPeriod]
   */
  envelopeExpirationPeriod: ZEnvelopeExpirationPeriod.nullable(),
  /**
   * [EnvelopeReminderSettings]
   */
  reminderSettings: ZEnvelopeReminderSettings.nullable()
});

export { DocumentMetaSchema, DocumentMetaSchema as default };
//# sourceMappingURL=DocumentMetaSchema.js.map
