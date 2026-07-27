import { ZTemplateManySchema } from '../../../lib/types/template.js';
import { z } from 'zod';

const getTemplatesByIdsMeta = {
  openapi: {
    method: 'POST',
    path: '/template/get-many',
    summary: 'Get multiple templates',
    description: 'Retrieve multiple templates by their IDs',
    tags: ['Template']
  }
};
const ZGetTemplatesByIdsRequestSchema = z.object({
  templateIds: z.array(z.number()).min(1)
});
const ZGetTemplatesByIdsResponseSchema = z.object({
  data: z.array(ZTemplateManySchema)
});

export { ZGetTemplatesByIdsRequestSchema, ZGetTemplatesByIdsResponseSchema, getTemplatesByIdsMeta };
//# sourceMappingURL=get-templates-by-ids.types.js.map
