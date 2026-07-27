import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getApiTokenByToken } from '../../../lib/server-only/public-api/get-api-token-by-token.js';
import { extractRequestMetadata } from '../../../lib/universal/extract-request-metadata.js';
import '../../../lib/universal/id.js';
import { logger } from '../../../lib/utils/logger.js';
import { nanoid } from 'nanoid';

const authenticatedMiddleware = handler => {
  return async (args, {
    request
  }) => {
    const requestMetadata = extractRequestMetadata(request);
    const apiLogger = logger.child({
      ipAddress: requestMetadata.ipAddress,
      userAgent: requestMetadata.userAgent,
      requestId: nanoid()
    });
    const infoToLog = {
      auth: 'api',
      source: 'apiV1',
      path: request.url
    };
    try {
      const {
        authorization
      } = args.headers;
      // Support for both "Authorization: Bearer api_xxx" and "Authorization: api_xxx"
      const [token] = (authorization || '').split('Bearer ').filter(s => s.length > 0);
      if (!token) {
        throw new AppError(AppErrorCode.UNAUTHORIZED, {
          message: 'API token was not provided'
        });
      }
      const apiToken = await getApiTokenByToken({
        token
      });
      if (apiToken.user.disabled) {
        throw new AppError(AppErrorCode.UNAUTHORIZED, {
          message: 'User is disabled'
        });
      }
      apiLogger.info({
        ...infoToLog,
        userId: apiToken.user.id,
        apiTokenId: apiToken.id
      });
      const metadata = {
        requestMetadata,
        source: 'apiV1',
        auth: 'api',
        auditUser: {
          id: apiToken.team ? null : apiToken.user.id,
          email: apiToken.team ? null : apiToken.user.email,
          name: apiToken.team?.name ?? apiToken.user.name
        }
      };
      return await handler({
        ...args,
        req: request
      }, apiToken.user, apiToken.team, {
        metadata,
        logger: apiLogger
      });
    } catch (err) {
      apiLogger.info({
        ...infoToLog,
        error: err
      });
      let message = 'Unauthorized';
      if (err instanceof AppError) {
        if (err.code === AppErrorCode.TOO_MANY_REQUESTS) {
          return {
            status: 429,
            body: {
              message: err.message
            },
            headers: err.headers
          };
        }
        message = err.message;
      }
      return {
        status: 401,
        body: {
          message
        }
      };
    }
  };
};

export { authenticatedMiddleware };
//# sourceMappingURL=authenticated.js.map
