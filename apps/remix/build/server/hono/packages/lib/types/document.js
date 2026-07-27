import { DocumentDataSchema } from '../../prisma/generated/zod/modelSchema/DocumentDataSchema.js';
import { DocumentMetaSchema } from '../../prisma/generated/zod/modelSchema/DocumentMetaSchema.js';
import { EnvelopeItemSchema } from '../../prisma/generated/zod/modelSchema/EnvelopeItemSchema.js';
import { FolderSchema } from '../../prisma/generated/zod/modelSchema/FolderSchema.js';
import { TeamSchema } from '../../prisma/generated/zod/modelSchema/TeamSchema.js';
import { UserSchema } from '../../prisma/generated/zod/modelSchema/UserSchema.js';
import { LegacyDocumentSchema } from '../../prisma/types/document-legacy-schema.js';
import { z } from 'zod';
import { ZFieldSchema } from './field.js';
import { ZRecipientLiteSchema } from './recipient.js';

/**
 * The full document response schema.
 *
 * Mainly used for returning a single document from the API.
 */
const ZDocumentSchema = LegacyDocumentSchema.pick({
  visibility: true,
  status: true,
  source: true,
  id: true,
  externalId: true,
  userId: true,
  authOptions: true,
  formValues: true,
  title: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
  deletedAt: true,
  teamId: true,
  folderId: true
}).extend({
  envelopeId: z.string(),
  internalVersion: z.number(),
  // Which "Template" the document was created from.
  templateId: z.number().nullish().describe('The ID of the template that the document was created from, if any.'),
  // Backwards compatibility.
  documentDataId: z.string().default(''),
  // Todo: Maybe we want to alter this a bit since this returns a lot of data.
  documentData: DocumentDataSchema.pick({
    type: true,
    id: true,
    data: true,
    initialData: true
  }).extend({
    envelopeItemId: z.string()
  }),
  documentMeta: DocumentMetaSchema.pick({
    signingOrder: true,
    distributionMethod: true,
    id: true,
    subject: true,
    message: true,
    timezone: true,
    dateFormat: true,
    redirectUrl: true,
    typedSignatureEnabled: true,
    uploadSignatureEnabled: true,
    drawSignatureEnabled: true,
    allowDictateNextSigner: true,
    language: true,
    emailSettings: true,
    emailId: true,
    emailReplyTo: true,
    envelopeExpirationPeriod: true,
    reminderSettings: true
  }).extend({
    password: z.string().nullable().default(null),
    documentId: z.number().default(-1).optional()
  }),
  envelopeItems: EnvelopeItemSchema.pick({
    id: true,
    envelopeId: true
  }).array(),
  folder: FolderSchema.pick({
    id: true,
    name: true,
    type: true,
    visibility: true,
    userId: true,
    teamId: true,
    pinned: true,
    parentId: true,
    createdAt: true,
    updatedAt: true
  }).nullable(),
  recipients: ZRecipientLiteSchema.array(),
  fields: ZFieldSchema.array()
});
/**
 * A lite version of the document response schema without relations.
 */
const ZDocumentLiteSchema = LegacyDocumentSchema.pick({
  visibility: true,
  status: true,
  source: true,
  id: true,
  externalId: true,
  userId: true,
  authOptions: true,
  formValues: true,
  title: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
  deletedAt: true,
  teamId: true,
  folderId: true,
  useLegacyFieldInsertion: true
}).extend({
  envelopeId: z.string(),
  internalVersion: z.number(),
  // Backwards compatibility.
  documentDataId: z.string().default(''),
  // Which "Template" the document was created from.
  templateId: z.number().nullish().describe('The ID of the template that the document was created from, if any.')
});
/**
 * A version of the document response schema when returning multiple documents at once from a single API endpoint.
 */
const ZDocumentManySchema = LegacyDocumentSchema.pick({
  visibility: true,
  status: true,
  source: true,
  id: true,
  externalId: true,
  userId: true,
  authOptions: true,
  formValues: true,
  title: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
  deletedAt: true,
  teamId: true,
  folderId: true,
  useLegacyFieldInsertion: true
}).extend({
  envelopeId: z.string(),
  internalVersion: z.number(),
  // Backwards compatibility.
  documentDataId: z.string().default(''),
  // Which "Template" the document was created from.
  templateId: z.number().nullish().describe('The ID of the template that the document was created from, if any.'),
  user: UserSchema.pick({
    id: true,
    name: true,
    email: true
  }),
  recipients: ZRecipientLiteSchema.array(),
  team: TeamSchema.pick({
    id: true,
    url: true
  }).nullable()
});

export { ZDocumentLiteSchema, ZDocumentManySchema, ZDocumentSchema };
//# sourceMappingURL=document.js.map
