import { z } from 'zod';

const ZDocumentFormValuesSchema = z.record(z.string(), z.union([z.string(), z.boolean(), z.number()]));

export { ZDocumentFormValuesSchema };
//# sourceMappingURL=document-form-values.js.map
