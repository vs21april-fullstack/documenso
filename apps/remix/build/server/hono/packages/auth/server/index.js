import { NEXT_PUBLIC_WEBAPP_URL } from '../../lib/constants/app.js';
import { AppErrorCode, AppError } from '../../lib/errors/app-error.js';
import { extractRequestMetadata } from '../../lib/universal/extract-request-metadata.js';
import { env } from '../../lib/utils/env.js';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { setCsrfCookie } from './lib/session/session-cookies.js';
import { accountRoute } from './routes/account.js';
import { callbackRoute } from './routes/callback.js';
import { emailPasswordRoute } from './routes/email-password.js';
import { oauthRoute } from './routes/oauth.js';
import { passkeyRoute } from './routes/passkey.js';
import { sessionRoute } from './routes/session.js';
import { signOutRoute } from './routes/sign-out.js';
import { twoFactorRoute } from './routes/two-factor.js';

const isLocalDevelopmentOrigin = origin => {
  if (env('NODE_ENV') === 'production') {
    return false;
  }
  try {
    const {
      hostname
    } = new URL(origin);
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
  } catch {
    return false;
  }
};
// Note: You must chain routes for Hono RPC client to work.
const auth = new Hono().use(async (c, next) => {
  c.set('requestMetadata', extractRequestMetadata(c.req.raw));
  const validOrigin = new URL(NEXT_PUBLIC_WEBAPP_URL()).origin;
  const headerOrigin = c.req.header('Origin');
  if (headerOrigin && headerOrigin !== validOrigin && !isLocalDevelopmentOrigin(headerOrigin)) {
    return c.json({
      message: 'Forbidden',
      statusCode: 403
    }, 403);
  }
  await next();
}).get('/csrf', async c => {
  const csrfToken = await setCsrfCookie(c);
  return c.json({
    csrfToken
  });
}).route('/', sessionRoute).route('/', signOutRoute).route('/', accountRoute).route('/callback', callbackRoute).route('/oauth', oauthRoute).route('/email-password', emailPasswordRoute).route('/passkey', passkeyRoute).route('/two-factor', twoFactorRoute);
/**
 * Handle errors.
 */
auth.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({
      code: AppErrorCode.UNKNOWN_ERROR,
      message: err.message,
      statusCode: err.status
    }, err.status);
  }
  if (err instanceof AppError) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const statusCode = err.statusCode || 500;
    return c.json({
      code: err.code,
      message: err.message,
      statusCode: err.statusCode
    }, statusCode);
  }
  // Handle other errors
  console.error('Unknown Error:', err);
  return c.json({
    code: AppErrorCode.UNKNOWN_ERROR,
    message: 'Internal Server Error',
    statusCode: 500
  }, 500);
});

export { auth };
//# sourceMappingURL=index.js.map
