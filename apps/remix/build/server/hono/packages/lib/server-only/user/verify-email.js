import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { DateTime } from 'luxon';
import { USER_SIGNUP_VERIFICATION_TOKEN_IDENTIFIER, EMAIL_VERIFICATION_STATE } from '../../constants/email.js';
import { jobsClient } from '../../jobs/client.js';

const verifyEmail = async ({
  token
}) => {
  const verificationToken = await prismaWithReplicas.verificationToken.findFirst({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    },
    where: {
      token,
      identifier: USER_SIGNUP_VERIFICATION_TOKEN_IDENTIFIER
    }
  });
  if (!verificationToken) {
    return {
      state: EMAIL_VERIFICATION_STATE.NOT_FOUND,
      userId: null
    };
  }
  // check if the token is valid or expired
  const valid = verificationToken.expires > new Date();
  if (!valid) {
    const mostRecentToken = await prismaWithReplicas.verificationToken.findFirst({
      where: {
        userId: verificationToken.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    // If there isn't a recent token or it's older than 1 hour, send a new token
    if (!mostRecentToken || DateTime.now().minus({
      hours: 1
    }).toJSDate() > mostRecentToken.createdAt) {
      await jobsClient.triggerJob({
        name: 'send.signup.confirmation.email',
        payload: {
          email: verificationToken.user.email
        }
      });
    }
    return {
      state: EMAIL_VERIFICATION_STATE.EXPIRED,
      userId: null
    };
  }
  if (verificationToken.completed) {
    return {
      state: EMAIL_VERIFICATION_STATE.ALREADY_VERIFIED,
      userId: null
    };
  }
  const [updatedUser] = await prismaWithReplicas.$transaction([prismaWithReplicas.user.update({
    where: {
      id: verificationToken.userId
    },
    data: {
      emailVerified: new Date()
    }
  }), prismaWithReplicas.verificationToken.updateMany({
    where: {
      userId: verificationToken.userId
    },
    data: {
      completed: true
    }
  }),
  // Tidy up old expired tokens
  prismaWithReplicas.verificationToken.deleteMany({
    where: {
      userId: verificationToken.userId,
      expires: {
        lt: new Date()
      }
    }
  })]);
  if (!updatedUser) {
    throw new Error('Something went wrong while verifying your email. Please try again.');
  }
  return {
    state: EMAIL_VERIFICATION_STATE.VERIFIED,
    userId: updatedUser.id
  };
};

export { verifyEmail };
//# sourceMappingURL=verify-email.js.map
