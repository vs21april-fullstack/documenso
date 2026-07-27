import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { DEFAULT_DOCUMENT_DATE_FORMAT, DATE_FORMATS } from '../../lib/constants/date-formats.js';
import { SUPPORTED_LANGUAGE_CODES } from '../../lib/constants/locales.js';
import { DEFAULT_DOCUMENT_TIME_ZONE, TIME_ZONES } from '../../lib/constants/time-zones.js';
import { ZUrlSchema } from '../../lib/schemas/common.js';
import { ZDocumentActionAuthTypesSchema, ZDocumentAccessAuthTypesSchema, ZRecipientActionAuthTypesSchema } from '../../lib/types/document-auth.js';
import { ZDocumentEmailSettingsSchema } from '../../lib/types/document-email.js';
import { ZEnvelopeAttachmentTypeSchema } from '../../lib/types/envelope-attachment.js';
import { ZFieldMetaSchema, ZFieldMetaPrefillFieldsSchema } from '../../lib/types/field-meta.js';
import { zEmail } from '../../lib/utils/zod.js';
import { DocumentDistributionMethod, DocumentSigningOrder, RecipientRole, SendStatus, SigningStatus, ReadStatus, FieldType, TemplateType, DocumentDataType } from '@prisma/client';
import { z } from 'zod';

extendZodWithOpenApi(z);
const ZNoBodyMutationSchema = null;
/**
 * Documents
 */
const ZGetDocumentsQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  perPage: z.coerce.number().min(1).optional().default(10),
  folderId: z.string().describe('Filter documents by folder ID. When omitted, returns root documents.').optional()
});
const ZDeleteDocumentMutationSchema = null;
const ZSuccessfulDocumentResponseSchema = z.object({
  id: z.number(),
  externalId: z.string().nullish(),
  userId: z.number(),
  teamId: z.number().nullish(),
  folderId: z.string().nullish(),
  title: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().nullable()
});
const ZSuccessfulGetDocumentResponseSchema = ZSuccessfulDocumentResponseSchema.extend({
  recipients: z.lazy(() => z.array(ZSuccessfulRecipientResponseSchema)),
  fields: z.lazy(() => ZFieldSchema.pick({
    id: true,
    documentId: true,
    recipientId: true,
    type: true,
    page: true,
    positionX: true,
    positionY: true,
    width: true,
    height: true,
    customText: true,
    fieldMeta: true
  }).extend({
    fieldMeta: ZFieldMetaSchema.nullish()
  }).array())
});
const ZSendDocumentForSigningMutationSchema = z.object({
  sendEmail: z.boolean().optional().default(true).openapi({
    description: 'Whether to send an email to the recipients asking them to action the document. If you disable this, you will need to manually distribute the document to the recipients using the generated signing links.'
  }),
  sendCompletionEmails: z.boolean().optional().openapi({
    description: 'Whether to send completion emails when the document is fully signed. This will override the document email settings.'
  })
}).or(z.any().transform(() => ({
  sendEmail: true,
  sendCompletionEmails: undefined
})));
const ZResendDocumentForSigningMutationSchema = z.object({
  recipients: z.array(z.number())
});
const ZSuccessfulResendDocumentResponseSchema = z.object({
  message: z.string()
});
z.object({
  url: z.string(),
  key: z.string()
});
const ZDownloadDocumentQuerySchema = z.object({
  downloadOriginalDocument: z.preprocess(val => String(val) === 'true' || String(val) === '1', z.boolean()).optional().default(false)
});
const ZDownloadDocumentSuccessfulSchema = z.object({
  downloadUrl: z.string()
});
const ZCreateDocumentMutationSchema = z.object({
  title: z.string().min(1),
  externalId: z.string().nullish(),
  folderId: z.string().describe('The ID of the folder to create the document in. If not provided, the document will be created in the root folder.').optional(),
  recipients: z.array(z.object({
    name: z.string().min(1),
    email: zEmail().min(1),
    role: z.nativeEnum(RecipientRole).optional().default(RecipientRole.SIGNER),
    signingOrder: z.number().nullish()
  })),
  meta: z.object({
    subject: z.string(),
    message: z.string(),
    timezone: z.string().default(DEFAULT_DOCUMENT_TIME_ZONE).openapi({
      description: 'The timezone of the date. Must be one of the options listed in the list below.',
      enum: TIME_ZONES
    }),
    dateFormat: z.string().default(DEFAULT_DOCUMENT_DATE_FORMAT).openapi({
      description: 'The format of the date. Must be one of the options listed in the list below.',
      enum: DATE_FORMATS.map(format => format.value)
    }),
    redirectUrl: z.string(),
    signingOrder: z.nativeEnum(DocumentSigningOrder).optional(),
    allowDictateNextSigner: z.boolean().optional(),
    language: z.enum(SUPPORTED_LANGUAGE_CODES).optional(),
    typedSignatureEnabled: z.boolean().optional().default(true),
    uploadSignatureEnabled: z.boolean().optional().default(true),
    drawSignatureEnabled: z.boolean().optional().default(true),
    distributionMethod: z.nativeEnum(DocumentDistributionMethod).optional(),
    emailSettings: ZDocumentEmailSettingsSchema.optional()
  }).partial().optional().default({}),
  authOptions: z.object({
    globalAccessAuth: z.union([ZDocumentAccessAuthTypesSchema, z.array(ZDocumentAccessAuthTypesSchema)]).transform(val => Array.isArray(val) ? val : [val]).optional().default([]),
    globalActionAuth: z.union([ZDocumentActionAuthTypesSchema, z.array(ZDocumentActionAuthTypesSchema)]).transform(val => Array.isArray(val) ? val : [val]).optional().default([])
  }).optional().openapi({
    description: 'The globalActionAuth property is only available for Enterprise accounts.'
  }),
  formValues: z.record(z.string(), z.union([z.string(), z.boolean(), z.number()])).optional(),
  attachments: z.array(z.object({
    label: z.string().min(1, 'Label is required'),
    data: z.string().url('Must be a valid URL'),
    type: ZEnvelopeAttachmentTypeSchema.optional().default('link')
  })).optional()
});
const ZCreateDocumentMutationResponseSchema = z.object({
  uploadUrl: z.string().min(1),
  documentId: z.number(),
  externalId: z.string().nullish(),
  recipients: z.array(z.object({
    recipientId: z.number(),
    name: z.string(),
    email: zEmail().min(1),
    token: z.string(),
    role: z.nativeEnum(RecipientRole),
    signingOrder: z.number().nullish(),
    signingUrl: z.string()
  }))
});
const ZCreateDocumentFromTemplateMutationSchema = z.object({
  title: z.string().min(1),
  externalId: z.string().nullish(),
  recipients: z.array(z.object({
    name: z.string().min(1),
    email: zEmail().min(1),
    role: z.nativeEnum(RecipientRole).optional().default(RecipientRole.SIGNER),
    signingOrder: z.number().nullish()
  })),
  meta: z.object({
    subject: z.string(),
    message: z.string(),
    timezone: z.string(),
    dateFormat: z.string(),
    redirectUrl: z.string(),
    signingOrder: z.nativeEnum(DocumentSigningOrder).optional(),
    allowDictateNextSigner: z.boolean().optional(),
    language: z.enum(SUPPORTED_LANGUAGE_CODES).optional()
  }).partial().optional(),
  authOptions: z.object({
    globalAccessAuth: z.union([ZDocumentAccessAuthTypesSchema, z.array(ZDocumentAccessAuthTypesSchema)]).transform(val => Array.isArray(val) ? val : [val]).optional().default([]),
    globalActionAuth: z.union([ZDocumentActionAuthTypesSchema, z.array(ZDocumentActionAuthTypesSchema)]).transform(val => Array.isArray(val) ? val : [val]).optional().default([])
  }).optional(),
  formValues: z.record(z.string(), z.union([z.string(), z.boolean(), z.number()])).optional(),
  attachments: z.array(z.object({
    label: z.string().min(1, 'Label is required'),
    data: z.string().url('Must be a valid URL'),
    type: ZEnvelopeAttachmentTypeSchema.optional().default('link')
  })).optional()
});
const ZCreateDocumentFromTemplateMutationResponseSchema = z.object({
  documentId: z.number(),
  externalId: z.string().nullish(),
  recipients: z.array(z.object({
    recipientId: z.number(),
    name: z.string(),
    email: zEmail().min(1),
    token: z.string(),
    role: z.nativeEnum(RecipientRole).optional().default(RecipientRole.SIGNER),
    signingOrder: z.number().nullish(),
    signingUrl: z.string()
  }))
});
const ZGenerateDocumentFromTemplateMutationSchema = z.object({
  title: z.string().optional(),
  externalId: z.string().optional(),
  folderId: z.string().describe('The ID of the folder to create the document in. If not provided, the document will be created in the root folder.').optional(),
  recipients: z.array(z.object({
    id: z.number(),
    email: zEmail(),
    name: z.string().optional(),
    signingOrder: z.number().optional()
  })).refine(schema => {
    const ids = schema.map(signer => signer.id);
    return new Set(ids).size === ids.length;
  }, {
    message: 'Recipient IDs must be unique'
  }),
  meta: z.object({
    subject: z.string(),
    message: z.string(),
    timezone: z.string(),
    dateFormat: z.string(),
    redirectUrl: ZUrlSchema,
    signingOrder: z.nativeEnum(DocumentSigningOrder),
    allowDictateNextSigner: z.boolean(),
    language: z.enum(SUPPORTED_LANGUAGE_CODES),
    distributionMethod: z.nativeEnum(DocumentDistributionMethod),
    typedSignatureEnabled: z.boolean(),
    uploadSignatureEnabled: z.boolean(),
    drawSignatureEnabled: z.boolean(),
    emailSettings: ZDocumentEmailSettingsSchema
  }).partial().optional(),
  authOptions: z.object({
    globalAccessAuth: z.union([ZDocumentAccessAuthTypesSchema, z.array(ZDocumentAccessAuthTypesSchema)]).transform(val => Array.isArray(val) ? val : [val]).optional().default([]),
    globalActionAuth: z.union([ZDocumentActionAuthTypesSchema, z.array(ZDocumentActionAuthTypesSchema)]).transform(val => Array.isArray(val) ? val : [val]).optional().default([])
  }).optional(),
  formValues: z.record(z.string(), z.union([z.string(), z.boolean(), z.number()])).optional(),
  prefillFields: z.array(ZFieldMetaPrefillFieldsSchema).optional()
});
const ZGenerateDocumentFromTemplateMutationResponseSchema = z.object({
  documentId: z.number(),
  externalId: z.string().nullish(),
  recipients: z.array(z.object({
    recipientId: z.number(),
    name: z.string(),
    email: zEmail().min(1),
    token: z.string(),
    role: z.nativeEnum(RecipientRole),
    signingOrder: z.number().nullish(),
    signingUrl: z.string()
  }))
});
const ZCreateRecipientMutationSchema = z.object({
  name: z.string().min(1),
  email: zEmail().min(1),
  role: z.nativeEnum(RecipientRole).optional().default(RecipientRole.SIGNER),
  signingOrder: z.number().nullish(),
  authOptions: z.object({
    actionAuth: z.union([ZRecipientActionAuthTypesSchema, z.array(ZRecipientActionAuthTypesSchema)]).transform(val => Array.isArray(val) ? val : [val]).optional().default([])
  }).optional().openapi({
    description: 'The authOptions property is only available for Enterprise accounts.'
  })
});
const ZUpdateRecipientMutationSchema = ZCreateRecipientMutationSchema.partial();
const ZDeleteRecipientMutationSchema = null;
const ZSuccessfulRecipientResponseSchema = z.object({
  id: z.number(),
  // !: This handles the fact that we have null documentId's for templates
  // !: while we won't need the default we must add it to satisfy typescript
  documentId: z.number().nullish().default(-1),
  email: zEmail().min(1),
  name: z.string(),
  role: z.nativeEnum(RecipientRole),
  signingOrder: z.number().nullish(),
  token: z.string(),
  expiresAt: z.date().nullish(),
  expirationNotifiedAt: z.date().nullish(),
  signedAt: z.date().nullable(),
  readStatus: z.nativeEnum(ReadStatus),
  signingStatus: z.nativeEnum(SigningStatus),
  sendStatus: z.nativeEnum(SendStatus),
  signingUrl: z.string()
});
/**
 * Fields
 */
