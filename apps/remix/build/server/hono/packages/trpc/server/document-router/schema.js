import { DocumentVisibility } from '@prisma/client';
import { z } from 'zod';

const DOCUMENT_TITLE_MAX_LENGTH = 255;
const ZDocumentTitleSchema = z.string().trim().min(1).max(DOCUMENT_TITLE_MAX_LENGTH).describe('The title of the document.');
const ZDocumentExternalIdSchema = z.string().trim().max(255).describe('The external ID of the document.');
const ZDocumentVisibilitySchema = z.nativeEnum(DocumentVisibility).describe('The visibility of the document.');

export { DOCUMENT_TITLE_MAX_LENGTH, ZDocumentExternalIdSchema, ZDocumentTitleSchema, ZDocumentVisibilitySchema };
//# sourceMappingURL=schema.js.map
