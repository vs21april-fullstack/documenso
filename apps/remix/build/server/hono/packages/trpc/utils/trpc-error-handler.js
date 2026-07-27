import { AppErrorCode, AppError } from '../../lib/errors/app-error.js';
import { logger } from '../../lib/utils/logger.js';

// Parameters<NonNullable<Parameters<typeof trpcServer>[0]['onError']>>[0], // :-)
const handleTrpcRouterError = ({
  error,
  ctx,
  path
}, _source) => {
  const appError = AppError.parseError(error.cause || error);
  const isAppError = error.cause instanceof AppError;
  // Only log AppErrors that are explicitly set to 500 or the error code
  // is in the errorCodesToAlertOn list.
  const isLoggableAppError = isAppError && (appError.statusCode === 500 || errorCodesToAlertOn.includes(appError.code));
  // Only log TRPC errors that are in the `errorCodesToAlertOn` list and is
  // not an AppError.
  const isLoggableTrpcError = !isAppError && errorCodesToAlertOn.includes(error.code);
  const errorLogger = (ctx?.logger || logger).child({
    status: 'error',
    appError: AppError.toJSON(appError),
    path
  });
  // Only fully log the error on certain conditions since some errors are expected.
  if (isLoggableAppError || isLoggableTrpcError) {
    errorLogger.error(error);
  } else {
    errorLogger.info('TRPC_ERROR_HANDLER');
  }
};
const errorCodesToAlertOn = [AppErrorCode.UNKNOWN_ERROR, 'INTERNAL_SERVER_ERROR'];

export { handleTrpcRouterError };
//# sourceMappingURL=trpc-error-handler.js.map
