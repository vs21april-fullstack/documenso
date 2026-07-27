import { z } from 'zod';

const ZReregisterEmailDomainRequestSchema = z.object({
  emailDomainId: z.string()
});
const ZReregisterEmailDomainResponseSchema = z.void();

export { ZReregisterEmailDomainRequestSchema, ZReregisterEmailDomainResponseSchema };
//# sourceMappingURL=reregister-email-domain.types.js.map
