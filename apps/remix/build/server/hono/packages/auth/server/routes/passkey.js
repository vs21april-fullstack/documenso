import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { rateLimitResponse } from '../../../lib/server-only/rate-limit/rate-limit-middleware.js';
import { passkeyRateLimit } from '../../../lib/server-only/rate-limit/rate-limits.js';
import { deletedServiceAccountEmail } from '../../../lib/server-only/user/service-accounts/deleted-account.js';
import { legacyServiceAccountEmail } from '../../../lib/server-only/user/service-accounts/legacy-service-account.js';
import { ZAuthenticationResponseJSONSchema } from '../../../lib/types/webauthn.js';
import { getAuthenticatorOptions } from '../../../lib/utils/authenticator.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { sValidator } from '@hono/standard-validator';
import { UserSecurityAuditLogType } from '@prisma/client';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { onAuthorize } from '../lib/utils/authorizer.js';
import { ZPasskeyAuthorizeSchema } from '../types/passkey.js';

const passkeyRoute = new Hono()
/**
 * Authorize endpoint.
 */.post('/authorize', sValidator('json', ZPasskeyAuthorizeSchema), async c => {
  const requestMetadata = c.get('requestMetadata');
  const passkeyLimitResult = await passkeyRateLimit.check({
    ip: requestMetadata.ipAddress ?? 'unknown'
  });
  const passkeyLimited = rateLimitResponse(c, passkeyLimitResult);
  if (passkeyLimited) {
    throw new HTTPException(429, {
      res: passkeyLimited
    });
  }
  const {
    csrfToken,
    credential
  } = c.req.valid('json');
  if (typeof csrfToken !== 'string' || csrfToken.length === 0) {
    throw new AppError(AppErrorCode.INVALID_REQUEST);
  }
  let requestBodyCrediential = null;
  try {
    const parsedBodyCredential = JSON.parse(credential);
    requestBodyCrediential = ZAuthenticationResponseJSONSchema.parse(parsedBodyCredential);
  } catch {
    throw new AppError(AppErrorCode.INVALID_REQUEST);
  }
  const challengeToken = await prismaWithReplicas.anonymousVerificationToken.delete({
    where: {
      id: csrfToken
    }
  }).catch(() => null);
  if (!challengeToken) {
    throw new AppError(AppErrorCode.INVALID_REQUEST);
  }
  if (challengeToken.expiresAt < new Date()) {
    throw new AppError(AppErrorCode.EXPIRED_CODE);
  }
  const passkey = await prismaWithReplicas.passkey.findFirst({
    where: {
      credentialId: Buffer.from(requestBodyCrediential.id, 'base64')
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          emailVerified: true
        }
      }
    }
  });
  if (!passkey) {
    throw new AppError(AppErrorCode.NOT_SETUP);
  }
  const user = passkey.user;
  if (user.email.toLowerCase() === legacyServiceAccountEmail() || user.email.toLowerCase() === deletedServiceAccountEmail()) {
    return c.text('FORBIDDEN', 403);
  }
  const {
    rpId,
    origin
  } = getAuthenticatorOptions();
  const verification = await verifyAuthenticationResponse({
    response: requestBodyCrediential,
    expectedChallenge: challengeToken.token,
    expectedOrigin: origin,
    expectedRPID: rpId,
    credential: {
      id: isoBase64URL.fromBuffer(passkey.credentialId),
      publicKey: new Uint8Array(passkey.credentialPublicKey),
      counter: Number(passkey.counter)
    }
  }).catch(() => null);
  if (!verification?.verified) {
    await prismaWithReplicas.userSecurityAuditLog.create({
      data: {
        userId: user.id,
        ipAddress: requestMetadata.ipAddress,
        userAgent: requestMetadata.userAgent,
        type: UserSecurityAuditLogType.SIGN_IN_PASSKEY_FAIL
      }
    });
    throw new AppError(AppErrorCode.INVALID_REQUEST);
  }
  await prismaWithReplicas.passkey.update({
    where: {
      id: passkey.id
    },
    data: {
      lastUsedAt: new Date(),
      counter: verification.authenticationInfo.newCounter
    }
  });
  await onAuthorize({
    userId: user.id
  }, c);
  return c.json({
    url: '/'
  }, 200);
});

export { passkeyRoute };
//# sourceMappingURL=passkey.js.map
