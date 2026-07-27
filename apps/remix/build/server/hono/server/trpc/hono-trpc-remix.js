import { createTrpcContext } from '../../packages/trpc/server/context.js';
import { appRouter } from '../../packages/trpc/server/router.js';
import { handleTrpcRouterError } from '../../packages/trpc/utils/trpc-error-handler.js';
import { trpcServer } from '@hono/trpc-server';

/**
 * Trpc server for internal routes like /api/trpc/*
 */
const reactRouterTrpcServer = trpcServer({
  router: appRouter,
  endpoint: '/api/trpc',
  createContext: async (_, c) => createTrpcContext({
    c,
    requestSource: 'app'
  }),
  onError: opts => handleTrpcRouterError(opts)
});

export { reactRouterTrpcServer };
//# sourceMappingURL=hono-trpc-remix.js.map
