import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getHighestOrganisationRoleInGroup } from '../../../lib/utils/organisations.js';
import { getHighestTeamRoleInGroup } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationMemberInviteStatus } from '@prisma/client';
import { adminProcedure } from '../trpc.js';
import { ZGetAdminTeamRequestSchema, ZGetAdminTeamResponseSchema } from './get-admin-team.types.js';

const getAdminTeamRoute = adminProcedure.input(ZGetAdminTeamRequestSchema).output(ZGetAdminTeamResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = input;
  ctx.logger.info({
    input: {
      teamId
    }
  });
  const team = await prismaWithReplicas.team.findUnique({
    where: {
      id: teamId
    },
    include: {
      organisation: {
        select: {
          id: true,
          name: true,
          url: true,
          ownerUserId: true,
          organisationGlobalSettings: true
        }
      },
      teamEmail: true,
      teamGlobalSettings: true
    }
  });
  if (!team) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Team not found'
    });
  }
  const [teamMembers, pendingInvites] = await Promise.all([prismaWithReplicas.organisationMember.findMany({
    where: {
      organisationId: team.organisationId,
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
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      userId: true,
      createdAt: true,
      organisationGroupMembers: {
        include: {
          group: {
            include: {
              teamGroups: {
                where: {
                  teamId
                }
              }
            }
          }
        }
      },
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    }
  }),
  // Invites are organisation-scoped in the schema (no team relation), so this is intentionally
  // all pending invites for the team's parent organisation.
  prismaWithReplicas.organisationMemberInvite.findMany({
    where: {
      organisationId: team.organisationId,
      status: OrganisationMemberInviteStatus.PENDING
    },
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      organisationRole: true,
      status: true
    }
  })]);
  const mappedTeamMembers = teamMembers.map(teamMember => {
    const groups = teamMember.organisationGroupMembers.map(({
      group
    }) => group);
    return {
      id: teamMember.id,
      userId: teamMember.userId,
      createdAt: teamMember.createdAt,
      user: teamMember.user,
      teamRole: getHighestTeamRoleInGroup(groups.flatMap(group => group.teamGroups)),
      organisationRole: getHighestOrganisationRoleInGroup(groups)
    };
  });
  return {
    ...team,
    memberCount: mappedTeamMembers.length,
    teamMembers: mappedTeamMembers,
    pendingInvites
  };
});

export { getAdminTeamRoute };
//# sourceMappingURL=get-admin-team.js.map
