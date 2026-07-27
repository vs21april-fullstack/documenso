import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { getIpAddress } from '../../universal/get-ip-address.js';

/**
 * Set rate limit response headers on a Hono context.
 */
const setRateLimitHeaders = (c, result) => {
  c.header('X-RateLimit-Limit', String(result.limit));
  c.header('X-RateLimit-Remaining', String(result.remaining));
  c.header('X-RateLimit-Reset', String(Math.ceil(result.reset.getTime() / 1000)));
};
/**
 * Create a Hono middleware that applies rate limiting to a route.
 *
 * Uses IP address for identification. Optionally accepts an identifier
 * function for per-user/per-entity limiting.
 */
const createRateLimitMiddleware = (limiter, options) => {
  return async (c, next) => {
    let ip;
    try {
      ip = getIpAddress(c.req.raw);
    } catch {
      ip = 'unknown';
    }
    const identifier = options?.identifierFn?.(c);
    const result = await limiter.check({
      ip,
      identifier
    });
    setRateLimitHeaders(c, result);
    if (result.isLimited) {
      c.header('Retry-After', String(Math.max(1, Math.ceil((result.reset.getTime() - Date.now()) / 1000))));
      return c.json({
        error: 'Too many requests, please try again later.'
      }, 429);
    }
    await next();
  };
};
/**
 * Helper for inline rate limit checks in Hono auth routes.
 *
 * Returns a 429 Response with rate limit headers if limited, or `null` if allowed.
 */
const rateLimitResponse = (c, result) => {
  setRateLimitHeaders(c, result);
  if (result.isLimited) {
    c.header('Retry-After', String(Math.max(1, Math.ceil((result.reset.getTime() - Date.now()) / 1000))));
    return c.json({
      error: 'Too many requests, please try again later.'
    }, 429);
  }
  return null;
};
/**
 * Helper for inline rate limit checks in tRPC routes.
 *
 * Throws an AppError with TOO_MANY_REQUESTS code if limited.
 */
const assertRateLimit = result => {
  if (result.isLimited) {
    const retryAfter = String(Math.max(1, Math.ceil((result.reset.getTime() - Date.now()) / 1000)));
    throw new AppError(AppErrorCode.TOO_MANY_REQUESTS, {
      message: 'Too many requests, please try again later.',
      headers: {
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(Math.ceil(result.reset.getTime() / 1000)),
        'Retry-After': retryAfter
      }
    });
  }
};

export { assertRateLimit, createRateLimitMiddleware, rateLimitResponse };
//# sourceMappingURL=rate-limit-middleware.js.map
