import { getContext } from 'hono/context-storage';
import { CSP_NONCE_KEY } from './security-headers.js';

/**
 * Builds the React Router `AppLoadContext` for both dev (vite plugin) and
 * production (`hono-react-router-adapter/node`).
 *
 * The Hono context isn't passed directly by the adapter, so we read it via
 * `hono/context-storage`, which is enabled in `server/router.ts`.
 */
const getLoadContext = () => {
  const nonce = getContext().var[CSP_NONCE_KEY] ?? '';
  return {
    nonce
  };
};

export { getLoadContext };
//# sourceMappingURL=load-context.js.map
