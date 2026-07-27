import { router } from '../trpc.js';
import { createApiTokenRoute } from './create-api-token.js';
import { deleteApiTokenRoute } from './delete-api-token.js';
import { getApiTokensRoute } from './get-api-tokens.js';

const apiTokenRouter = router({
  create: createApiTokenRoute,
  getMany: getApiTokensRoute,
  delete: deleteApiTokenRoute
});

export { apiTokenRouter };
//# sourceMappingURL=router.js.map
