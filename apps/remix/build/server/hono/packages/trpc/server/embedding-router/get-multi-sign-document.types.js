import { ZDocumentLiteSchema } from '../../../lib/types/document.js';
import { ZRecipientLiteSchema } from '../../../lib/types/recipient.js';
import { DocumentDataSchema } from '../../../prisma/generated/zod/modelSchema/DocumentDataSchema.js';
import { DocumentMetaSchema } from '../../../prisma/generated/zod/modelSchema/DocumentMetaSchema.js';
import { EnvelopeItemSchema } from '../../../prisma/generated/zod/modelSchema/EnvelopeItemSchema.js';
import { FieldSchema } from '../../../prisma/generated/zod/modelSchema/FieldSchema.js';
import { SignatureSchema } from '../../../prisma/generated/zod/modelSchema/SignatureSchema.js';
import { z } from 'zod';

const ZGetMultiSignDocumentRequestSchema = z.object({
  token: z.string().min(1, {
    message: 'Token is required'
  })
});
const ZGetMultiSignDocumentResponseSchema = ZDocumentLiteSchema.extend({
  documentData: DocumentDataSchema.pick({
    type: true,
    id: true,
    data: true,
    initialData: true
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
    emailSettings: true
  }).nullable(),
  fields: z.array(FieldSchema.extend({
    recipient: ZRecipientLiteSchema,
    signature: SignatureSchema.nullable()
  })),
  envelopeItems: EnvelopeItemSchema.pick({
    id: true,
    envelopeId: true
  }).array()
});

export { ZGetMultiSignDocumentRequestSchema, ZGetMultiSignDocumentResponseSchema };
//# sourceMappingURL=get-multi-sign-document.types.js.map
