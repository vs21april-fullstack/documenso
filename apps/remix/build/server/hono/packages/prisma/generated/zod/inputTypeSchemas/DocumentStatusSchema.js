import { z } from 'zod';

const DocumentStatusSchema = z.enum(['DRAFT', 'PENDING', 'COMPLETED', 'REJECTED', 'CANCELLED']);

export { DocumentStatusSchema, DocumentStatusSchema as default };
//# sourceMappingURL=DocumentStatusSchema.js.map
