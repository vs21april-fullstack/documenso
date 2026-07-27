import { ZDocumentActionAuthTypesSchema, ZDocumentAccessAuthTypesSchema } from '../../../lib/types/document-auth.js';
import { ZDocumentFormValuesSchema } from '../../../lib/types/document-form-values.js';
import { ZDocumentMetaCreateSchema } from '../../../lib/types/document-meta.js';
import { ZEnvelopeAttachmentTypeSchema } from '../../../lib/types/envelope-attachment.js';
import { ZClampedFieldHeightSchema, ZClampedFieldWidthSchema, ZClampedFieldPositionYSchema, ZClampedFieldPositionXSchema, ZFieldPageNumberSchema } from '../../../lib/types/field.js';
import { ZEnvelopeFieldAndMetaSchema } from '../../../lib/types/field-meta.js';
import { zEmail } from '../../../lib/utils/zod.js';
import { EnvelopeType } from '@prisma/client';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { zodFormData, zfdFile } from '../../utils/zod-form-data.js';
import { ZDocumentTitleSchema, ZDocumentVisibilitySchema, ZDocumentExternalIdSchema } from '../document-router/schema.js';
import { ZCreateEnvelopeRecipientSchema } from './envelope-recipients/create-envelope-recipients.types.js';

const createEnvelopeMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/create',
    contentTypes: ['multipart/form-data'],
    summary: 'Create envelope',
    description: 'Create an envelope using form data.',
    tags: ['Envelope']
  }
};
const ZCreateEnvelopePayloadSchema = z.object({
  title: ZDocumentTitleSchema,
  type: z.nativeEnum(EnvelopeType),
  delegatedDocumentOwner: zEmail().describe('The email of the user who will own the document.').optional(),
  externalId: ZDocumentExternalIdSchema.optional(),
  visibility: ZDocumentVisibilitySchema.optional(),
  globalAccessAuth: z.array(ZDocumentAccessAuthTypesSchema).optional(),
  globalActionAuth: z.array(ZDocumentActionAuthTypesSchema).optional(),
  formValues: ZDocumentFormValuesSchema.optional(),
  folderId: z.string().describe('The ID of the folder to create the document in. If not provided, the document will be created in the root folder.').optional(),
  recipients: z.array(ZCreateEnvelopeRecipientSchema.extend({
    fields: ZEnvelopeFieldAndMetaSchema.and(z.object({
      identifier: z.union([z.string(), z.number()]).describe('Either the filename or the index of the file that was uploaded to attach the field to.').optional(),
      page: ZFieldPageNumberSchema,
      positionX: ZClampedFieldPositionXSchema,
      positionY: ZClampedFieldPositionYSchema,
      width: ZClampedFieldWidthSchema,
      height: ZClampedFieldHeightSchema
    })).array().optional()
  })).optional(),
  meta: ZDocumentMetaCreateSchema.optional(),
  attachments: z.array(z.object({
    label: z.string().min(1, 'Label is required'),
    data: z.string().url('Must be a valid URL'),
    type: ZEnvelopeAttachmentTypeSchema.optional().default('link')
  })).optional()
});
const ZCreateEnvelopeRequestSchema = zodFormData({
  payload: zfd.json(ZCreateEnvelopePayloadSchema),
  files: zfd.repeatableOfType(zfdFile())
});
const ZCreateEnvelopeResponseSchema = z.object({
  id: z.string()
});

export { ZCreateEnvelopePayloadSchema, ZCreateEnvelopeRequestSchema, ZCreateEnvelopeResponseSchema, createEnvelopeMeta };
//# sourceMappingURL=create-envelope.types.js.map
