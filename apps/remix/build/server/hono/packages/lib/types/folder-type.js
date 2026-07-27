import { z } from 'zod';

const FolderType = {
  DOCUMENT: 'DOCUMENT',
  TEMPLATE: 'TEMPLATE'
};
const ZFolderTypeSchema = z.enum([FolderType.DOCUMENT, FolderType.TEMPLATE]);

export { FolderType, ZFolderTypeSchema };
//# sourceMappingURL=folder-type.js.map
