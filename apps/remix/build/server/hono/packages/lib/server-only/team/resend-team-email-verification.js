import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { AppError } from '../../errors/app-error.js';
import { createTokenVerification } from '../../utils/token-verification.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { sendTeamEmailVerificationEmail } from './create-team-email-verification.js';

/**
 * Resend a team email verification with a new token.
 */
const resendTeamEmailVerification = async ({
  userId,
  teamId
}) => {
  const team = await prismaWithReplicas.team.findFirst({
    where: buildTeamWhereQuery({
      teamId,
      userId,
      roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
    }),
    include: {
      emailVerification: true
    }
  });
  if (!team) {
    throw new AppError('TeamNotFound', {
      message: 'User is not a member of the team.'
    });
  }
  const {
    emailVerification
  } = team;
  if (!emailVerification) {
    throw new AppError('VerificationNotFound', {
      message: 'No team email verification exists for this team.'
    });
  }
  const {
    token,
    expiresAt
  } = createTokenVerification({
    hours: 1
  });
  await prismaWithReplicas.teamEmailVerification.update({
    where: {
      teamId
    },
    data: {
      token,
      expiresAt
    }
  });
  // Send email outside any transaction to avoid holding a connection
  // open during network I/O.
  await sendTeamEmailVerificationEmail(emailVerification.email, token, team);
};

export { resendTeamEmailVerification };
//# sourceMappingURL=resend-team-email-verification.js.map
