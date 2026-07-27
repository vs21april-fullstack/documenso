import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { buildTeamWhereQuery, extractDerivedTeamSettings, getHighestTeamRoleInGroup } from '../../utils/teams.js';

const getTeamById = async ({
  userId,
  teamId
}) => {
  return await getTeam({
    teamReference: teamId,
    userId
  });
};
/**
 * Get a team by its ID or URL.
 */
const getTeam = async ({
  teamReference,
  userId
}) => {
  const team = await prismaWithReplicas.team.findFirst({
    where: {
      ...buildTeamWhereQuery({
        teamId: undefined,
        userId
      }),
      id: typeof teamReference === 'number' ? teamReference : undefined,
      url: typeof teamReference === 'string' ? teamReference : undefined
    },
    include: {
      teamEmail: true,
      teamGroups: {
        where: {
          organisationGroup: {
            organisationGroupMembers: {
              some: {
                organisationMember: {
                  userId
                }
              }
            }
          }
        }
      },
      teamGlobalSettings: true,
      organisation: {
        include: {
          organisationGlobalSettings: true
        }
      }
    }
  });
  if (!team) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Team not found'
    });
  }
  const organisationSettings = team.organisation.organisationGlobalSettings;
  const teamSettings = team.teamGlobalSettings;
  return {
    ...team,
    currentTeamRole: getHighestTeamRoleInGroup(team.teamGroups),
    teamSettings,
    derivedSettings: extractDerivedTeamSettings(organisationSettings, teamSettings)
  };
};

export { getTeam, getTeamById };
//# sourceMappingURL=get-team.js.map
