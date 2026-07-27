import { ZDocumentActionAuthTypesSchema, ZDocumentAccessAuthTypesSchema } from '../../../lib/types/document-auth.js';
import { ZDocumentMetaUpdateSchema } from '../../../lib/types/document-meta.js';
import { ZClampedFieldHeightSchema, ZClampedFieldWidthSchema, ZClampedFieldPositionYSchema, ZClampedFieldPositionXSchema, ZFieldPageNumberSchema } from '../../../lib/types/field.js';
import { ZEnvelopeFieldAndMetaSchema } from '../../../lib/types/field-meta.js';
import { EnvelopeAttachmentSchema } from '../../../prisma/generated/zod/modelSchema/EnvelopeAttachmentSchema.js';
import { ZSetEnvelopeRecipientSchema } from '../envelope-router/set-envelope-recipients.types.js';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { zodFormData, zfdFile } from '../../utils/zod-form-data.js';
import { ZDocumentVisibilitySchema, ZDocumentExternalIdSchema, ZDocumentTitleSchema } from '../document-router/schema.js';

const ZUpdateEmbeddingEnvelopePayloadSchema = z.object({
  envelopeId: z.string(),
  data: z.object({
    title: ZDocumentTitleSchema.optional(),
    externalId: ZDocumentExternalIdSchema.nullish(),
    visibility: ZDocumentVisibilitySchema.optional(),
    globalAccessAuth: z.array(ZDocumentAccessAuthTypesSchema).optional(),
    globalActionAuth: z.array(ZDocumentActionAuthTypesSchema).optional(),
    folderId: z.string().nullish(),
    /**
     * The list of envelope items that are part of the envelope.
     *
     * Any missing IDs will be treated as deleting the envelope item.
     */
    envelopeItems: z.object({
      /**
       * This is not necesssarily a real id, it can be a temporary id for the envelope item.
       */
      id: z.string(),
      /**
       * The title of the envelope item.
       */
      title: z.string(),
      /**
       * The order of the envelope item in the envelope.
       */
      order: z.number().int().min(0),
      /**
       * The file index for items that are not yet uploaded.
       */
      index: z.number().int().min(0).optional(),
      /**
       * The file index for existing items that need their PDF replaced.
       * Only applicable to items with real IDs (not PRESIGNED_ prefix).
       */
      replaceFileIndex: z.number().int().min(0).optional()
    }).refine(item => !(item.index !== undefined && item.replaceFileIndex !== undefined), {
      message: 'Cannot provide both index and replaceFileIndex on the same envelope item',
      path: ['replaceFileIndex']
    }).array(),
    /**
     * This is a set command.
     */
    recipients: ZSetEnvelopeRecipientSchema.extend({
      fields: ZEnvelopeFieldAndMetaSchema.and(z.object({
        id: z.number().optional(),
        page: ZFieldPageNumberSchema,
        positionX: ZClampedFieldPositionXSchema,
        positionY: ZClampedFieldPositionYSchema,
        width: ZClampedFieldWidthSchema,
        height: ZClampedFieldHeightSchema,
        envelopeItemId: z.string()
      })).array()
    }).array(),
    /**
     * The list of attachments for the envelope.
     *
     * This is a set command: when provided, all existing attachments are deleted
     * and replaced with the provided list.
     */
    attachments: EnvelopeAttachmentSchema.pick({
      type: true,
      label: true,
      data: true
    }).extend({
      id: z.string().optional()
    }).array()
  }),
  meta: ZDocumentMetaUpdateSchema.optional()
});
const ZUpdateEmbeddingEnvelopeRequestSchema = zodFormData({
  payload: zfd.json(ZUpdateEmbeddingEnvelopePayloadSchema),
  files: zfd.repeatableOfType(zfdFile())
});
const ZUpdateEmbeddingEnvelopeResponseSchema = z.void();

export { ZUpdateEmbeddingEnvelopePayloadSchema, ZUpdateEmbeddingEnvelopeRequestSchema, ZUpdateEmbeddingEnvelopeResponseSchema };
//# sourceMappingURL=update-embedding-envelope.types.js.map