const ZCreateFieldSchema = z.object({
  recipientId: z.number(),
  type: z.nativeEnum(FieldType),
  pageNumber: z.number(),
  pageX: z.number(),
  pageY: z.number(),
  pageWidth: z.number(),
  pageHeight: z.number(),
  fieldMeta: ZFieldMetaSchema.openapi({})
});
const ZCreateFieldMutationSchema = z.union([ZCreateFieldSchema, z.array(ZCreateFieldSchema).min(1)]);
const ZUpdateFieldMutationSchema = ZCreateFieldSchema.partial();
const ZDeleteFieldMutationSchema = null;
const ZSuccessfulFieldSchema = z.object({
  id: z.number(),
  documentId: z.number(),
  recipientId: z.number(),
  type: z.nativeEnum(FieldType),
  pageNumber: z.number(),
  pageX: z.number(),
  pageY: z.number(),
  pageWidth: z.number(),
  pageHeight: z.number(),
  customText: z.string(),
  fieldMeta: ZFieldMetaSchema,
  inserted: z.boolean()
});
const ZSuccessfulFieldCreationResponseSchema = z.object({
  fields: z.union([ZSuccessfulFieldSchema, z.array(ZSuccessfulFieldSchema)]),
  documentId: z.number()
});
const ZSuccessfulFieldResponseSchema = z.object({
  id: z.number(),
  documentId: z.number(),
  recipientId: z.number(),
  type: z.nativeEnum(FieldType),
  pageNumber: z.number(),
  pageX: z.number(),
  pageY: z.number(),
  pageWidth: z.number(),
  pageHeight: z.number(),
  customText: z.string(),
  fieldMeta: ZFieldMetaSchema,
  inserted: z.boolean()
});
const ZSuccessfulResponseSchema = z.object({
  documents: ZSuccessfulDocumentResponseSchema.array(),
  totalPages: z.number()
});
const ZSuccessfulSigningResponseSchema = z.object({
  message: z.string()
}).and(ZSuccessfulGetDocumentResponseSchema.omit({
  fields: true
}));
/**
 * General
 */
