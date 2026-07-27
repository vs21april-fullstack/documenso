import { DocumentMetaSchema } from '../../prisma/generated/zod/modelSchema/DocumentMetaSchema.js';
import { EnvelopeItemSchema } from '../../prisma/generated/zod/modelSchema/EnvelopeItemSchema.js';
import { EnvelopeSchema } from '../../prisma/generated/zod/modelSchema/EnvelopeSchema.js';
import { TeamSchema } from '../../prisma/generated/zod/modelSchema/TeamSchema.js';
import { TemplateDirectLinkSchema } from '../../prisma/generated/zod/modelSchema/TemplateDirectLinkSchema.js';
import { z } from 'zod';
import { ZEnvelopeFieldSchema } from './field.js';
import { ZEnvelopeRecipientLiteSchema } from './recipient.js';

/**
 * The full envelope response schema.
 *
 * Mainly used for returning a single envelope from the API.
 */
const ZEnvelopeSchema = EnvelopeSchema.pick({
  internalVersion: true,
  type: true,
  status: true,
  source: true,
  visibility: true,
  templateType: true,
  id: true,
  secondaryId: true,
  externalId: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
  deletedAt: true,
  title: true,
  authOptions: true,
  formValues: true,
  publicTitle: true,
  publicDescription: true,
  userId: true,
  teamId: true,
  folderId: true,
  templateId: true
}).extend({
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
    envelopeExpirationPeriod: true
  }),
  recipients: ZEnvelopeRecipientLiteSchema.array(),
  fields: ZEnvelopeFieldSchema.array(),
  envelopeItems: EnvelopeItemSchema.pick({
    envelopeId: true,
    documentDataId: true,
    id: true,
    title: true,
    order: true
  }).array(),
  directLink: TemplateDirectLinkSchema.pick({
    directTemplateRecipientId: true,
    enabled: true,
    id: true,
    token: true
  }).nullable(),
  team: TeamSchema.pick({
    id: true,
    url: true
  }),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string()
  })
});
/**
 * A lite version of the envelope response schema without relations.
 */
const ZEnvelopeLiteSchema = EnvelopeSchema.pick({
  internalVersion: true,
  type: true,
  status: true,
  source: true,
  visibility: true,
  templateType: true,
  id: true,
  secondaryId: true,
  externalId: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
  deletedAt: true,
  title: true,
  authOptions: true,
  formValues: true,
  publicTitle: true,
  publicDescription: true,
  userId: true,
  teamId: true,
  folderId: true
});
/**
 * A version of the envelope response schema when returning multiple envelopes at once from a single API endpoint.
 */
const ZEnvelopeManySchema = EnvelopeSchema.pick({
  internalVersion: true,
  type: true,
  status: true,
  source: true,
  visibility: true,
  templateType: true,
  id: true,
  secondaryId: true,
  externalId: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
  deletedAt: true,
  title: true,
  authOptions: true,
  formValues: true,
  publicTitle: true,
  publicDescription: true,
  userId: true,
  teamId: true,
  folderId: true,
  templateId: true
}).extend({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string()
  }),
  recipients: ZEnvelopeRecipientLiteSchema.array(),
  team: TeamSchema.pick({
    id: true,
    url: true
  }).nullable()
});

export { ZEnvelopeLiteSchema, ZEnvelopeManySchema, ZEnvelopeSchema };
//# sourceMappingURL=envelope.js.map
