import { searchTemplatesWithKeyword } from '../../../lib/server-only/template/search-templates-with-keyword.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZSearchTemplateRequestSchema, ZSearchTemplateResponseSchema } from './search-template.types.js';

const searchTemplateRoute = authenticatedProcedure.input(ZSearchTemplateRequestSchema).output(ZSearchTemplateResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    query
  } = input;
  const templates = await searchTemplatesWithKeyword({
    query,
    userId: ctx.user.id
  });
  return templates;
});

export { searchTemplateRoute };
//# sourceMappingURL=search-template.js.map
