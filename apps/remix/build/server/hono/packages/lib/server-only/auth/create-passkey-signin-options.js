import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { DateTime } from 'luxon';
import { getAuthenticatorOptions } from '../../utils/authenticator.js';

const createPasskeySigninOptions = async ({
  sessionId
}) => {
  const {
    rpId,
    timeout
  } = getAuthenticatorOptions();
  const options = await generateAuthenticationOptions({
    rpID: rpId,
    userVerification: 'preferred',
    timeout
  });
  const {
    challenge
  } = options;
  await prismaWithReplicas.anonymousVerificationToken.upsert({
    where: {
      id: sessionId
    },
    update: {
      token: challenge,
      expiresAt: DateTime.now().plus({
        minutes: 2
      }).toJSDate(),
      createdAt: new Date()
    },
    create: {
      id: sessionId,
      token: challenge,
      expiresAt: DateTime.now().plus({
        minutes: 2
      }).toJSDate(),
      createdAt: new Date()
    }
  });
  return options;
};

export { createPasskeySigninOptions };
//# sourceMappingURL=create-passkey-signin-options.js.map
