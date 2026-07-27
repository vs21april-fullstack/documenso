import { AppError, genericErrorCodeToTrpcErrorCodeMap } from '../../lib/errors/app-error.js';
import { getApiTokenByToken } from '../../lib/server-only/public-api/get-api-token-by-token.js';
import { assertUserNotDisabled } from '../../lib/server-only/user/assert-user-not-disabled.js';
import { alphaid } from '../../lib/universal/id.js';
import { isAdmin } from '../../lib/utils/is-admin.js';
import { initTRPC, TRPCError } from '@trpc/server';
import { dataTransformer } from '../utils/data-transformer.js';

const t = initTRPC.meta().context().create({
  transformer: dataTransformer,
  errorFormatter(opts) {
    const {
      shape,
      error,
      ctx
    } = opts;
    const originalError = error.cause;
    let data = shape.data;
    // Default unknown errors to 400, since if you're throwing an AppError it is expected
    // that you already know what you're doing.
    if (originalError instanceof AppError) {
      if (originalError.headers && ctx) {
        for (const [headerKey, headerValue] of Object.entries(originalError.headers)) {
          ctx.res.headers.append(headerKey, headerValue);
        }
      }
      data = {
        ...data,
        appError: AppError.toJSON(originalError),
        code: originalError.code,
        httpStatus: originalError.statusCode ?? genericErrorCodeToTrpcErrorCodeMap[originalError.code]?.status ?? 400
      };
    }
    return {
      ...shape,
      data
    };
  }
});
/**
 * Middlewares
 */
