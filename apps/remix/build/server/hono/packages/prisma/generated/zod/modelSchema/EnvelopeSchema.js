import { z } from 'zod';
import { EnvelopeTypeSchema } from '../inputTypeSchemas/EnvelopeTypeSchema.js';
import { DocumentStatusSchema } from '../inputTypeSchemas/DocumentStatusSchema.js';
import { DocumentSourceSchema } from '../inputTypeSchemas/DocumentSourceSchema.js';
import { DocumentVisibilitySchema } from '../inputTypeSchemas/DocumentVisibilitySchema.js';
import { TemplateTypeSchema } from '../inputTypeSchemas/TemplateTypeSchema.js';
import { ZDocumentAuthOptionsSchema } from '../../../../lib/types/document-auth.js';
import { ZDocumentFormValuesSchema } from '../../../../lib/types/document-form-values.js';
import { ZSignatureLevelSchema } from '../../../../lib/types/signature-level.js';

/////////////////////////////////////////
// ENVELOPE SCHEMA
/////////////////////////////////////////
const EnvelopeSchema = z.object({
  type: EnvelopeTypeSchema,
  status: DocumentStatusSchema,
  source: DocumentSourceSchema,
  visibility: DocumentVisibilitySchema,
  templateType: TemplateTypeSchema,
  id: z.string(),
  secondaryId: z.string(),
  externalId: z.string().describe("A custom external ID you can use to identify the document.").nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  completedAt: z.coerce.date().nullable(),
  deletedAt: z.coerce.date().nullable(),
  title: z.string(),
  qrToken: z.string().describe("The token for viewing the document using the QR code on the certificate.").nullable(),
  /**
   * [SignatureLevel]
   */
  signatureLevel: ZSignatureLevelSchema,
  internalVersion: z.number(),
  useLegacyFieldInsertion: z.boolean(),
  /**
   * [DocumentAuthOptions]
   */
  authOptions: ZDocumentAuthOptionsSchema.nullable(),
  /**
   * [DocumentFormValues]
   */
  formValues: ZDocumentFormValuesSchema.nullable(),
  publicTitle: z.string(),
  publicDescription: z.string(),
  templateId: z.number().nullable(),
  userId: z.number().describe("The ID of the user that created this document."),
  teamId: z.number(),
  folderId: z.string().nullable(),
  documentMetaId: z.string()
});

export { EnvelopeSchema };
//# sourceMappingURL=EnvelopeSchema.js.map
