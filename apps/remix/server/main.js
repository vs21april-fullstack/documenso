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
  const basename = build.basename.replace(/\/$/, '');
  const hasBasename = url.pathname === basename || url.pathname.startsWith(`${basename}/`);
  const appPath = hasBasename ? url.pathname.slice(basename.length) || '/' : url.pathname;
  const honoApiPrefixes = [
    '/api/ai',
    '/api/auth',
    '/api/csc',
    '/api/files',
    '/api/jobs',
    '/api/trpc',
    '/api/v1',
    '/api/v2',
    '/api/v2-beta',
  ];
  const isHonoApiRequest = honoApiPrefixes.some(
    (prefix) => appPath === prefix || appPath.startsWith(`${prefix}/`),
  );
  const isStaticAssetRequest =
    appPath.startsWith('/assets/') ||
    appPath.startsWith('/fonts/') ||
    (!appPath.endsWith('.data') && /\/[^/]+\.[a-z0-9]+$/i.test(appPath));

  if (hasBasename && (isHonoApiRequest || isStaticAssetRequest)) {
    url.pathname = appPath;

    return handler.fetch(new Request(url, request));
  }

  if (build.basename === '/' || hasBasename || isHonoApiRequest || isStaticAssetRequest) {
    return handler.fetch(request);
  }

  url.pathname = `${basename}${url.pathname}`;

  return handler.fetch(new Request(url, request));
};

const port = parseInt(process.env.PORT || '3000', 10);

serve({ fetch, port });
