import { z } from 'zod';
import { RecipientRoleSchema } from '../inputTypeSchemas/RecipientRoleSchema.js';
import { ReadStatusSchema } from '../inputTypeSchemas/ReadStatusSchema.js';
import { SigningStatusSchema } from '../inputTypeSchemas/SigningStatusSchema.js';
import { SendStatusSchema } from '../inputTypeSchemas/SendStatusSchema.js';
import { ZRecipientAuthOptionsSchema } from '../../../../lib/types/document-auth.js';

/////////////////////////////////////////
// RECIPIENT SCHEMA
/////////////////////////////////////////
const RecipientSchema = z.object({
  role: RecipientRoleSchema,
  readStatus: ReadStatusSchema,
  signingStatus: SigningStatusSchema,
  sendStatus: SendStatusSchema,
  id: z.number(),
  envelopeId: z.string(),
  email: z.string(),
  name: z.string(),
  token: z.string(),
  documentDeletedAt: z.coerce.date().nullable(),
  expired: z.coerce.date().nullable(),
  expiresAt: z.coerce.date().nullable(),
  expirationNotifiedAt: z.coerce.date().nullable(),
  sentAt: z.coerce.date().nullable(),
  signedAt: z.coerce.date().nullable(),
  lastReminderSentAt: z.coerce.date().nullable(),
  nextReminderAt: z.coerce.date().nullable(),
  reminderCount: z.number(),
  /**
   * [RecipientAuthOptions]
   */
  authOptions: ZRecipientAuthOptionsSchema.nullable(),
  signingOrder: z.number().describe("The order in which the recipient should sign the document. Only works if the document is set to sequential signing.").nullable(),
  rejectionReason: z.string().nullable()
});

export { RecipientSchema, RecipientSchema as default };
//# sourceMappingURL=RecipientSchema.js.map
