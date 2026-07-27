import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { getHighestOrganisationRoleInGroup } from '../../utils/organisations.js';
import { getHighestTeamRoleInGroup } from '../../utils/teams.js';

/**
 * Get all team members for a given team.
 */
const getTeamMembers = async ({
  userId,
  teamId
}) => {
  const teamMembers = await prismaWithReplicas.organisationMember.findMany({
    where: {
      organisationGroupMembers: {
        some: {
          group: {
            teamGroups: {
              some: {
                teamId
              }
            }
          }
        }
      }
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          avatarImageId: true
        }
      },
      organisationGroupMembers: {
        include: {
          group: {
            include: {
              teamGroups: true
            }
          }
        }
      }
    }
  });
  const isAuthorized = teamMembers.some(member => member.userId === userId);
  // Checks that the user is part of the organisation/team.
  if (!isAuthorized) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
  }
  return teamMembers.map(member => {
    const memberGroups = member.organisationGroupMembers.map(group => group.group);
    return {
      id: member.id,
      userId: member.userId,
      createdAt: member.createdAt,
      email: member.user.email,
      name: member.user.name,
      avatarImageId: member.user.avatarImageId,
      // Filter teamGroups to only include the current team
      teamRole: getHighestTeamRoleInGroup(memberGroups.flatMap(group => group.teamGroups.filter(tg => tg.teamId === teamId))),
      organisationRole: getHighestOrganisationRoleInGroup(memberGroups)
    };
  });
};

export { getTeamMembers };
//# sourceMappingURL=get-team-members.js.map
