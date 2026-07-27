import { DocumentVisibility as DocumentVisibility$1 } from '@prisma/client';
import { z } from 'zod';

const ZDocumentVisibilitySchema = z.nativeEnum(DocumentVisibility$1);
const DocumentVisibility = ZDocumentVisibilitySchema.enum;

export { DocumentVisibility, ZDocumentVisibilitySchema };
//# sourceMappingURL=document-visibility.js.map
