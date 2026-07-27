import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { DateTime } from 'luxon';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { getAuthenticatorOptions } from '../../utils/authenticator.js';

const createPasskeyAuthenticationOptions = async ({
  userId,
  preferredPasskeyId
}) => {
  const {
    rpId,
    timeout
  } = getAuthenticatorOptions();
  let preferredPasskey = null;
  if (preferredPasskeyId) {
    preferredPasskey = await prismaWithReplicas.passkey.findFirst({
      where: {
        userId,
        id: preferredPasskeyId
      },
      select: {
        credentialId: true,
        transports: true
      }
    });
    if (!preferredPasskey) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Requested passkey not found'
      });
    }
  }
  const options = await generateAuthenticationOptions({
    rpID: rpId,
    userVerification: 'preferred',
    timeout,
    allowCredentials: preferredPasskey ? [{
      id: isoBase64URL.fromBuffer(preferredPasskey.credentialId),
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      transports: preferredPasskey.transports
    }] : undefined
  });
  const {
    secondaryId
  } = await prismaWithReplicas.verificationToken.create({
    data: {
      userId,
      token: options.challenge,
      expires: DateTime.now().plus({
        minutes: 2
      }).toJSDate(),
      identifier: 'PASSKEY_CHALLENGE'
    }
  });
  return {
    tokenReference: secondaryId,
    options
  };
};

export { createPasskeyAuthenticationOptions };
//# sourceMappingURL=create-passkey-authentication-options.js.map