const ZAuthorizationHeadersSchema = z.object({
  authorization: z.string()
});
const ZUnsuccessfulResponseSchema = z.object({
  message: z.string()
});
const ZTemplateMetaSchema = z.object({
  id: z.string(),
  subject: z.string().nullish(),
  message: z.string().nullish(),
  timezone: z.string().nullish(),
  dateFormat: z.string().nullish(),
  templateId: z.number(),
  redirectUrl: z.string().nullish(),
  signingOrder: z.nativeEnum(DocumentSigningOrder).nullish().default(DocumentSigningOrder.PARALLEL)
});
const ZTemplateSchema = z.object({
  id: z.number(),
  externalId: z.string().nullish(),
  type: z.nativeEnum(TemplateType),
  title: z.string(),
  userId: z.number(),
  teamId: z.number().nullish(),
  createdAt: z.date(),
  updatedAt: z.date()
});
const ZRecipientSchema = z.object({
  id: z.number(),
  documentId: z.number().nullish(),
  templateId: z.number().nullish(),
  email: zEmail().min(1),
  name: z.string(),
  token: z.string(),
  signingOrder: z.number().nullish(),
  documentDeletedAt: z.date().nullish(),
  expiresAt: z.date().nullish(),
  expirationNotifiedAt: z.date().nullish(),
  signedAt: z.date().nullish(),
  authOptions: z.unknown(),
  role: z.nativeEnum(RecipientRole),
  readStatus: z.nativeEnum(ReadStatus),
  signingStatus: z.nativeEnum(SigningStatus),
  sendStatus: z.nativeEnum(SendStatus)
});
const ZFieldSchema = z.object({
  id: z.number(),
  secondaryId: z.string(),
  documentId: z.number().nullish(),
  templateId: z.number().nullish(),
  recipientId: z.number(),
  type: z.nativeEnum(FieldType),
  page: z.number(),
  positionX: z.unknown(),
  positionY: z.unknown(),
  width: z.unknown(),
  height: z.unknown(),
  customText: z.string(),
  inserted: z.boolean(),
  fieldMeta: ZFieldMetaSchema.nullish().openapi({})
});
const ZTemplateWithDataSchema = ZTemplateSchema.extend({
  templateMeta: ZTemplateMetaSchema.nullish(),
  directLink: z.object({
    token: z.string(),
    enabled: z.boolean()
  }).nullable(),
  templateDocumentData: z.object({
    id: z.string(),
    type: z.nativeEnum(DocumentDataType),
    data: z.string()
  }),
  Field: ZFieldSchema.pick({
    id: true,
    documentId: true,
    templateId: true,
    recipientId: true,
    type: true,
    page: true,
    positionX: true,
    positionY: true,
    width: true,
    height: true,
    customText: true,
    fieldMeta: true
  }).array(),
  Recipient: ZRecipientSchema.pick({
    id: true,
    email: true,
    name: true,
    signingOrder: true,
    authOptions: true,
    role: true
  }).array()
});
const ZSuccessfulGetTemplateResponseSchema = ZTemplateWithDataSchema;
const ZSuccessfulDeleteTemplateResponseSchema = ZTemplateSchema;
const ZSuccessfulGetTemplatesResponseSchema = z.object({
  templates: ZTemplateWithDataSchema.omit({
    templateDocumentData: true,
    templateMeta: true
  }).array(),
  totalPages: z.number()
});
const ZGetTemplatesQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  perPage: z.coerce.number().min(1).optional().default(10)
});

