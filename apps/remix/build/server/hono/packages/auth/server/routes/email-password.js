import { isSigninEnabledForProvider, isSignupEnabledForProvider, isEmailDomainAllowedForSignup, isDisposableEmail } from '../../../lib/constants/auth.js';
import { EMAIL_VERIFICATION_STATE } from '../../../lib/constants/email.js';
import { AppError } from '../../../lib/errors/app-error.js';
import { jobsClient } from '../../../lib/jobs/client.js';
import { disableTwoFactorAuthentication } from '../../../lib/server-only/2fa/disable-2fa.js';
import { enableTwoFactorAuthentication } from '../../../lib/server-only/2fa/enable-2fa.js';
import { isTwoFactorAuthenticationEnabled } from '../../../lib/server-only/2fa/is-2fa-availble.js';
import { setupTwoFactorAuthentication } from '../../../lib/server-only/2fa/setup-2fa.js';
import { validateTwoFactorAuthentication } from '../../../lib/server-only/2fa/validate-2fa.js';
import { viewBackupCodes } from '../../../lib/server-only/2fa/view-backup-codes.js';
import { verifyCaptchaToken } from '../../../lib/server-only/captcha/verify-captcha.js';
import { rateLimitResponse } from '../../../lib/server-only/rate-limit/rate-limit-middleware.js';
import { loginRateLimit, signupRateLimit, verifyEmailRateLimit, resendVerifyEmailRateLimit, forgotPasswordRateLimit, resetPasswordRateLimit } from '../../../lib/server-only/rate-limit/rate-limits.js';
import { getEmailBlocklistDomains } from '../../../lib/server-only/site-settings/get-email-blocklist-domains.js';
import { createUser } from '../../../lib/server-only/user/create-user.js';
import { forgotPassword } from '../../../lib/server-only/user/forgot-password.js';
import { getMostRecentEmailVerificationToken } from '../../../lib/server-only/user/get-most-recent-email-verification-token.js';
import { getUserByResetToken } from '../../../lib/server-only/user/get-user-by-reset-token.js';
import { resetPassword } from '../../../lib/server-only/user/reset-password.js';
import { deletedServiceAccountEmail } from '../../../lib/server-only/user/service-accounts/deleted-account.js';
import { legacyServiceAccountEmail } from '../../../lib/server-only/user/service-accounts/legacy-service-account.js';
import { updatePassword } from '../../../lib/server-only/user/update-password.js';
import { verifyEmail } from '../../../lib/server-only/user/verify-email.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { sValidator } from '@hono/standard-validator';
import { compare } from '@node-rs/bcrypt';
import { UserSecurityAuditLogType } from '@prisma/client';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { DateTime } from 'luxon';
import { z } from 'zod';
import { AuthenticationErrorCode } from '../lib/errors/error-codes.js';
import { invalidateSessions } from '../lib/session/session.js';
import { getCsrfCookie } from '../lib/session/session-cookies.js';
import { onAuthorize } from '../lib/utils/authorizer.js';
import { getSession } from '../lib/utils/get-session.js';
import { ZSignInSchema, ZSignUpSchema, ZUpdatePasswordSchema, ZVerifyEmailSchema, ZResendVerifyEmailSchema, ZForgotPasswordSchema, ZResetPasswordSchema } from '../types/email-password.js';

