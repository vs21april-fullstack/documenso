import { z } from 'zod';

const BackgroundJobStatusSchema = z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']);

export { BackgroundJobStatusSchema };
//# sourceMappingURL=BackgroundJobStatusSchema.js.map
