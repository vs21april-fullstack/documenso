import { DocumentDataSchema } from '../../prisma/generated/zod/modelSchema/DocumentDataSchema.js';
import { DocumentMetaSchema } from '../../prisma/generated/zod/modelSchema/DocumentMetaSchema.js';
import { EnvelopeItemSchema } from '../../prisma/generated/zod/modelSchema/EnvelopeItemSchema.js';
import { FolderSchema } from '../../prisma/generated/zod/modelSchema/FolderSchema.js';
import { TeamSchema } from '../../prisma/generated/zod/modelSchema/TeamSchema.js';
import { UserSchema } from '../../prisma/generated/zod/modelSchema/UserSchema.js';
import { TemplateSchema, LegacyTemplateDirectLinkSchema } from '../../prisma/types/template-legacy-schema.js';
import { z } from 'zod';
import { ZFieldSchema } from './field.js';
import { ZRecipientLiteSchema } from './recipient.js';

/**
 * The full template response schema.
 *
 * Mainly used for returning a single template from the API.
 */
const ZTemplateSchema = TemplateSchema.pick({
  type: true,
  visibility: true,
  id: true,
  externalId: true,
  title: true,
  userId: true,
  teamId: true,
  authOptions: true,
  createdAt: true,
  updatedAt: true,
  publicTitle: true,
  publicDescription: true,
  folderId: true
}).extend({
  envelopeId: z.string(),
  // Backwards compatibility.
  templateDocumentDataId: z.string().default(''),
  // Todo: Maybe we want to alter this a bit since this returns a lot of data.
  templateDocumentData: DocumentDataSchema.pick({
    type: true,
    id: true,
    data: true,
    initialData: true
  }).extend({
    envelopeItemId: z.string()
  }),
  templateMeta: DocumentMetaSchema.pick({
    id: true,
    subject: true,
    message: true,
    timezone: true,
    dateFormat: true,
    signingOrder: true,
    typedSignatureEnabled: true,
    uploadSignatureEnabled: true,
    drawSignatureEnabled: true,
    allowDictateNextSigner: true,
    distributionMethod: true,
    redirectUrl: true,
    language: true,
    emailSettings: true,
    emailId: true,
    emailReplyTo: true
  }).extend({
    templateId: z.number().nullable()
  }),
  directLink: LegacyTemplateDirectLinkSchema.nullable(),
  user: UserSchema.pick({
    id: true,
    name: true,
    email: true
  }),
  recipients: ZRecipientLiteSchema.array(),
  fields: ZFieldSchema.array(),
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
  envelopeItems: EnvelopeItemSchema.pick({
    id: true,
    envelopeId: true
  }).array()
});
/**
 * A lite version of the template response schema without relations.
 */
const ZTemplateLiteSchema = TemplateSchema.pick({
  type: true,
  visibility: true,
  id: true,
  externalId: true,
  title: true,
  userId: true,
  teamId: true,
  authOptions: true,
  createdAt: true,
  updatedAt: true,
  publicTitle: true,
  publicDescription: true,
  folderId: true,
  useLegacyFieldInsertion: true
}).extend({
  envelopeId: z.string(),
  // Backwards compatibility.
  templateDocumentDataId: z.string().default('')
});
/**
 * A version of the template response schema when returning multiple template at once from a single API endpoint.
 */
const ZTemplateManySchema = TemplateSchema.pick({
  type: true,
  visibility: true,
  id: true,
  externalId: true,
  title: true,
  userId: true,
  teamId: true,
  authOptions: true,
  createdAt: true,
  updatedAt: true,
  publicTitle: true,
  publicDescription: true,
  folderId: true,
  useLegacyFieldInsertion: true
}).extend({
  envelopeId: z.string(),
  team: TeamSchema.pick({
    id: true,
    url: true,
    name: true
  }).nullable(),
  fields: ZFieldSchema.array(),
  recipients: ZRecipientLiteSchema.array(),
  templateMeta: DocumentMetaSchema.pick({
    signingOrder: true,
    distributionMethod: true
  }).nullable(),
  directLink: LegacyTemplateDirectLinkSchema.pick({
    token: true,
    enabled: true
  }).nullable(),
  // Backwards compatibility.
  templateDocumentDataId: z.string().default('')
});

export { ZTemplateLiteSchema, ZTemplateManySchema, ZTemplateSchema };
//# sourceMappingURL=template.js.map
