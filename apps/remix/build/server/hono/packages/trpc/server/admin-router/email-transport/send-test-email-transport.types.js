import { z } from 'zod';

const ZSendTestEmailTransportRequestSchema = z.object({
  id: z.string(),
  to: z.string().email()
});
const ZSendTestEmailTransportResponseSchema = z.void();

export { ZSendTestEmailTransportRequestSchema, ZSendTestEmailTransportResponseSchema };
//# sourceMappingURL=send-test-email-transport.types.js.map
