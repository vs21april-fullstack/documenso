import { getHighestOrganisationRoleInGroup } from '../../../lib/utils/organisations.js';
import { buildTeamWhereQuery, extractDerivedTeamSettings, getHighestTeamRoleInGroup } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetOrganisationSessionResponseSchema } from './get-organisation-session.types.js';

/**
 * Get all the organisations and teams a user belongs to.
 */
const getOrganisationSessionRoute = authenticatedProcedure.output(ZGetOrganisationSessionResponseSchema).query(async ({
  ctx
}) => {
  return await getOrganisationSession({
    userId: ctx.user.id
  });
});
const getOrganisationSession = async ({
  userId
}) => {
  const organisations = await prismaWithReplicas.organisation.findMany({
    where: {
      members: {
        some: {
          userId
        }
      }
    },
    include: {
      organisationClaim: true,
      organisationGlobalSettings: true,
      subscription: true,
      groups: {
        where: {
          organisationGroupMembers: {
            some: {
              organisationMember: {
                userId
              }
            }
          }
        }
      },
      teams: {
        where: buildTeamWhereQuery({
          teamId: undefined,
          userId
        }),
        include: {
          teamGlobalSettings: true,
          teamEmail: {
            select: {
              email: true
            }
          },
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
            },
            include: {
              organisationGroup: true
            }
          }
        }
      }
    }
  });
  return organisations.map(organisation => {
    const {
      organisationGlobalSettings
    } = organisation;
    return {
      ...organisation,
      teams: organisation.teams.map(team => {
        const derivedSettings = extractDerivedTeamSettings(organisationGlobalSettings, team.teamGlobalSettings);
        return {
          ...team,
          currentTeamRole: getHighestTeamRoleInGroup(team.teamGroups),
          preferences: {
            aiFeaturesEnabled: derivedSettings.aiFeaturesEnabled
          }
        };
      }),
      currentOrganisationRole: getHighestOrganisationRoleInGroup(organisation.groups)
    };
  });
};

export { getOrganisationSession, getOrganisationSessionRoute };
//# sourceMappingURL=get-organisation-session.js.map
