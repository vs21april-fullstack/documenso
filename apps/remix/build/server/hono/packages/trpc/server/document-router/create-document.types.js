import { ZDocumentActionAuthTypesSchema, ZDocumentAccessAuthTypesSchema } from '../../../lib/types/document-auth.js';
import { ZDocumentFormValuesSchema } from '../../../lib/types/document-form-values.js';
import { ZDocumentMetaCreateSchema } from '../../../lib/types/document-meta.js';
import { ZDocumentVisibilitySchema } from '../../../lib/types/document-visibility.js';
import { ZEnvelopeAttachmentTypeSchema } from '../../../lib/types/envelope-attachment.js';
import { ZFieldHeightSchema, ZFieldWidthSchema, ZFieldPageYSchema, ZFieldPageXSchema, ZFieldPageNumberSchema } from '../../../lib/types/field.js';
import { ZFieldAndMetaSchema } from '../../../lib/types/field-meta.js';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { zodFormData, zfdFile } from '../../utils/zod-form-data.js';
import { ZCreateRecipientSchema } from '../recipient-router/schema.js';
import { ZDocumentTitleSchema, ZDocumentExternalIdSchema } from './schema.js';

const createDocumentMeta = {
  openapi: {
    method: 'POST',
    path: '/document/create',
    contentTypes: ['multipart/form-data'],
    summary: 'Create document',
    description: 'Create a document using form data.',
    tags: ['Document']
  }
};
const ZCreateDocumentPayloadSchema = z.object({
  title: ZDocumentTitleSchema,
  externalId: ZDocumentExternalIdSchema.optional(),
  visibility: ZDocumentVisibilitySchema.optional(),
  globalAccessAuth: z.array(ZDocumentAccessAuthTypesSchema).optional(),
  globalActionAuth: z.array(ZDocumentActionAuthTypesSchema).optional(),
  formValues: ZDocumentFormValuesSchema.optional(),
  folderId: z.string().describe('The ID of the folder to create the document in. If not provided, the document will be created in the root folder.').optional(),
  recipients: z.array(ZCreateRecipientSchema.extend({
    fields: ZFieldAndMetaSchema.and(z.object({
      pageNumber: ZFieldPageNumberSchema,
      pageX: ZFieldPageXSchema,
      pageY: ZFieldPageYSchema,
      width: ZFieldWidthSchema,
      height: ZFieldHeightSchema
    })).array().optional()
  })).optional(),
  attachments: z.array(z.object({
    label: z.string().min(1, 'Label is required'),
    data: z.string().url('Must be a valid URL'),
    type: ZEnvelopeAttachmentTypeSchema.optional().default('link')
  })).optional(),
  meta: ZDocumentMetaCreateSchema.optional()
});
const ZCreateDocumentRequestSchema = zodFormData({
  payload: zfd.json(ZCreateDocumentPayloadSchema),
  file: zfdFile()
});
const ZCreateDocumentResponseSchema = z.object({
  envelopeId: z.string(),
  id: z.number()
});

export { ZCreateDocumentPayloadSchema, ZCreateDocumentRequestSchema, ZCreateDocumentResponseSchema, createDocumentMeta };
//# sourceMappingURL=create-document.types.js.map