const authenticatedMiddleware = t.middleware(async ({
  ctx,
  next,
  path,
  meta
}) => {
  // Auth-independent log bindings. `auth` is set per-branch below since it
  // depends on which auth path was taken; `ctx.metadata.auth` here is still
  // `null` (the resolved value is set in the `next()` call below).
  const baseLogAttributes = {
    path,
    auth: null,
    source: ctx.metadata.source,
    trpcMiddleware: 'authenticated',
    unverifiedTeamId: ctx.teamId
  };
  const authorizationHeader = ctx.req.headers.get('authorization');
  const isApiV2 = Boolean(meta?.openapi?.path);
  // Taken from `authenticatedMiddleware` in `@documenso/api/v1/middleware/authenticated.ts`.
  if (authorizationHeader && isApiV2) {
    // Support for both "Authorization: Bearer api_xxx" and "Authorization: api_xxx"
    const [token] = (authorizationHeader || '').split('Bearer ').filter(s => s.length > 0);
    if (!token) {
      throw new Error('Token was not provided for authenticated middleware');
    }
    const apiToken = await getApiTokenByToken({
      token
    });
    // Reject API requests from a disabled account. The token may still be
    // present in the DB (e.g. before `disableUser` runs) so we enforce here.
    assertUserNotDisabled(apiToken.user);
    const trpcApiV2Logger = ctx.logger.child({
      ...baseLogAttributes,
      auth: 'api',
      userId: apiToken.user.id,
      apiTokenId: apiToken.id
    });
    trpcApiV2Logger.info({
      position: 'trpcProcedure'
    });
    return await next({
      ctx: {
        ...ctx,
        logger: trpcApiV2Logger,
        user: apiToken.user,
        teamId: apiToken.teamId,
        session: null,
        metadata: {
          ...ctx.metadata,
          auditUser: apiToken.team ? {
            id: null,
            email: null,
            name: apiToken.team.name
          } : {
            id: apiToken.user.id,
            email: apiToken.user.email,
            name: apiToken.user.name
          },
          auth: 'api'
        }
      }
    });
  }
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid session or API token.'
    });
  }
  // Reject session requests from a disabled account. The session may still be
  // valid (sessions aren't invalidated by `disableUser`), so we gate every
  // authenticated TRPC call here.
  assertUserNotDisabled(ctx.user);
  // Recreate the logger with a sub request ID to differentiate between batched
  // requests, as well as identifying attributes so every subsequent log line
  // (including errors) inherits them.
  const trpcSessionLogger = ctx.logger.child({
    ...baseLogAttributes,
    auth: 'session',
    nonBatchedRequestId: alphaid(),
    userId: ctx.user.id,
    apiTokenId: null
  });
  trpcSessionLogger.info({
    position: 'trpcProcedure'
  });
  return await next({
    ctx: {
      ...ctx,
      teamId: ctx.teamId || -1,
      logger: trpcSessionLogger,
      user: ctx.user,
      session: ctx.session,
      metadata: {
        ...ctx.metadata,
        auditUser: {
          id: ctx.user.id,
          name: ctx.user.name,
          email: ctx.user.email
        },
        auth: 'session'
      }
    }
  });
});
const maybeAuthenticatedMiddleware = t.middleware(async ({
  ctx,
  next,
  path,
  meta
}) => {
  const baseLogAttributes = {
    path,
    auth: null,
    source: ctx.metadata.source,
    trpcMiddleware: 'maybeAuthenticated',
    unverifiedTeamId: ctx.teamId
  };
  const authorizationHeader = ctx.req.headers.get('authorization');
  const isApiV2 = Boolean(meta?.openapi?.path);
  // Taken from `authenticatedMiddleware` in `@documenso/api/v1/middleware/authenticated.ts`.
  if (authorizationHeader && isApiV2) {
    // Support for both "Authorization: Bearer api_xxx" and "Authorization: api_xxx"
    const [token] = (authorizationHeader || '').split('Bearer ').filter(s => s.length > 0);
    if (!token) {
      throw new Error('Token was not provided for authenticated middleware');
    }
    const apiToken = await getApiTokenByToken({
      token
    });
    // Reject API requests from a disabled account. Presenting an API token is
    // an explicit attempt to act under that account, so we don't downgrade to
    // anonymous here — we reject.
    assertUserNotDisabled(apiToken.user);
    // Attach identifying attributes to the logger so every subsequent log line
    // within this request (including errors) inherits them.
    const trpcApiV2Logger = ctx.logger.child({
      ...baseLogAttributes,
      auth: 'api',
      userId: apiToken.user.id,
      apiTokenId: apiToken.id
    });
    trpcApiV2Logger.info({
      position: 'trpcProcedure'
    });
    return await next({
      ctx: {
        ...ctx,
        logger: trpcApiV2Logger,
        user: apiToken.user,
        teamId: apiToken.teamId,
        session: null,
        metadata: {
          ...ctx.metadata,
          auditUser: apiToken.team ? {
            id: null,
            email: null,
            name: apiToken.team.name
          } : {
            id: apiToken.user.id,
            email: apiToken.user.email,
            name: apiToken.user.name
          },
          auth: 'api'
        }
      }
    });
  }
  // Treat a disabled session as anonymous. Most routes wired through
  // `maybeAuthenticatedProcedure` are signer/invite flows that key off an
  // input token rather than `ctx.user`, so downgrading lets those keep
  // working while routes that genuinely need an account naturally fall
  // through to their own auth checks.
  const sessionUser = ctx.user && !ctx.user.disabled ? ctx.user : null;
  const sessionRecord = sessionUser ? ctx.session : null;
  // Resolve `auth` once so it stays in sync between the logger bindings and
  // the outgoing metadata.
  const auth = sessionRecord ? 'session' : null;
  // Recreate the logger with a sub request ID to differentiate between batched
  // requests, as well as identifying attributes so every subsequent log line
  // (including errors) inherits them.
  const trpcSessionLogger = ctx.logger.child({
    ...baseLogAttributes,
    auth,
    nonBatchedRequestId: alphaid(),
    userId: sessionUser?.id,
    apiTokenId: null
  });
  trpcSessionLogger.info({
    position: 'trpcProcedure'
  });
  return await next({
    ctx: {
      ...ctx,
      logger: trpcSessionLogger,
      user: sessionUser,
      session: sessionRecord,
      metadata: {
        ...ctx.metadata,
        auditUser: sessionUser ? {
          id: sessionUser.id,
          name: sessionUser.name,
          email: sessionUser.email
        } : undefined,
        auth
      }
    }
  });
});
const adminMiddleware = t.middleware(async ({
  ctx,
  next,
  path
}) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action.'
    });
  }
  // Disabled admins shouldn't be able to do anything either.
  assertUserNotDisabled(ctx.user);
  const isUserAdmin = isAdmin(ctx.user);
  if (!isUserAdmin) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Not authorized to perform this action.'
    });
  }
  // Recreate the logger with a sub request ID to differentiate between batched
  // requests, as well as identifying attributes so every subsequent log line
  // (including errors) inherits them.
  const trpcSessionLogger = ctx.logger.child({
    nonBatchedRequestId: alphaid(),
    unverifiedTeamId: ctx.teamId,
    path,
    auth: 'session',
    source: ctx.metadata.source,
    userId: ctx.user.id,
    apiTokenId: null,
    trpcMiddleware: 'admin'
  });
  trpcSessionLogger.info({
    position: 'trpcProcedure'
  });
  return await next({
    ctx: {
      ...ctx,
      logger: trpcSessionLogger,
      user: ctx.user,
      session: ctx.session,
      metadata: {
        ...ctx.metadata,
        auditUser: {
          id: ctx.user.id,
          name: ctx.user.name,
          email: ctx.user.email
        },
        auth: 'session'
      }
    }
  });
});
const procedureMiddleware = t.middleware(async ({
  ctx,
  next,
  path
}) => {
  // Recreate the logger with a sub request ID to differentiate between batched
  // requests, as well as identifying attributes so every subsequent log line
  // (including errors) inherits them.
  const trpcSessionLogger = ctx.logger.child({
    nonBatchedRequestId: alphaid(),
    unverifiedTeamId: ctx.teamId,
    path,
    auth: ctx.metadata.auth,
    source: ctx.metadata.source,
    userId: ctx.user?.id,
    apiTokenId: null,
    trpcMiddleware: 'procedure'
  });
  trpcSessionLogger.info({
    position: 'trpcProcedure'
  });
  return await next({
    ctx: {
      ...ctx,
      logger: trpcSessionLogger
    }
  });
});
/**
 * Routers and Procedures
 */
const router = t.router;
const procedure = t.procedure.use(procedureMiddleware);
const authenticatedProcedure = t.procedure.use(authenticatedMiddleware);
// While this is functionally the same as `procedure`, it's useful for indicating purpose
const maybeAuthenticatedProcedure = t.procedure.use(maybeAuthenticatedMiddleware);
const adminProcedure = t.procedure.use(adminMiddleware);

export { adminMiddleware, adminProcedure, authenticatedMiddleware, authenticatedProcedure, maybeAuthenticatedMiddleware, maybeAuthenticatedProcedure, procedure, procedureMiddleware, router };
//# sourceMappingURL=trpc.js.map
