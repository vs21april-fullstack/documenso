import { z } from 'zod';
import { DocumentVisibilitySchema } from '../inputTypeSchemas/DocumentVisibilitySchema.js';
import { FolderTypeSchema } from '../inputTypeSchemas/FolderTypeSchema.js';

/////////////////////////////////////////
// FOLDER SCHEMA
/////////////////////////////////////////
const FolderSchema = z.object({
  visibility: DocumentVisibilitySchema,
  type: FolderTypeSchema,
  id: z.string(),
  name: z.string(),
  userId: z.number(),
  teamId: z.number(),
  pinned: z.boolean(),
  parentId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

export { FolderSchema, FolderSchema as default };
//# sourceMappingURL=FolderSchema.js.map
