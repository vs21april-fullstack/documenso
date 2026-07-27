import { z } from 'zod';

/////////////////////////////////////////
// ORGANISATION MONTHLY STAT SCHEMA
/////////////////////////////////////////
const OrganisationMonthlyStatSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  organisationId: z.string(),
  /**
   * UTC calendar month in `YYYY-MM` form, e.g. "2026-05".
   */
  period: z.string(),
  documentCount: z.number(),
  emailCount: z.number(),
  apiCount: z.number(),
  emailReports: z.number()
});

export { OrganisationMonthlyStatSchema, OrganisationMonthlyStatSchema as default };
//# sourceMappingURL=OrganisationMonthlyStatSchema.js.map
