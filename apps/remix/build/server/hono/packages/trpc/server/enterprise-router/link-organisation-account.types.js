import { z } from 'zod';

const ZLinkOrganisationAccountRequestSchema = z.object({
  token: z.string()
});
const ZLinkOrganisationAccountResponseSchema = z.void();

export { ZLinkOrganisationAccountRequestSchema, ZLinkOrganisationAccountResponseSchema };
//# sourceMappingURL=link-organisation-account.types.js.map
