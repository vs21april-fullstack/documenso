import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { z } from 'zod';

const ZFindOrganisationStatsRequestSchema = ZFindSearchParamsSchema.extend({
  period: z.string().regex(/^\d{4}-\d{2}$/, 'Period must be in YYYY-MM format.').describe('Filter stats by UTC calendar month in `YYYY-MM` form, e.g. "2026-05".').optional(),
  claimId: z.string().describe('Filter stats by the original subscription claim ID.').optional(),
  orderByColumn: z.enum(['documentCount', 'emailCount', 'apiCount', 'emailReports', 'totalCount']).describe('The column to sort by.').optional(),
  orderByDirection: z.enum(['asc', 'desc']).describe('Sort direction.').default('desc')
});
const ZFindOrganisationStatsResponseSchema = ZFindResultResponse.extend({
  data: z.object({
    id: z.string(),
    organisationId: z.string(),
    organisationName: z.string(),
    originalClaimId: z.string().nullable(),
    period: z.string(),
    documentCount: z.number(),
    emailCount: z.number(),
    apiCount: z.number(),
    emailReports: z.number(),
    documentQuota: z.number().nullable(),
    emailQuota: z.number().nullable(),
    apiQuota: z.number().nullable(),
    totalCount: z.number()
  }).array()
});

export { ZFindOrganisationStatsRequestSchema, ZFindOrganisationStatsResponseSchema };
//# sourceMappingURL=find-organisation-stats.types.js.map
