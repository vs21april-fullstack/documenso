import { AppError } from '../../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { AuthenticationErrorCode } from '../errors/error-codes.js';
import { validateSessionToken } from '../session/session.js';
import { getSessionCookie } from '../session/session-cookies.js';

const getSession = async c => {
  const {
    session,
    user
  } = await getOptionalSession(mapRequestToContextForCookie(c));
  if (session && user) {
    return {
      session,
      user
    };
  }
  if (c instanceof Request) {
    throw new Error('Unauthorized');
  }
  throw new AppError(AuthenticationErrorCode.Unauthorized);
};
const getOptionalSession = async c => {
  const sessionId = await getSessionCookie(mapRequestToContextForCookie(c));
  if (!sessionId) {
    return {
      isAuthenticated: false,
      session: null,
      user: null
    };
  }
  return await validateSessionToken(sessionId);
};
const getActiveSessions = async c => {
  const {
    user
  } = await getSession(c);
  return await prismaWithReplicas.session.findMany({
    where: {
      userId: user.id,
      expiresAt: {
        gt: new Date()
      }
    },
    orderBy: {
      updatedAt: 'desc'
    },
    select: {
      id: true,
      userId: true,
      expiresAt: true,
      updatedAt: true,
      createdAt: true,
      ipAddress: true,
      userAgent: true
    }
  });
};
/**
 * Todo: (RR7) Rethink, this is pretty sketchy.
 */
const mapRequestToContextForCookie = c => {
  if (c instanceof Request) {
    const partialContext = {
      req: {
        raw: c
      }
    };
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return partialContext;
  }
  return c;
};

export { getActiveSessions, getOptionalSession, getSession };
//# sourceMappingURL=get-session.js.map
