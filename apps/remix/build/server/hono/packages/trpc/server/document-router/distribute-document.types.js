import { ZDocumentLiteSchema } from '../../../lib/types/document.js';
import { ZDocumentEmailSettingsSchema } from '../../../lib/types/document-email.js';
import { ZDocumentMetaLanguageSchema, ZDocumentMetaRedirectUrlSchema, ZDocumentMetaDistributionMethodSchema, ZDocumentMetaDateFormatSchema, ZDocumentMetaTimezoneSchema, ZDocumentMetaMessageSchema, ZDocumentMetaSubjectSchema } from '../../../lib/types/document-meta.js';
import { zEmail } from '../../../lib/utils/zod.js';
import { z } from 'zod';

const distributeDocumentMeta = {
  openapi: {
    method: 'POST',
    path: '/document/distribute',
    summary: 'Distribute document',
    description: 'Send the document out to recipients based on your distribution method',
    tags: ['Document']
  }
};
const ZDistributeDocumentRequestSchema = z.object({
  documentId: z.number().describe('The ID of the document to send.'),
  meta: z.object({
    subject: ZDocumentMetaSubjectSchema.optional(),
    message: ZDocumentMetaMessageSchema.optional(),
    timezone: ZDocumentMetaTimezoneSchema.optional(),
    dateFormat: ZDocumentMetaDateFormatSchema.optional(),
    distributionMethod: ZDocumentMetaDistributionMethodSchema.optional(),
    redirectUrl: ZDocumentMetaRedirectUrlSchema.optional(),
    language: ZDocumentMetaLanguageSchema.optional(),
    emailId: z.string().nullish(),
    emailReplyTo: zEmail().nullish(),
    emailSettings: ZDocumentEmailSettingsSchema.optional()
  }).optional()
});
const ZDistributeDocumentResponseSchema = ZDocumentLiteSchema;

export { ZDistributeDocumentRequestSchema, ZDistributeDocumentResponseSchema, distributeDocumentMeta };
//# sourceMappingURL=distribute-document.types.js.map
