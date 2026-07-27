import { ZEnvelopeFieldSchema } from '../../../lib/types/field.js';
import { EnvelopeItemSchema } from '../../../prisma/generated/zod/modelSchema/EnvelopeItemSchema.js';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { zodFormData, zfdFile } from '../../utils/zod-form-data.js';
import { ZDocumentTitleSchema } from '../document-router/schema.js';

const ZReplaceEnvelopeItemPdfPayloadSchema = z.object({
  envelopeId: z.string(),
  envelopeItemId: z.string(),
  title: ZDocumentTitleSchema.optional()
});
const ZReplaceEnvelopeItemPdfRequestSchema = zodFormData({
  payload: zfd.json(ZReplaceEnvelopeItemPdfPayloadSchema),
  file: zfdFile()
});
const ZReplaceEnvelopeItemPdfResponseSchema = z.object({
  data: EnvelopeItemSchema.pick({
    id: true,
    title: true,
    envelopeId: true,
    order: true,
    documentDataId: true
  }),
  /**
   * The full list of fields for the envelope after the replacement.
   *
   * This is only populated if fields have been changed or deleted. It will
   * return undefined otherwise.
   *
   * Done this way to reduce number of queries.
   */
  fields: ZEnvelopeFieldSchema.array().optional()
});

export { ZReplaceEnvelopeItemPdfPayloadSchema, ZReplaceEnvelopeItemPdfRequestSchema, ZReplaceEnvelopeItemPdfResponseSchema };
//# sourceMappingURL=replace-envelope-item-pdf.types.js.map
