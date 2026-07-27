import { z } from 'zod';

const FieldTypeSchema = z.enum(['SIGNATURE', 'FREE_SIGNATURE', 'INITIALS', 'NAME', 'EMAIL', 'DATE', 'TEXT', 'NUMBER', 'RADIO', 'CHECKBOX', 'DROPDOWN']);

export { FieldTypeSchema };
//# sourceMappingURL=FieldTypeSchema.js.map
