import { z } from 'zod';

const ZResetOrganisationMonthlyStatRequestSchema = z.object({
  organisationId: z.string(),
  counter: z.enum(['document', 'email', 'api'])
});
const ZResetOrganisationMonthlyStatResponseSchema = z.void();

export { ZResetOrganisationMonthlyStatRequestSchema, ZResetOrganisationMonthlyStatResponseSchema };
//# sourceMappingURL=reset-organisation-monthly-stat.types.js.map
