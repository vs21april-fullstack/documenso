import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { getHighestOrganisationRoleInGroup } from '../../utils/organisations.js';
import { getHighestTeamRoleInGroup } from '../../utils/teams.js';

/**
 * Returns the highest Team role of a given member or user of a team
 */
const getMemberRoles = async ({
  teamId,
  reference
}) => {
  // Enforce incase teamId undefined slips through due to invalid types.
  if (teamId === undefined) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Team not found'
    });
  }
  const team = await prismaWithReplicas.team.findUnique({
    where: {
      id: teamId
    },
    include: {
      teamGroups: {
        where: {
          organisationGroup: {
            organisationGroupMembers: {
              some: {
                organisationMember: reference.type === 'User' ? {
                  userId: reference.id
                } : {
                  id: reference.id
                }
              }
            }
          }
        }
      }
    }
  });
  if (!team || team.teamGroups.length === 0) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Roles not found'
    });
  }
  return {
    // Todo: Would be nice bonus to have. If implemented make sure to test hard.
    // organisationRole: getHighestOrganisationRoleInGroup(),
    teamRole: getHighestTeamRoleInGroup(team.teamGroups)
  };
};
/**
 * Returns the highest Organisation of a given organisation member
 */
const getMemberOrganisationRole = async ({
  organisationId,
  reference
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: {
      id: organisationId
    },
    include: {
      groups: {
        where: {
          organisationGroupMembers: {
            some: {
              organisationMember: reference.type === 'User' ? {
                userId: reference.id
              } : {
                id: reference.id
              }
            }
          }
        }
      }
    }
  });
  if (!organisation || organisation.groups.length === 0) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Roles not found'
    });
  }
  return getHighestOrganisationRoleInGroup(organisation.groups);
};

export { getMemberOrganisationRole, getMemberRoles };
//# sourceMappingURL=get-member-roles.js.map
