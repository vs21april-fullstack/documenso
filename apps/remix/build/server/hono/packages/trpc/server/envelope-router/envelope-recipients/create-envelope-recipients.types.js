import { ZRecipientActionAuthTypesSchema, ZRecipientAccessAuthTypesSchema } from '../../../../lib/types/document-auth.js';
import { ZRecipientEmailSchema, ZEnvelopeRecipientLiteSchema } from '../../../../lib/types/recipient.js';
import { RecipientRole } from '@prisma/client';
import { z } from 'zod';

const createEnvelopeRecipientsMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/recipient/create-many',
    summary: 'Create envelope recipients',
    description: 'Create multiple recipients for an envelope',
    tags: ['Envelope Recipients']
  }
};
const ZCreateEnvelopeRecipientSchema = z.object({
  email: ZRecipientEmailSchema,
  name: z.string().max(255),
  role: z.nativeEnum(RecipientRole),
  signingOrder: z.number().optional(),
  accessAuth: z.array(ZRecipientAccessAuthTypesSchema).default([]).optional(),
  actionAuth: z.array(ZRecipientActionAuthTypesSchema).default([]).optional()
});
const ZCreateEnvelopeRecipientsRequestSchema = z.object({
  envelopeId: z.string(),
  data: ZCreateEnvelopeRecipientSchema.array()
});
const ZCreateEnvelopeRecipientsResponseSchema = z.object({
  data: ZEnvelopeRecipientLiteSchema.array()
});

export { ZCreateEnvelopeRecipientSchema, ZCreateEnvelopeRecipientsRequestSchema, ZCreateEnvelopeRecipientsResponseSchema, createEnvelopeRecipientsMeta };
//# sourceMappingURL=create-envelope-recipients.types.js.map
