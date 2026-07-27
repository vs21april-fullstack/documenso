import { ZDocumentEmailSettingsSchema } from '../../../lib/types/document-email.js';
import { ZDocumentMetaUploadSignatureEnabledSchema, ZDocumentMetaDrawSignatureEnabledSchema, ZDocumentMetaTypedSignatureEnabledSchema, ZDocumentMetaLanguageSchema, ZDocumentMetaRedirectUrlSchema, ZDocumentMetaDistributionMethodSchema, ZDocumentMetaDateFormatSchema, ZDocumentMetaTimezoneSchema, ZDocumentMetaMessageSchema, ZDocumentMetaSubjectSchema } from '../../../lib/types/document-meta.js';
import { ZFieldHeightSchema, ZFieldWidthSchema, ZFieldPageYSchema, ZFieldPageXSchema, ZFieldPageNumberSchema } from '../../../lib/types/field.js';
import { ZFieldAndMetaSchema } from '../../../lib/types/field-meta.js';
import { zEmail } from '../../../lib/utils/zod.js';
import { DocumentSigningOrder, RecipientRole } from '../../../prisma/generated/types.js';
import { z } from 'zod';
import { ZDocumentTitleSchema, ZDocumentExternalIdSchema } from '../document-router/schema.js';

const ZUpdateEmbeddingDocumentRequestSchema = z.object({
  documentId: z.number(),
  title: ZDocumentTitleSchema,
  externalId: ZDocumentExternalIdSchema.optional(),
  recipients: z.array(z.object({
    id: z.number().optional(),
    email: zEmail(),
    name: z.string(),
    role: z.nativeEnum(RecipientRole),
    signingOrder: z.number().optional(),
    // We have an any cast so any changes here you need to update it in the embeding document edit page
    // Search: "map<any>" to find it
    fields: ZFieldAndMetaSchema.and(z.object({
      id: z.number().optional(),
      pageNumber: ZFieldPageNumberSchema,
      pageX: ZFieldPageXSchema,
      pageY: ZFieldPageYSchema,
      width: ZFieldWidthSchema,
      height: ZFieldHeightSchema,
      envelopeItemId: z.string()
    })).array().optional()
  })),
  meta: z.object({
    subject: ZDocumentMetaSubjectSchema.optional(),
    message: ZDocumentMetaMessageSchema.optional(),
    timezone: ZDocumentMetaTimezoneSchema.optional(),
    dateFormat: ZDocumentMetaDateFormatSchema.optional(),
    distributionMethod: ZDocumentMetaDistributionMethodSchema.optional(),
    signingOrder: z.nativeEnum(DocumentSigningOrder).optional(),
    redirectUrl: ZDocumentMetaRedirectUrlSchema.optional(),
    language: ZDocumentMetaLanguageSchema.optional(),
    typedSignatureEnabled: ZDocumentMetaTypedSignatureEnabledSchema.optional(),
    drawSignatureEnabled: ZDocumentMetaDrawSignatureEnabledSchema.optional(),
    uploadSignatureEnabled: ZDocumentMetaUploadSignatureEnabledSchema.optional(),
    emailSettings: ZDocumentEmailSettingsSchema.optional()
  }).optional()
});
const ZUpdateEmbeddingDocumentResponseSchema = z.object({
  documentId: z.number()
});

export { ZUpdateEmbeddingDocumentRequestSchema, ZUpdateEmbeddingDocumentResponseSchema };
//# sourceMappingURL=update-embedding-document.types.js.map
