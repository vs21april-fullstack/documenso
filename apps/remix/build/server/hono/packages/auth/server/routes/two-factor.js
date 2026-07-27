import { AppError } from '../../../lib/errors/app-error.js';
import { disableTwoFactorAuthentication } from '../../../lib/server-only/2fa/disable-2fa.js';
import { enableTwoFactorAuthentication } from '../../../lib/server-only/2fa/enable-2fa.js';
import { setupTwoFactorAuthentication } from '../../../lib/server-only/2fa/setup-2fa.js';
import { viewBackupCodes } from '../../../lib/server-only/2fa/view-backup-codes.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { sValidator } from '@hono/standard-validator';
import { Hono } from 'hono';
import { AuthenticationErrorCode } from '../lib/errors/error-codes.js';
import { getSession } from '../lib/utils/get-session.js';
import { ZEnableTwoFactorRequestSchema, ZDisableTwoFactorRequestSchema, ZViewTwoFactorRecoveryCodesRequestSchema } from './two-factor.types.js';

const twoFactorRoute = new Hono()
/**
 * Setup two factor authentication.
 */.post('/setup', async c => {
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
 */.post('/enable', sValidator('json', ZEnableTwoFactorRequestSchema), async c => {
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
 */.post('/disable', sValidator('json', ZDisableTwoFactorRequestSchema), async c => {
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
 */.post('/view-recovery-codes', sValidator('json', ZViewTwoFactorRecoveryCodesRequestSchema), async c => {
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

export { twoFactorRoute };
//# sourceMappingURL=two-factor.js.map
