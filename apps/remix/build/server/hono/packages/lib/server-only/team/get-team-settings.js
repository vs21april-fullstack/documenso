import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { buildTeamWhereQuery, extractDerivedTeamSettings } from '../../utils/teams.js';

/**
 * You must provide userId if you want to validate whether the user can access the team settings.
 */
const getTeamSettings = async ({
  userId,
  teamId
}) => {
  const team = await prismaWithReplicas.team.findFirst({
    where: userId !== undefined ? buildTeamWhereQuery({
      teamId,
      userId
    }) : {
      id: teamId
    },
    include: {
      organisation: {
        include: {
          organisationGlobalSettings: true
        }
      },
      teamGlobalSettings: true
    }
  });
  if (!team) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Team not found'
    });
  }
  const organisationSettings = team.organisation.organisationGlobalSettings;
  const teamSettings = team.teamGlobalSettings;
  // Override branding settings if inherit is enabled.
  if (teamSettings.brandingEnabled === null) {
    teamSettings.brandingEnabled = organisationSettings.brandingEnabled;
    teamSettings.brandingLogo = organisationSettings.brandingLogo;
    teamSettings.brandingUrl = organisationSettings.brandingUrl;
    teamSettings.brandingCompanyDetails = organisationSettings.brandingCompanyDetails;
    teamSettings.brandingColors = organisationSettings.brandingColors;
    teamSettings.brandingCss = organisationSettings.brandingCss;
  }
  return extractDerivedTeamSettings(organisationSettings, teamSettings);
};

export { getTeamSettings };
//# sourceMappingURL=get-team-settings.js.map
