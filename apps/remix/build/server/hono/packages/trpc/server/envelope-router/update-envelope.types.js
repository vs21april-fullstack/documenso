import { ZDocumentActionAuthTypesSchema, ZDocumentAccessAuthTypesSchema } from '../../../lib/types/document-auth.js';
import { ZDocumentMetaUpdateSchema } from '../../../lib/types/document-meta.js';
import { ZEnvelopeLiteSchema } from '../../../lib/types/envelope.js';
import { TemplateType } from '@prisma/client';
import { z } from 'zod';
import { ZDocumentVisibilitySchema, ZDocumentExternalIdSchema, ZDocumentTitleSchema } from '../document-router/schema.js';

const updateEnvelopeMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/update',
    summary: 'Update envelope',
    tags: ['Envelope']
  }
};
const ZUpdateEnvelopeRequestSchema = z.object({
  envelopeId: z.string(),
  data: z.object({
    title: ZDocumentTitleSchema.optional(),
    externalId: ZDocumentExternalIdSchema.nullish(),
    visibility: ZDocumentVisibilitySchema.optional(),
    globalAccessAuth: z.array(ZDocumentAccessAuthTypesSchema).optional(),
    globalActionAuth: z.array(ZDocumentActionAuthTypesSchema).optional(),
    folderId: z.string().nullish(),
    templateType: z.nativeEnum(TemplateType).optional()
  }).optional(),
  meta: ZDocumentMetaUpdateSchema.optional()
});
const ZUpdateEnvelopeResponseSchema = ZEnvelopeLiteSchema;

export { ZUpdateEnvelopeRequestSchema, ZUpdateEnvelopeResponseSchema, updateEnvelopeMeta };
//# sourceMappingURL=update-envelope.types.js.map
