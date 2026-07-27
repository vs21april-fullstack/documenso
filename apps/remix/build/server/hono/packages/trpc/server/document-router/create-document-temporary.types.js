import { ZDocumentSchema } from '../../../lib/types/document.js';
import { ZDocumentActionAuthTypesSchema, ZDocumentAccessAuthTypesSchema } from '../../../lib/types/document-auth.js';
import { ZDocumentFormValuesSchema } from '../../../lib/types/document-form-values.js';
import { ZDocumentMetaCreateSchema } from '../../../lib/types/document-meta.js';
import { ZEnvelopeAttachmentTypeSchema } from '../../../lib/types/envelope-attachment.js';
import { ZFieldHeightSchema, ZFieldWidthSchema, ZFieldPageYSchema, ZFieldPageXSchema, ZFieldPageNumberSchema } from '../../../lib/types/field.js';
import { ZFieldAndMetaSchema } from '../../../lib/types/field-meta.js';
import { z } from 'zod';
import { ZCreateRecipientSchema } from '../recipient-router/schema.js';
import { ZDocumentTitleSchema, ZDocumentVisibilitySchema, ZDocumentExternalIdSchema } from './schema.js';

/**
 * Temporariy endpoint for V2 Beta until we allow passthrough documents on create.
 * @deprecated
 */
const createDocumentTemporaryMeta = {
  openapi: {
    method: 'POST',
    path: '/document/create/beta',
    summary: 'Create document',
    description: 'You will need to upload the PDF to the provided URL returned. Note: Once V2 API is released, this will be removed since we will allow direct uploads, instead of using an upload URL.',
    tags: ['Document'],
    deprecated: true
  }
};
const ZCreateDocumentTemporaryRequestSchema = z.object({
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
const ZCreateDocumentTemporaryResponseSchema = z.object({
  document: ZDocumentSchema,
  uploadUrl: z.string().describe('The URL to upload the document PDF to. Use a PUT request with the file via form-data')
});

export { ZCreateDocumentTemporaryRequestSchema, ZCreateDocumentTemporaryResponseSchema, createDocumentTemporaryMeta };
//# sourceMappingURL=create-document-temporary.types.js.map
