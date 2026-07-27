import { ZFolderTypeSchema } from '../../../lib/types/folder-type.js';
import { ZNameSchema } from '../../../lib/types/name.js';
import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { DocumentVisibility } from '../../../prisma/generated/types.js';
import { FolderSchema } from '../../../prisma/generated/zod/modelSchema/FolderSchema.js';
import { z } from 'zod';

const ZFolderSchema = FolderSchema.pick({
  id: true,
  name: true,
  userId: true,
  teamId: true,
  parentId: true,
  pinned: true,
  createdAt: true,
  updatedAt: true,
  visibility: true,
  type: true
});
const ZFolderCountSchema = z.object({
  documents: z.number(),
  templates: z.number(),
  subfolders: z.number()
});
const ZSubfolderSchema = ZFolderSchema.extend({
  subfolders: z.array(z.any()),
  _count: ZFolderCountSchema
});
const ZFolderWithSubfoldersSchema = ZFolderSchema.extend({
  subfolders: z.array(ZSubfolderSchema),
  _count: ZFolderCountSchema
});
const ZFolderParentIdSchema = z.string().describe('The folder ID to place this folder within. Leave empty to place folder at the root level.');
const ZCreateFolderRequestSchema = z.object({
  name: ZNameSchema,
  parentId: ZFolderParentIdSchema.optional(),
  type: ZFolderTypeSchema.optional()
});
const ZCreateFolderResponseSchema = ZFolderSchema;
const ZUpdateFolderRequestSchema = z.object({
  folderId: z.string().describe('The ID of the folder to update'),
  data: z.object({
    name: ZNameSchema.optional().describe('The name of the folder'),
    parentId: ZFolderParentIdSchema.optional().nullable(),
    visibility: z.nativeEnum(DocumentVisibility).optional().describe('The visibility of the folder'),
    pinned: z.boolean().optional().describe('Whether the folder should be pinned')
  })
});
const ZUpdateFolderResponseSchema = ZFolderSchema;
const ZDeleteFolderRequestSchema = z.object({
  folderId: z.string()
});
const ZGetFoldersSchema = z.object({
  parentId: z.string().nullable().optional(),
  type: ZFolderTypeSchema.optional()
});
const ZGetFoldersResponseSchema = z.object({
  folders: z.array(ZFolderWithSubfoldersSchema),
  breadcrumbs: z.array(ZFolderSchema),
  type: ZFolderTypeSchema.optional()
});
const ZFindFoldersRequestSchema = ZFindSearchParamsSchema.extend({
  parentId: z.string().optional().describe('Filter folders by the parent folder ID'),
  type: ZFolderTypeSchema.optional().describe('Filter folders by the folder type')
});
const ZFindFoldersResponseSchema = ZFindResultResponse.extend({
  data: z.array(ZFolderSchema)
});
const ZFindFoldersInternalRequestSchema = ZFindSearchParamsSchema.extend({
  parentId: z.string().nullable().optional(),
  type: ZFolderTypeSchema.optional()
});
const ZFindFoldersInternalResponseSchema = z.object({
  data: z.array(ZFolderWithSubfoldersSchema),
  breadcrumbs: z.array(ZFolderSchema),
  type: ZFolderTypeSchema.optional()
});

export { ZCreateFolderRequestSchema, ZCreateFolderResponseSchema, ZDeleteFolderRequestSchema, ZFindFoldersInternalRequestSchema, ZFindFoldersInternalResponseSchema, ZFindFoldersRequestSchema, ZFindFoldersResponseSchema, ZFolderSchema, ZFolderWithSubfoldersSchema, ZGetFoldersResponseSchema, ZGetFoldersSchema, ZUpdateFolderRequestSchema, ZUpdateFolderResponseSchema };
//# sourceMappingURL=schema.js.map
