import { ZEditorEnvelopeSchema } from '../../../lib/types/envelope-editor.js';
import { z } from 'zod';

const ZGetEditorEnvelopeRequestSchema = z.object({
  envelopeId: z.string()
});
const ZGetEditorEnvelopeResponseSchema = ZEditorEnvelopeSchema;

export { ZGetEditorEnvelopeRequestSchema, ZGetEditorEnvelopeResponseSchema };
//# sourceMappingURL=get-editor-envelope.types.js.map
