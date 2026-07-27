import { z } from 'zod';

const ZSearchTemplateRequestSchema = z.object({
  query: z.string().trim().min(1).max(1024)
});
const ZSearchTemplateResponseSchema = z.object({
  title: z.string(),
  path: z.string(),
  value: z.string()
}).array();

export { ZSearchTemplateRequestSchema, ZSearchTemplateResponseSchema };
//# sourceMappingURL=search-template.types.js.map
