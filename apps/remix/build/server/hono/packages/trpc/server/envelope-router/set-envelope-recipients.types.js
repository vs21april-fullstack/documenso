import { ZRecipientActionAuthTypesSchema } from '../../../lib/types/document-auth.js';
import { ZRecipientEmailSchema, ZRecipientLiteSchema } from '../../../lib/types/recipient.js';
import { RecipientRole, EnvelopeType } from '@prisma/client';
import { z } from 'zod';

const ZSetEnvelopeRecipientSchema = z.object({
  id: z.number().optional(),
  email: ZRecipientEmailSchema,
  name: z.string().max(255),
  role: z.nativeEnum(RecipientRole),
  signingOrder: z.number().optional(),
  actionAuth: z.array(ZRecipientActionAuthTypesSchema).optional().default([])
});
const ZSetEnvelopeRecipientsRequestSchema = z.object({
  envelopeId: z.string(),
  envelopeType: z.nativeEnum(EnvelopeType),
  recipients: ZSetEnvelopeRecipientSchema.array()
});
const ZSetEnvelopeRecipientsResponseSchema = z.object({
  data: ZRecipientLiteSchema.omit({
    documentId: true,
    templateId: true
  }).array()
});

export { ZSetEnvelopeRecipientSchema, ZSetEnvelopeRecipientsRequestSchema, ZSetEnvelopeRecipientsResponseSchema };
//# sourceMappingURL=set-envelope-recipients.types.js.map
