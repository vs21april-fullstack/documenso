import { z } from 'zod';
import { DocumentDataTypeSchema } from '../inputTypeSchemas/DocumentDataTypeSchema.js';

/////////////////////////////////////////
// DOCUMENT DATA SCHEMA
/////////////////////////////////////////
const DocumentDataSchema = z.object({
  type: DocumentDataTypeSchema,
  id: z.string(),
  data: z.string(),
  initialData: z.string()
});

export { DocumentDataSchema, DocumentDataSchema as default };
//# sourceMappingURL=DocumentDataSchema.js.map
