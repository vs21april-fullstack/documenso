import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { DateTime } from 'luxon';
import { PASSKEY_TIMEOUT } from '../../constants/auth.js';
import { getAuthenticatorOptions } from '../../utils/authenticator.js';

const createPasskeyRegistrationOptions = async ({
  userId
}) => {
  const user = await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    },
    select: {
      name: true,
      email: true,
      passkeys: true
    }
  });
  const {
    passkeys
  } = user;
  const {
    rpName,
    rpId: rpID
  } = getAuthenticatorOptions();
  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID: Buffer.from(userId.toString()),
    userName: user.email,
    userDisplayName: user.name ?? undefined,
    timeout: PASSKEY_TIMEOUT,
    attestationType: 'none',
    excludeCredentials: passkeys.map(passkey => ({
      id: isoBase64URL.fromBuffer(passkey.credentialId),
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      transports: passkey.transports
    }))
  });
  await prismaWithReplicas.verificationToken.create({
    data: {
      userId,
      token: options.challenge,
      expires: DateTime.now().plus({
        minutes: 2
      }).toJSDate(),
      identifier: 'PASSKEY_CHALLENGE'
    }
  });
  return options;
};

export { createPasskeyRegistrationOptions };
//# sourceMappingURL=create-passkey-registration-options.js.map
