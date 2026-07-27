import { z } from 'zod';
import { ZEnvelopeAttachmentTypeSchema } from '../../../../lib/types/envelope-attachment.js';

/////////////////////////////////////////
// ENVELOPE ATTACHMENT SCHEMA
/////////////////////////////////////////
const EnvelopeAttachmentSchema = z.object({
  id: z.string(),
  /**
   * [EnvelopeAttachmentType]
   */
  type: ZEnvelopeAttachmentTypeSchema,
  label: z.string(),
  data: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  envelopeId: z.string()
});

export { EnvelopeAttachmentSchema };
//# sourceMappingURL=EnvelopeAttachmentSchema.js.map
