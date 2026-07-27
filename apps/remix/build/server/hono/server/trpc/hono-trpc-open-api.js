import { API_V2_BETA_URL, API_V2_URL } from '../../packages/lib/constants/app.js';
import { AppError, genericErrorCodeToTrpcErrorCodeMap } from '../../packages/lib/errors/app-error.js';
import { createTrpcContext } from '../../packages/trpc/server/context.js';
import { appRouter } from '../../packages/trpc/server/router.js';
import { createOpenApiFetchHandler } from '../../packages/trpc/utils/openapi-fetch-handler.js';
import { handleTrpcRouterError } from '../../packages/trpc/utils/trpc-error-handler.js';

const openApiTrpcServerHandler = async (c, {
  isBeta
}) => {
  return createOpenApiFetchHandler({
    endpoint: isBeta ? API_V2_BETA_URL : API_V2_URL,
    router: appRouter,
    createContext: async () => createTrpcContext({
      c,
      requestSource: 'apiV2'
    }),
    req: c.req.raw,
    onError: opts => handleTrpcRouterError(opts),
    // Not sure why we need to do this since we handle it in errorFormatter which runs after this.
    responseMeta: opts => {
      if (opts.errors[0]?.cause instanceof AppError) {
        const appError = AppError.parseError(opts.errors[0].cause);
        const httpStatus = genericErrorCodeToTrpcErrorCodeMap[appError.code]?.status ?? 400;
        return {
          status: httpStatus
        };
      }
      return {};
    }
  });
};

export { openApiTrpcServerHandler };
//# sourceMappingURL=hono-trpc-open-api.js.map
