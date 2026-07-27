import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/teams.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getMemberRoles } from '../../../lib/server-only/team/get-member-roles.js';
import { buildTeamWhereQuery, isTeamRoleWithinUserHierarchy } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationGroupType, OrganisationMemberRole } from '../../../prisma/generated/types.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZDeleteTeamGroupRequestSchema, ZDeleteTeamGroupResponseSchema } from './delete-team-group.types.js';

const deleteTeamGroupRoute = authenticatedProcedure
// .meta(deleteTeamGroupMeta)
.input(ZDeleteTeamGroupRequestSchema).output(ZDeleteTeamGroupResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamGroupId,
    teamId
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      teamGroupId,
      teamId
    }
  });
  const team = await prismaWithReplicas.team.findFirst({
    where: buildTeamWhereQuery({
      teamId,
      userId: user.id,
      roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
    })
  });
  if (!team) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
  }
  const group = await prismaWithReplicas.teamGroup.findFirst({
    where: {
      id: teamGroupId,
      team: {
        id: teamId
      }
    },
    include: {
      organisationGroup: true
    }
  });
  if (!group) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Team group not found'
    });
  }
  // You cannot delete internal team groups. These are the system-managed
  // admin/manager/member groups that back the team's role-based access, and
  // deleting them would silently strip team members of their access.
  if (group.organisationGroup.type === OrganisationGroupType.INTERNAL_TEAM) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not allowed to delete internal team groups'
    });
  }
  // You cannot delete internal organisation groups.
  // The only exception is deleting the "member" organisation group which is used to allow
  // all organisation members to access a team.
  if (group.organisationGroup.type === OrganisationGroupType.INTERNAL_ORGANISATION && group.organisationGroup.organisationRole !== OrganisationMemberRole.MEMBER) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not allowed to delete internal organisaion groups'
    });
  }
  const {
    teamRole: currentUserTeamRole
  } = await getMemberRoles({
    teamId,
    reference: {
      type: 'User',
      id: user.id
    }
  });
  if (!isTeamRoleWithinUserHierarchy(currentUserTeamRole, group.teamRole)) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not allowed to delete this team group'
    });
  }
  await prismaWithReplicas.teamGroup.delete({
    where: {
      id: teamGroupId,
      teamId
    }
  });
});

export { deleteTeamGroupRoute };
//# sourceMappingURL=delete-team-group.js.map
