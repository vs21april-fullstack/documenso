import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { USER_SIGNUP_VERIFICATION_TOKEN_IDENTIFIER } from '../../constants/email.js';

const getMostRecentEmailVerificationToken = async ({
  userId
}) => {
  return await prismaWithReplicas.verificationToken.findFirst({
    where: {
      userId,
      identifier: USER_SIGNUP_VERIFICATION_TOKEN_IDENTIFIER
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export { getMostRecentEmailVerificationToken };
//# sourceMappingURL=get-most-recent-email-verification-token.js.map
