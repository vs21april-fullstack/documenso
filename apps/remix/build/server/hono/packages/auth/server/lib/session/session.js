import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase, encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import { UserSecurityAuditLogType } from '@prisma/client';
import { AUTH_SESSION_LIFETIME } from '../../config.js';

const generateSessionToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};
const createSession = async (token, userId, metadata) => {
  const hashedSessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = {
    id: hashedSessionId,
    sessionToken: hashedSessionId,
    userId,
    updatedAt: new Date(),
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + AUTH_SESSION_LIFETIME),
    ipAddress: metadata.ipAddress ?? null,
    userAgent: metadata.userAgent ?? null
  };
  await prismaWithReplicas.session.create({
    data: session
  });
  await prismaWithReplicas.userSecurityAuditLog.create({
    data: {
      userId,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
      type: UserSecurityAuditLogType.SIGN_IN
    }
  });
  return session;
};
const validateSessionToken = async token => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prismaWithReplicas.session.findUnique({
    where: {
      id: sessionId
    },
    include: {
      user: {
        /**
         * Do not expose anything sensitive here.
         */
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          avatarImageId: true,
          twoFactorEnabled: true,
          roles: true,
          signature: true,
          disabled: true
        }
      }
    }
  });
  if (!result?.user) {
    return {
      session: null,
      user: null,
      isAuthenticated: false
    };
  }
  const {
    user,
    ...session
  } = result;
  if (Date.now() >= session.expiresAt.getTime()) {
    await prismaWithReplicas.session.delete({
      where: {
        id: sessionId
      }
    });
    return {
      session: null,
      user: null,
      isAuthenticated: false
    };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prismaWithReplicas.session.update({
      where: {
        id: session.id
      },
      data: {
        expiresAt: session.expiresAt
      }
    });
  }
  return {
    session,
    user,
    isAuthenticated: true
  };
};
const invalidateSessions = async ({
  userId,
  sessionIds,
  metadata,
  isRevoke
}) => {
  if (sessionIds.length === 0) {
    return;
  }
  await prismaWithReplicas.$transaction(async tx => {
    const {
      count
    } = await tx.session.deleteMany({
      where: {
        userId,
        id: {
          in: sessionIds
        }
      }
    });
    if (count !== sessionIds.length) {
      throw new AppError(AppErrorCode.INVALID_REQUEST, {
        message: 'One or more sessions are not valid.'
      });
    }
    await tx.userSecurityAuditLog.createMany({
      data: sessionIds.map(() => ({
        userId,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
        type: isRevoke ? UserSecurityAuditLogType.SESSION_REVOKED : UserSecurityAuditLogType.SIGN_OUT
      }))
    });
  });
};

export { createSession, generateSessionToken, invalidateSessions, validateSessionToken };
//# sourceMappingURL=session.js.map
