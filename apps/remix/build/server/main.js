/**
 * This is the main entry point for the server which will launch the RR7 application
 * and spin up auth, api, etc.
 *
 * Note:
 *  This file will be copied to the build folder during build time.
 *  Running this file will not work without a build.
 */
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import handle from 'hono-react-router-adapter/node';

import { getLoadContext } from './hono/server/load-context.js';
import server from './hono/server/router.js';
import * as build from './index.js';

server.use(
  serveStatic({
    root: 'build/client',
    onFound: (path, c) => {
      if (path.startsWith('build/client/assets')) {
        // Hard cache assets with hashed file names.
        c.header('Cache-Control', 'public, immutable, max-age=31536000');
      } else {
        // Cache with revalidation for rest of static files.
        c.header('Cache-Control', 'public, max-age=0, stale-while-revalidate=86400');
      }
    },
  }),
);

const handler = handle(build, server, { getLoadContext });

const fetch = async (request) => {
  const url = new URL(request.url);
  const isApiRequest = url.pathname === '/api' || url.pathname.startsWith('/api/');
  const isStaticAssetRequest =
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/fonts/') ||
    (!url.pathname.endsWith('.data') && /\/[^/]+\.[a-z0-9]+$/i.test(url.pathname));

  if (
    build.basename === '/' ||
    url.pathname.startsWith(build.basename) ||
    isApiRequest ||
    isStaticAssetRequest
  ) {
    return handler.fetch(request);
  }

  url.pathname = `${build.basename}${url.pathname}`;

  return handler.fetch(new Request(url, request));
};

const port = parseInt(process.env.PORT || '3000', 10);

serve({ fetch, port });
