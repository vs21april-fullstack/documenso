import { ZRecipientActionAuthTypesSchema, ZRecipientAccessAuthTypesSchema } from '../../../../lib/types/document-auth.js';
import { ZRecipientEmailSchema, ZRecipientLiteSchema } from '../../../../lib/types/recipient.js';
import { RecipientRole } from '@prisma/client';
import { z } from 'zod';

const updateEnvelopeRecipientsMeta = {
  openapi: {
    method: 'POST',
    path: '/envelope/recipient/update-many',
    summary: 'Update envelope recipients',
    description: 'Update multiple recipients for an envelope',
    tags: ['Envelope Recipients']
  }
};
const ZUpdateEnvelopeRecipientSchema = z.object({
  id: z.number().describe('The ID of the recipient to update.'),
  email: ZRecipientEmailSchema.optional(),
  name: z.string().max(255).optional(),
  role: z.nativeEnum(RecipientRole).optional(),
  signingOrder: z.number().optional(),
  accessAuth: z.array(ZRecipientAccessAuthTypesSchema).default([]).optional(),
  actionAuth: z.array(ZRecipientActionAuthTypesSchema).default([]).optional()
});
const ZUpdateEnvelopeRecipientsRequestSchema = z.object({
  envelopeId: z.string(),
  data: ZUpdateEnvelopeRecipientSchema.array()
});
const ZUpdateEnvelopeRecipientsResponseSchema = z.object({
  data: ZRecipientLiteSchema.array()
});

export { ZUpdateEnvelopeRecipientSchema, ZUpdateEnvelopeRecipientsRequestSchema, ZUpdateEnvelopeRecipientsResponseSchema, updateEnvelopeRecipientsMeta };
//# sourceMappingURL=update-envelope-recipients.types.js.map
