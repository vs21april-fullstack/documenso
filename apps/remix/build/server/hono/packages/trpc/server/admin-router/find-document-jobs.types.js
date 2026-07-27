import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { BackgroundJobSchema } from '../../../prisma/generated/zod/modelSchema/BackgroundJobSchema.js';
import { z } from 'zod';

const ZFindDocumentJobsRequestSchema = ZFindSearchParamsSchema.extend({
  envelopeId: z.string()
});
const ZFindDocumentJobsResponseSchema = ZFindResultResponse.extend({
  data: BackgroundJobSchema.pick({
    status: true,
    id: true,
    retried: true,
    maxRetries: true,
    jobId: true,
    name: true,
    version: true,
    submittedAt: true,
    updatedAt: true,
    completedAt: true,
    lastRetriedAt: true
  }).array()
});

export { ZFindDocumentJobsRequestSchema, ZFindDocumentJobsResponseSchema };
//# sourceMappingURL=find-document-jobs.types.js.map
