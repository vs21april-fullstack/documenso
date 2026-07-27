import { isTemplateRecipientEmailPlaceholder } from '../../../lib/constants/template.js';
import { ZRecipientActionAuthTypesSchema, ZRecipientAccessAuthTypesSchema, ZRecipientAccessAuthSchema, ZRecipientActionAuthSchema } from '../../../lib/types/document-auth.js';
import { ZRecipientLiteSchema, ZRecipientSchema } from '../../../lib/types/recipient.js';
import { zEmail } from '../../../lib/utils/zod.js';
import { RecipientRole } from '@prisma/client';
import { z } from 'zod';

const ZGetRecipientRequestSchema = z.object({
  recipientId: z.number()
});
const ZGetRecipientResponseSchema = ZRecipientSchema;
/**
 * When changing this, ensure everything that uses this schema is updated correctly
 * since this will change the Openapi schema.
 *
 * Example `createDocument` uses this, so you will need to update that function to
 * pass along required details.
 */
const ZCreateRecipientSchema = z.object({
  email: zEmail().toLowerCase().min(1).max(254),
  name: z.string().max(255),
  role: z.nativeEnum(RecipientRole),
  signingOrder: z.number().optional(),
  accessAuth: z.array(ZRecipientAccessAuthTypesSchema).default([]).optional(),
  actionAuth: z.array(ZRecipientActionAuthTypesSchema).default([]).optional()
});
const ZUpdateRecipientSchema = z.object({
  id: z.number().describe('The ID of the recipient to update.'),
  email: zEmail().toLowerCase().min(1).max(254).optional(),
  name: z.string().max(255).optional(),
  role: z.nativeEnum(RecipientRole).optional(),
  signingOrder: z.number().optional(),
  accessAuth: z.array(ZRecipientAccessAuthTypesSchema).default([]).optional(),
  actionAuth: z.array(ZRecipientActionAuthTypesSchema).default([]).optional()
});
const ZCreateDocumentRecipientRequestSchema = z.object({
  documentId: z.number(),
  recipient: ZCreateRecipientSchema
});
const ZCreateDocumentRecipientResponseSchema = ZRecipientLiteSchema;
const ZCreateDocumentRecipientsRequestSchema = z.object({
  documentId: z.number(),
  recipients: z.array(ZCreateRecipientSchema)
});
const ZCreateDocumentRecipientsResponseSchema = z.object({
  recipients: ZRecipientLiteSchema.array()
});
const ZUpdateDocumentRecipientRequestSchema = z.object({
  documentId: z.number(),
  recipient: ZUpdateRecipientSchema
});
const ZUpdateDocumentRecipientResponseSchema = ZRecipientSchema;
const ZUpdateDocumentRecipientsRequestSchema = z.object({
  documentId: z.number(),
  recipients: z.array(ZUpdateRecipientSchema)
});
const ZUpdateDocumentRecipientsResponseSchema = z.object({
  recipients: z.array(ZRecipientSchema)
});
const ZDeleteDocumentRecipientRequestSchema = z.object({
  recipientId: z.number()
});
const ZSetDocumentRecipientsRequestSchema = z.object({
  documentId: z.number(),
  recipients: z.array(z.object({
    id: z.number().optional(),
    email: zEmail().toLowerCase().min(1).max(254),
    name: z.string().max(255),
    role: z.nativeEnum(RecipientRole),
    signingOrder: z.number().optional(),
    actionAuth: z.array(ZRecipientActionAuthTypesSchema).optional().default([])
  }))
});
const ZSetDocumentRecipientsResponseSchema = z.object({
  recipients: ZRecipientLiteSchema.array()
});
const ZCreateTemplateRecipientRequestSchema = z.object({
  templateId: z.number(),
  recipient: ZCreateRecipientSchema
});
const ZCreateTemplateRecipientResponseSchema = ZRecipientLiteSchema;
const ZCreateTemplateRecipientsRequestSchema = z.object({
  templateId: z.number(),
  recipients: z.array(ZCreateRecipientSchema)
});
const ZCreateTemplateRecipientsResponseSchema = z.object({
  recipients: ZRecipientLiteSchema.array()
});
const ZUpdateTemplateRecipientRequestSchema = z.object({
  templateId: z.number(),
  recipient: ZUpdateRecipientSchema
});
const ZUpdateTemplateRecipientResponseSchema = ZRecipientSchema;
const ZUpdateTemplateRecipientsRequestSchema = z.object({
  templateId: z.number(),
  recipients: z.array(ZUpdateRecipientSchema)
});
const ZUpdateTemplateRecipientsResponseSchema = z.object({
  recipients: z.array(ZRecipientSchema)
});
const ZDeleteTemplateRecipientRequestSchema = z.object({
  recipientId: z.number()
});
const ZSetTemplateRecipientsRequestSchema = z.object({
  templateId: z.number(),
  recipients: z.array(z.object({
    id: z.number().optional(),
    email: z.string().toLowerCase().refine(email => {
      return isTemplateRecipientEmailPlaceholder(email) || zEmail().safeParse(email).success;
    }, {
      message: 'Please enter a valid email address'
    }),
    name: z.string(),
    role: z.nativeEnum(RecipientRole),
    signingOrder: z.number().optional(),
    actionAuth: z.array(ZRecipientActionAuthTypesSchema).optional().default([])
  }))
});
const ZSetTemplateRecipientsResponseSchema = z.object({
  recipients: ZRecipientLiteSchema.array()
});
const ZCompleteDocumentWithTokenMutationSchema = z.object({
  token: z.string(),
  documentId: z.number(),
  accessAuthOptions: ZRecipientAccessAuthSchema.optional(),
  nextSigner: z.object({
    email: zEmail().max(254),
    name: z.string().min(1).max(255)
  }).optional(),
  recipientOverride: z.object({
    email: zEmail().trim().toLowerCase().max(254).optional(),
    name: z.string().max(255).optional()
  }).optional()
});
/**
 * Discriminated response: SES envelopes return `{ status: 'SIGNED' }` after
 * the in-place completion; TSP (AES/QES) envelopes return
 * `{ status: 'REDIRECT', redirectUrl }` pointing at the credential-scope
 * OAuth authorize endpoint. Frontend callers can branch on `status` —
 * existing callers ignored the response and remain compatible.
 */
