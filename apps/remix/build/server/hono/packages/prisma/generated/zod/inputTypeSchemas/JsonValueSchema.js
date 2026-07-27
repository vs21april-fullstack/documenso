import { z } from 'zod';

const JsonValueSchema = z.lazy(() => z.union([z.string(), z.number(), z.boolean(), z.literal(null), z.record(z.string(), z.lazy(() => JsonValueSchema.optional())), z.array(z.lazy(() => JsonValueSchema))]));

export { JsonValueSchema };
//# sourceMappingURL=JsonValueSchema.js.map
