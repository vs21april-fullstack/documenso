import { z } from 'zod';

const ZDeleteEmailTransportRequestSchema = z.object({
  id: z.string()
});
const ZDeleteEmailTransportResponseSchema = z.void();

export { ZDeleteEmailTransportRequestSchema, ZDeleteEmailTransportResponseSchema };
//# sourceMappingURL=delete-email-transport.types.js.map
