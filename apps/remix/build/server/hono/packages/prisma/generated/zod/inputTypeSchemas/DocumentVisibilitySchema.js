import { z } from 'zod';

const DocumentVisibilitySchema = z.enum(['EVERYONE', 'MANAGER_AND_ABOVE', 'ADMIN']);

export { DocumentVisibilitySchema, DocumentVisibilitySchema as default };
//# sourceMappingURL=DocumentVisibilitySchema.js.map
