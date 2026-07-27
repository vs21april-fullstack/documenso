import { ZDocumentLiteSchema } from '../../../lib/types/document.js';
import { ZDocumentActionAuthTypesSchema, ZDocumentAccessAuthTypesSchema } from '../../../lib/types/document-auth.js';
import { ZDocumentMetaUpdateSchema } from '../../../lib/types/document-meta.js';
import { z } from 'zod';
import { ZDocumentVisibilitySchema, ZDocumentExternalIdSchema, ZDocumentTitleSchema } from './schema.js';

// import type { OpenApiMeta } from 'trpc-to-openapi';
const updateDocumentMeta = {
  openapi: {
    method: 'POST',
    path: '/document/update',
    summary: 'Update document',
    tags: ['Document']
  }
};
const ZUpdateDocumentRequestSchema = z.object({
  documentId: z.number(),
  data: z.object({
    title: ZDocumentTitleSchema.optional(),
    externalId: ZDocumentExternalIdSchema.nullish(),
    visibility: ZDocumentVisibilitySchema.optional(),
    globalAccessAuth: z.array(ZDocumentAccessAuthTypesSchema).optional(),
    globalActionAuth: z.array(ZDocumentActionAuthTypesSchema).optional(),
    useLegacyFieldInsertion: z.boolean().optional(),
    folderId: z.string().nullish()
  }).optional(),
  meta: ZDocumentMetaUpdateSchema.optional()
});
const ZUpdateDocumentResponseSchema = ZDocumentLiteSchema;

export { ZUpdateDocumentRequestSchema, ZUpdateDocumentResponseSchema, updateDocumentMeta };
//# sourceMappingURL=update-document.types.js.map
