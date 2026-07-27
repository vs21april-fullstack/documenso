import { ZEmailTransportConfigSchema } from '../../../../lib/server-only/email/email-transport-config.js';
import { ZNameSchema } from '../../../../lib/types/name.js';
import { z } from 'zod';

const ZCreateEmailTransportRequestSchema = z.object({
  name: ZNameSchema,
  fromName: ZNameSchema,
  fromAddress: z.string().email(),
  config: ZEmailTransportConfigSchema
});
const ZCreateEmailTransportResponseSchema = z.object({
  id: z.string()
});

export { ZCreateEmailTransportRequestSchema, ZCreateEmailTransportResponseSchema };
//# sourceMappingURL=create-email-transport.types.js.map
