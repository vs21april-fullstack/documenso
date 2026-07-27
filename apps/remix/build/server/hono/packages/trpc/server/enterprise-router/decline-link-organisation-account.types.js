import { z } from 'zod';

const ZDeclineLinkOrganisationAccountRequestSchema = z.object({
  token: z.string()
});
const ZDeclineLinkOrganisationAccountResponseSchema = z.void();

export { ZDeclineLinkOrganisationAccountRequestSchema, ZDeclineLinkOrganisationAccountResponseSchema };
//# sourceMappingURL=decline-link-organisation-account.types.js.map