export { ZAuthorizationHeadersSchema, ZCreateDocumentFromTemplateMutationResponseSchema, ZCreateDocumentFromTemplateMutationSchema, ZCreateDocumentMutationResponseSchema, ZCreateDocumentMutationSchema, ZCreateFieldMutationSchema, ZCreateRecipientMutationSchema, ZDeleteDocumentMutationSchema, ZDeleteFieldMutationSchema, ZDeleteRecipientMutationSchema, ZDownloadDocumentQuerySchema, ZDownloadDocumentSuccessfulSchema, ZFieldSchema, ZGenerateDocumentFromTemplateMutationResponseSchema, ZGenerateDocumentFromTemplateMutationSchema, ZGetDocumentsQuerySchema, ZGetTemplatesQuerySchema, ZNoBodyMutationSchema, ZRecipientSchema, ZResendDocumentForSigningMutationSchema, ZSendDocumentForSigningMutationSchema, ZSuccessfulDeleteTemplateResponseSchema, ZSuccessfulDocumentResponseSchema, ZSuccessfulFieldCreationResponseSchema, ZSuccessfulFieldResponseSchema, ZSuccessfulGetDocumentResponseSchema, ZSuccessfulGetTemplateResponseSchema, ZSuccessfulGetTemplatesResponseSchema, ZSuccessfulRecipientResponseSchema, ZSuccessfulResendDocumentResponseSchema, ZSuccessfulResponseSchema, ZSuccessfulSigningResponseSchema, ZTemplateMetaSchema, ZTemplateSchema, ZTemplateWithDataSchema, ZUnsuccessfulResponseSchema, ZUpdateFieldMutationSchema, ZUpdateRecipientMutationSchema };
//# sourceMappingURL=schema.js.map
