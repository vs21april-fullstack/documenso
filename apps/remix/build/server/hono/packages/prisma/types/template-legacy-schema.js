import { ZDocumentAuthOptionsSchema } from '../../lib/types/document-auth.js';
import { TemplateType } from '@prisma/client';
import { z } from 'zod';
import { DocumentVisibilitySchema } from '../generated/zod/inputTypeSchemas/DocumentVisibilitySchema.js';
import { TemplateDirectLinkSchema } from '../generated/zod/modelSchema/TemplateDirectLinkSchema.js';

/**
 * Legacy Template schema to confirm backwards API compatibility since
 * we removed the "Template" prisma schema model.
 */
const TemplateTypeSchema = z.nativeEnum(TemplateType);
const TemplateSchema = z.object({
  type: TemplateTypeSchema,
  visibility: DocumentVisibilitySchema,
  id: z.number(),
  externalId: z.string().nullable(),
  title: z.string(),
  /**
   * [DocumentAuthOptions]
   */
  authOptions: ZDocumentAuthOptionsSchema.nullable(),
  templateDocumentDataId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publicTitle: z.string(),
  publicDescription: z.string(),
  useLegacyFieldInsertion: z.boolean(),
  userId: z.number(),
  teamId: z.number(),
  folderId: z.string().nullable()
});
const LegacyTemplateDirectLinkSchema = TemplateDirectLinkSchema.extend({
  templateId: z.number()
});

export { LegacyTemplateDirectLinkSchema, TemplateSchema, TemplateTypeSchema };
//# sourceMappingURL=template-legacy-schema.js.map
