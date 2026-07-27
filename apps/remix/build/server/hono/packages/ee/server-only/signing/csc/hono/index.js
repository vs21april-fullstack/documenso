import { AppErrorCode, AppError } from '../../../../../lib/errors/app-error.js';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { cscOAuthAuthorizeRoute } from './oauth-authorize.js';
import { cscOAuthCallbackRoute } from './oauth-callback.js';

/**
 * `@documenso/ee` CSC subapp. Mount under `/api/csc` in the remix host (see
 * `apps/remix/server/router.ts`). All CSC endpoints — OAuth authorize +
 * callback — are composed here so the host only has to wire one route.
 *
 * Routes throw `AppError` freely; the `.onError` handler below normalises
 * them into REST responses (mirrors `@documenso/auth/server`'s pattern).
 */
const csc = new Hono().route('/oauth/authorize', cscOAuthAuthorizeRoute).route('/oauth/callback', cscOAuthCallbackRoute);
csc.onError((err, c) => {
  const logger = c.get('logger');
  if (err instanceof HTTPException) {
    return c.json({
      code: AppErrorCode.UNKNOWN_ERROR,
      message: err.message,
      statusCode: err.status
    }, err.status);
  }
  if (err instanceof AppError) {
    const {
      status,
      body
    } = AppError.toRestAPIError(err);
    logger.error({
      event: 'csc.error',
      code: err.code,
      message: err.message
    });
    return c.json(body, status);
  }
  logger.error({
    event: 'csc.unknown_error',
    error: err
  });
  return c.json({
    code: AppErrorCode.UNKNOWN_ERROR,
    message: 'Internal Server Error',
    statusCode: 500
  }, 500);
});

export { csc };
//# sourceMappingURL=index.js.map
