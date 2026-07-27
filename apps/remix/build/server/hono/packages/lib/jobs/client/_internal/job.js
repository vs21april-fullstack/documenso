import { z } from 'zod';

const ZSimpleTriggerJobOptionsSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  payload: z.unknown().refine(x => x !== undefined, {
    message: 'payload is required'
  }),
  timestamp: z.number().optional()
});

export { ZSimpleTriggerJobOptionsSchema };
//# sourceMappingURL=job.js.map