const emailPasswordRoute = new Hono()
/**
 * Authorize endpoint.
 */.post('/authorize', sValidator('json', ZSignInSchema), async c => {
  const requestMetadata = c.get('requestMetadata');
  if (!isSigninEnabledForProvider('email')) {
    throw new AppError(AuthenticationErrorCode.SigninDisabled, {
      statusCode: 400
    });
  }
  const {
    email,
    password,
    totpCode,
    backupCode,
    csrfToken,
    captchaToken
  } = c.req.valid('json');
  const loginLimitResult = await loginRateLimit.check({
    ip: requestMetadata.ipAddress ?? 'unknown',
    identifier: email
  });
  const loginLimited = rateLimitResponse(c, loginLimitResult);
  if (loginLimited) {
    throw new HTTPException(429, {
      res: loginLimited
    });
  }
  const csrfCookieToken = await getCsrfCookie(c);
  // Todo: (RR7) Add logging here.
  if (csrfToken !== csrfCookieToken || !csrfCookieToken) {
    throw new AppError(AuthenticationErrorCode.InvalidRequest, {
      message: 'Invalid CSRF token'
    });
  }
  await verifyCaptchaToken({
    token: captchaToken,
    ipAddress: requestMetadata.ipAddress
  });
  if (email.toLowerCase() === legacyServiceAccountEmail() || email.toLowerCase() === deletedServiceAccountEmail()) {
    return c.text('FORBIDDEN', 403);
  }
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      email: email.toLowerCase()
    }
  });
  if (!user || !user.password) {
    throw new AppError(AuthenticationErrorCode.InvalidCredentials, {
      message: 'Invalid email or password'
    });
  }
  const isPasswordsSame = await compare(password, user.password);
  if (!isPasswordsSame) {
    await prismaWithReplicas.userSecurityAuditLog.create({
      data: {
        userId: user.id,
        ipAddress: requestMetadata.ipAddress,
        userAgent: requestMetadata.userAgent,
        type: UserSecurityAuditLogType.SIGN_IN_FAIL
      }
    });
    throw new AppError(AuthenticationErrorCode.InvalidCredentials, {
      message: 'Invalid email or password'
    });
  }
  const is2faEnabled = isTwoFactorAuthenticationEnabled({
    user
  });
  if (is2faEnabled) {
    const isValid = await validateTwoFactorAuthentication({
      backupCode,
      totpCode,
      user
    });
    if (!isValid) {
      await prismaWithReplicas.userSecurityAuditLog.create({
        data: {
          userId: user.id,
          ipAddress: requestMetadata.ipAddress,
          userAgent: requestMetadata.userAgent,
          type: UserSecurityAuditLogType.SIGN_IN_2FA_FAIL
        }
      });
      throw new AppError(AuthenticationErrorCode.InvalidTwoFactorCode);
    }
  }
  if (!user.emailVerified) {
    const mostRecentToken = await getMostRecentEmailVerificationToken({
      userId: user.id
    });
    if (!mostRecentToken || mostRecentToken.expires.valueOf() <= Date.now() || DateTime.fromJSDate(mostRecentToken.createdAt).diffNow('minutes').minutes > -5) {
      await jobsClient.triggerJob({
        name: 'send.signup.confirmation.email',
        payload: {
          email: user.email
        }
      });
    }
    throw new AppError('UNVERIFIED_EMAIL', {
      message: 'Unverified email'
    });
  }
  // The disabled check now lives inside `onAuthorize` so every sign-in path
  // (password, passkey, OAuth, OIDC) shares the same enforcement.
  await onAuthorize({
    userId: user.id
  }, c);
  return c.text('', 201);
})
/**
 * Signup endpoint.
 */.post('/signup', sValidator('json', ZSignUpSchema), async c => {
  const requestMetadata = c.get('requestMetadata');
  if (!isSignupEnabledForProvider('email')) {
    throw new AppError(AuthenticationErrorCode.SignupDisabled, {
      statusCode: 400
    });
  }
  const {
    name,
    email,
    password,
    signature,
    captchaToken
  } = c.req.valid('json');
  const signupLimitResult = await signupRateLimit.check({
    ip: requestMetadata.ipAddress ?? 'unknown'
  });
  const signupLimited = rateLimitResponse(c, signupLimitResult);
  if (signupLimited) {
    throw new HTTPException(429, {
      res: signupLimited
    });
  }
  await verifyCaptchaToken({
    token: captchaToken,
    ipAddress: requestMetadata.ipAddress
  });
  if (!isEmailDomainAllowedForSignup(email)) {
    throw new AppError(AuthenticationErrorCode.SignupDisabled, {
      statusCode: 400
    });
  }
  const additionalBlockedDomains = await getEmailBlocklistDomains();
  if (isDisposableEmail(email, additionalBlockedDomains)) {
    throw new AppError(AuthenticationErrorCode.SignupDisposableEmail, {
      statusCode: 400
    });
  }
  const user = await createUser({
    name,
    email,
    password,
    signature
  }).catch(err => {
    console.error(err);
    throw err;
  });
  await jobsClient.triggerJob({
    name: 'send.signup.confirmation.email',
    payload: {
      email: user.email
    }
  });
  return c.text('OK', 201);
})
/**
 * Update password endpoint.
 */.post('/update-password', sValidator('json', ZUpdatePasswordSchema), async c => {
  const {
    password,
    currentPassword
  } = c.req.valid('json');
  const requestMetadata = c.get('requestMetadata');
  if (!isSigninEnabledForProvider('email')) {
    throw new AppError(AuthenticationErrorCode.SigninDisabled, {
      statusCode: 400
    });
  }
  const {
    session,
    user
  } = await getSession(c);
  await updatePassword({
    userId: user.id,
    password,
    currentPassword,
    requestMetadata
  });
  const userSessionIds = await prismaWithReplicas.session.findMany({
    where: {
      userId: user.id,
      // Incase we pass undefined somehow.
      id: {
        not: session.id
      }
    },
    select: {
      id: true
    }
  }).then(sessions => sessions.map(s => s.id));
  if (userSessionIds.length > 0) {
    await invalidateSessions({
      userId: user.id,
      sessionIds: userSessionIds,
      metadata: requestMetadata,
      isRevoke: true
    });
  }
  return c.text('OK', 201);
})
/**
 * Verify email endpoint.
 */.post('/verify-email', sValidator('json', ZVerifyEmailSchema), async c => {
  const requestMetadata = c.get('requestMetadata');
  const {
    token
  } = c.req.valid('json');
  const verifyLimitResult = await verifyEmailRateLimit.check({
    ip: requestMetadata.ipAddress ?? 'unknown',
    identifier: token
  });
  const verifyLimited = rateLimitResponse(c, verifyLimitResult);
  if (verifyLimited) {
    throw new HTTPException(429, {
      res: verifyLimited
    });
  }
  const {
    state,
    userId
  } = await verifyEmail({
    token
  });
  // If email is verified, automatically authenticate user.
  if (state === EMAIL_VERIFICATION_STATE.VERIFIED && userId !== null) {
    await onAuthorize({
      userId
    }, c);
  }
  return c.json({
    state
  });
})
/**
 * Resend verification email endpoint.
 */.post('/resend-verify-email', sValidator('json', ZResendVerifyEmailSchema), async c => {
  const requestMetadata = c.get('requestMetadata');
  const {
    email
  } = c.req.valid('json');
  const resendLimitResult = await resendVerifyEmailRateLimit.check({
    ip: requestMetadata.ipAddress ?? 'unknown',
    identifier: email
  });
  const resendLimited = rateLimitResponse(c, resendLimitResult);
  if (resendLimited) {
    throw new HTTPException(429, {
      res: resendLimited
    });
  }
  await jobsClient.triggerJob({
    name: 'send.signup.confirmation.email',
    payload: {
      email
    }
  });
  return c.text('OK', 201);
})
/**
 * Forgot password endpoint.
 */.post('/forgot-password', sValidator('json', ZForgotPasswordSchema), async c => {
  const requestMetadata = c.get('requestMetadata');
  if (!isSigninEnabledForProvider('email')) {
    throw new AppError(AuthenticationErrorCode.SigninDisabled, {
      statusCode: 400
    });
  }
  const {
    email
  } = c.req.valid('json');
  const forgotLimitResult = await forgotPasswordRateLimit.check({
    ip: requestMetadata.ipAddress ?? 'unknown',
    identifier: email
  });
  const forgotLimited = rateLimitResponse(c, forgotLimitResult);
  if (forgotLimited) {
    throw new HTTPException(429, {
      res: forgotLimited
    });
  }
  if (email.toLowerCase() === legacyServiceAccountEmail() || email.toLowerCase() === deletedServiceAccountEmail()) {
    return c.text('FORBIDDEN', 403);
  }
  await forgotPassword({
    email
  });
  return c.text('OK', 201);
})
/**
 * Reset password endpoint.
 */.post('/reset-password', sValidator('json', ZResetPasswordSchema), async c => {
  const requestMetadata = c.get('requestMetadata');
  if (!isSigninEnabledForProvider('email')) {
    throw new AppError(AuthenticationErrorCode.SigninDisabled, {
      statusCode: 400
    });
  }
  const {
    token,
    password
  } = c.req.valid('json');
  const resetLimitResult = await resetPasswordRateLimit.check({
    ip: requestMetadata.ipAddress ?? 'unknown',
    identifier: token
  });
  const resetLimited = rateLimitResponse(c, resetLimitResult);
  if (resetLimited) {
    throw new HTTPException(429, {
      res: resetLimited
    });
  }
  const user = await getUserByResetToken({
    token
  });
  if (user.email.toLowerCase() === legacyServiceAccountEmail() || user.email.toLowerCase() === deletedServiceAccountEmail()) {
    return c.text('FORBIDDEN', 403);
  }
  const {
    userId
  } = await resetPassword({
    token,
    password,
    requestMetadata
  });
  // Invalidate all sessions after successful password reset
  const userSessionIds = await prismaWithReplicas.session.findMany({
    where: {
      userId: userId // Incase we pass undefined somehow.
    },
    select: {
      id: true
    }
  }).then(sessions => sessions.map(session => session.id));
  if (userSessionIds.length > 0) {
    await invalidateSessions({
      userId,
      sessionIds: userSessionIds,
      metadata: requestMetadata,
      isRevoke: true
    });
  }
  return c.text('OK', 201);
})
/**
 * Setup two factor authentication.
 */.post('/2fa/setup', async c => {
  const {
    user
  } = await getSession(c);
  const result = await setupTwoFactorAuthentication({
    user
  });
  return c.json({
    success: true,
    secret: result.secret,
    uri: result.uri
  });
})
/**
 * Enable two factor authentication.
 */.post('/2fa/enable', sValidator('json', z.object({
  code: z.string()
})), async c => {
  const requestMetadata = c.get('requestMetadata');
  const {
    user: sessionUser
  } = await getSession(c);
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id: sessionUser.id
    },
    select: {
      id: true,
      email: true,
      twoFactorEnabled: true,
      twoFactorSecret: true
    }
  });
  if (!user) {
    throw new AppError(AuthenticationErrorCode.InvalidRequest);
  }
  const {
    code
  } = c.req.valid('json');
  const result = await enableTwoFactorAuthentication({
    user,
    code,
    requestMetadata
  });
  return c.json({
    success: true,
    recoveryCodes: result.recoveryCodes
  });
})
/**
 * Disable two factor authentication.
 */.post('/2fa/disable', sValidator('json', z.object({
  totpCode: z.string().trim().optional(),
  backupCode: z.string().trim().optional()
})), async c => {
  const requestMetadata = c.get('requestMetadata');
  const {
    user: sessionUser
  } = await getSession(c);
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id: sessionUser.id
    },
    select: {
      id: true,
      email: true,
      twoFactorEnabled: true,
      twoFactorSecret: true,
      twoFactorBackupCodes: true
    }
  });
  if (!user) {
    throw new AppError(AuthenticationErrorCode.InvalidRequest);
  }
  const {
    totpCode,
    backupCode
  } = c.req.valid('json');
  await disableTwoFactorAuthentication({
    user,
    totpCode,
    backupCode,
    requestMetadata
  });
  return c.text('OK', 201);
})
/**
 * View backup codes.
 */.post('/2fa/view-recovery-codes', sValidator('json', z.object({
  token: z.string()
})), async c => {
  const {
    user: sessionUser
  } = await getSession(c);
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id: sessionUser.id
    },
    select: {
      id: true,
      email: true,
      twoFactorEnabled: true,
      twoFactorSecret: true,
      twoFactorBackupCodes: true
    }
  });
  if (!user) {
    throw new AppError(AuthenticationErrorCode.InvalidRequest);
  }
  const {
    token
  } = c.req.valid('json');
  const backupCodes = await viewBackupCodes({
    user,
    token
  });
  return c.json({
    success: true,
    backupCodes
  });
});

export { emailPasswordRoute };
//# sourceMappingURL=email-password.js.map
