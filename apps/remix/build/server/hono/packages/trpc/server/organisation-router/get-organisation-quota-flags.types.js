import { z } from 'zod';

const ZGetOrganisationQuotaFlagsRequestSchema = z.object({
  organisationId: z.string().describe('The ID of the organisation.')
});
/**
 * Booleans only. Raw usage counts and quota caps are intentionally never
 * surfaced to the client.
 */
const ZGetOrganisationQuotaFlagsResponseSchema = z.object({
  isDocumentQuotaExceeded: z.boolean(),
  isEmailQuotaExceeded: z.boolean(),
  isApiQuotaExceeded: z.boolean(),
  isDocumentQuotaNearing: z.boolean(),
  isEmailQuotaNearing: z.boolean(),
  isApiQuotaNearing: z.boolean()
});

export { ZGetOrganisationQuotaFlagsRequestSchema, ZGetOrganisationQuotaFlagsResponseSchema };
//# sourceMappingURL=get-organisation-quota-flags.types.js.map
