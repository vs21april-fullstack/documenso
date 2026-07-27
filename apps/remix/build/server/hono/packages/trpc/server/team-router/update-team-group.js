import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/teams.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getMemberRoles } from '../../../lib/server-only/team/get-member-roles.js';
import { buildTeamWhereQuery, isTeamRoleWithinUserHierarchy } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationGroupType } from '../../../prisma/generated/types.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZUpdateTeamGroupRequestSchema, ZUpdateTeamGroupResponseSchema } from './update-team-group.types.js';

const updateTeamGroupRoute = authenticatedProcedure
// .meta(updateTeamGroupMeta)
.input(ZUpdateTeamGroupRequestSchema).output(ZUpdateTeamGroupResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    id,
    data
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      id,
      data: {
        teamRole: data.teamRole
      }
    }
  });
  const teamGroup = await prismaWithReplicas.teamGroup.findFirst({
    where: {
      id,
      team: buildTeamWhereQuery({
        teamId: undefined,
        userId: user.id,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
      })
    },
    include: {
      organisationGroup: true
    }
  });
  if (!teamGroup) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Team group not found'
    });
  }
  if (teamGroup.organisationGroup.type === OrganisationGroupType.INTERNAL_ORGANISATION || teamGroup.organisationGroup.type === OrganisationGroupType.INTERNAL_TEAM) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not allowed to update internal groups'
    });
  }
  const {
    teamRole: currentUserTeamRole
  } = await getMemberRoles({
    teamId: teamGroup.teamId,
    reference: {
      type: 'User',
      id: user.id
    }
  });
  if (!isTeamRoleWithinUserHierarchy(currentUserTeamRole, teamGroup.teamRole)) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not allowed to update this team group'
    });
  }
  if (!isTeamRoleWithinUserHierarchy(currentUserTeamRole, data.teamRole)) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not allowed to set a team role higher than your own'
    });
  }
  await prismaWithReplicas.teamGroup.update({
    where: {
      id
    },
    data: {
      teamRole: data.teamRole
    }
  });
});

export { updateTeamGroupRoute };
//# sourceMappingURL=update-team-group.js.map
