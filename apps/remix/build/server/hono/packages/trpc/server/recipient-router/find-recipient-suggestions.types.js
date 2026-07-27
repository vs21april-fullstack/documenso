import { zEmail } from '../../../lib/utils/zod.js';
import { z } from 'zod';

const ZGetRecipientSuggestionsRequestSchema = z.object({
  query: z.string().default('')
});
const ZGetRecipientSuggestionsResponseSchema = z.object({
  results: z.array(z.object({
    name: z.string().nullable(),
    email: z.union([zEmail(), z.literal('')])
  }))
});

export { ZGetRecipientSuggestionsRequestSchema, ZGetRecipientSuggestionsResponseSchema };
//# sourceMappingURL=find-recipient-suggestions.types.js.map
