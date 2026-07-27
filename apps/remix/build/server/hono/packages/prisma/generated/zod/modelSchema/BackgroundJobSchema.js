import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema.js';
import { BackgroundJobStatusSchema } from '../inputTypeSchemas/BackgroundJobStatusSchema.js';

/////////////////////////////////////////
// BACKGROUND JOB SCHEMA
/////////////////////////////////////////
const BackgroundJobSchema = z.object({
  status: BackgroundJobStatusSchema,
  id: z.string(),
  payload: JsonValueSchema.nullable(),
  retried: z.number(),
  maxRetries: z.number(),
  jobId: z.string(),
  name: z.string(),
  version: z.string(),
  submittedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  completedAt: z.coerce.date().nullable(),
  lastRetriedAt: z.coerce.date().nullable()
});

export { BackgroundJobSchema, BackgroundJobSchema as default };
//# sourceMappingURL=BackgroundJobSchema.js.map