const ZCompleteDocumentWithTokenResponseSchema = z.discriminatedUnion('status', [z.object({
  status: z.literal('REDIRECT'),
  redirectUrl: z.string()
}), z.object({
  status: z.literal('SIGNED')
})]);
const ZRejectDocumentWithTokenMutationSchema = z.object({
  token: z.string(),
  documentId: z.number(),
  reason: z.string(),
  authOptions: ZRecipientActionAuthSchema.optional()
});

export { ZCompleteDocumentWithTokenMutationSchema, ZCompleteDocumentWithTokenResponseSchema, ZCreateDocumentRecipientRequestSchema, ZCreateDocumentRecipientResponseSchema, ZCreateDocumentRecipientsRequestSchema, ZCreateDocumentRecipientsResponseSchema, ZCreateRecipientSchema, ZCreateTemplateRecipientRequestSchema, ZCreateTemplateRecipientResponseSchema, ZCreateTemplateRecipientsRequestSchema, ZCreateTemplateRecipientsResponseSchema, ZDeleteDocumentRecipientRequestSchema, ZDeleteTemplateRecipientRequestSchema, ZGetRecipientRequestSchema, ZGetRecipientResponseSchema, ZRejectDocumentWithTokenMutationSchema, ZSetDocumentRecipientsRequestSchema, ZSetDocumentRecipientsResponseSchema, ZSetTemplateRecipientsRequestSchema, ZSetTemplateRecipientsResponseSchema, ZUpdateDocumentRecipientRequestSchema, ZUpdateDocumentRecipientResponseSchema, ZUpdateDocumentRecipientsRequestSchema, ZUpdateDocumentRecipientsResponseSchema, ZUpdateRecipientSchema, ZUpdateTemplateRecipientRequestSchema, ZUpdateTemplateRecipientResponseSchema, ZUpdateTemplateRecipientsRequestSchema, ZUpdateTemplateRecipientsResponseSchema };
//# sourceMappingURL=schema.js.map
