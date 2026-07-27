import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { match } from 'ts-pattern';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { DocumentAuth } from '../../types/document-auth.js';
import { getAuthenticatorOptions } from '../../utils/authenticator.js';
import { extractDocumentAuthMethods } from '../../utils/document-auth.js';
import { validateTwoFactorTokenFromEmail } from '../2fa/email/validate-2fa-token-from-email.js';
import { verifyTwoFactorAuthenticationToken } from '../2fa/verify-2fa-token.js';
import { verifyPassword } from '../2fa/verify-password.js';

const getUserByEmail = async email => {
  return await prismaWithReplicas.user.findFirst({
    where: {
      email
    },
    select: {
      id: true
    }
  });
};
/**
 * Whether the recipient is authorized to perform the requested operation on a
 * document, given the provided auth options.
 *
 * @returns True if the recipient can perform the requested operation.
 */
const isRecipientAuthorized = async ({
  type,
  documentAuthOptions,
  recipient,
  userId,
  authOptions
}) => {
  const {
    derivedRecipientAccessAuth,
    derivedRecipientActionAuth
  } = extractDocumentAuthMethods({
    documentAuth: documentAuthOptions,
    recipientAuth: recipient.authOptions
  });
  const authMethods = match(type).with('ACCESS', () => derivedRecipientAccessAuth).with('ACCESS_2FA', () => derivedRecipientAccessAuth).with('ACTION', () => derivedRecipientActionAuth).exhaustive();
  // Early true return when auth is not required.
  if (authMethods.length === 0 || authMethods.some(method => method === DocumentAuth.EXPLICIT_NONE)) {
    return true;
  }
  // Early true return for ACCESS auth if all methods are 2FA since validation happens in ACCESS_2FA.
  if (type === 'ACCESS' && authMethods.every(method => method === DocumentAuth.TWO_FACTOR_AUTH)) {
    return true;
  }
  // Create auth options when none are passed for account.
  if (!authOptions && authMethods.some(method => method === DocumentAuth.ACCOUNT)) {
    authOptions = {
      type: DocumentAuth.ACCOUNT
    };
  }
  // Authentication required does not match provided method.
  if (!authOptions || !authMethods.includes(authOptions.type)) {
    return false;
  }
  return await match(authOptions).with({
    type: DocumentAuth.ACCOUNT
  }, async () => {
    if (!userId) {
      return false;
    }
    const recipientUser = await getUserByEmail(recipient.email);
    if (!recipientUser) {
      return false;
    }
    return recipientUser.id === userId;
  }).with({
    type: DocumentAuth.PASSKEY
  }, async ({
    authenticationResponse,
    tokenReference
  }) => {
    if (!userId) {
      return false;
    }
    return await isPasskeyAuthValid({
      userId,
      authenticationResponse,
      tokenReference
    });
  }).with({
    type: DocumentAuth.TWO_FACTOR_AUTH
  }, async ({
    token,
    method
  }) => {
    if (type === 'ACCESS') {
      return true;
    }
    if (type === 'ACCESS_2FA' && method === 'email') {
      return await validateTwoFactorTokenFromEmail({
        envelopeId: recipient.envelopeId,
        email: recipient.email,
        code: token,
        window: 10 // 5 minutes worth of tokens
      });
    }
    if (!userId) {
      return false;
    }
    const user = await prismaWithReplicas.user.findFirst({
      where: {
        id: userId
      }
    });
    // Should not be possible.
    if (!user) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'User not found'
      });
    }
    // For ACTION auth or authenticator method, use TOTP
    return await verifyTwoFactorAuthenticationToken({
      user,
      totpCode: token,
      window: 10 // 5 minutes worth of tokens
    });
  }).with({
    type: DocumentAuth.PASSWORD
  }, async ({
    password
  }) => {
    if (!userId) {
      return false;
    }
    return await verifyPassword({
      userId,
      password
    });
  }).with({
    type: DocumentAuth.EXPLICIT_NONE
  }, () => {
    return true;
  }).exhaustive();
};
/**
 * Whether the provided passkey authenticator response is valid and the user is
 * authenticated.
 */
const isPasskeyAuthValid = async options => {
  return verifyPasskey(options).then(() => true).catch(() => false);
};
/**
 * Verifies whether the provided passkey authenticator is valid and the user is
 * authenticated.
 *
 * Will throw an error if the user should not be authenticated.
 */
const verifyPasskey = async ({
  userId,
  tokenReference,
  authenticationResponse
}) => {
  const passkey = await prismaWithReplicas.passkey.findFirst({
    where: {
      credentialId: new Uint8Array(Buffer.from(authenticationResponse.id, 'base64')),
      userId
    }
  });
  if (!passkey) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Passkey not found'
    });
  }
  const verificationToken = await prismaWithReplicas.verificationToken.delete({
    where: {
      userId,
      secondaryId: tokenReference
    }
  }).catch(() => null);
  if (!verificationToken) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Token not found'
    });
  }
  if (verificationToken.expires < new Date()) {
    throw new AppError(AppErrorCode.EXPIRED_CODE, {
      message: 'Token expired'
    });
  }
  const {
    rpId,
    origin
  } = getAuthenticatorOptions();
  const verification = await verifyAuthenticationResponse({
    response: authenticationResponse,
    expectedChallenge: verificationToken.token,
    expectedOrigin: origin,
    expectedRPID: rpId,
    credential: {
      id: isoBase64URL.fromBuffer(passkey.credentialId),
      publicKey: new Uint8Array(passkey.credentialPublicKey),
      counter: Number(passkey.counter)
    }
  }).catch(() => null); // May want to log this for insights.
  if (verification?.verified !== true) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'User is not authorized'
    });
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
};

export { isRecipientAuthorized };
//# sourceMappingURL=is-recipient-authorized.js.map
