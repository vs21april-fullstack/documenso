import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/teams.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getMemberRoles } from '../../../lib/server-only/team/get-member-roles.js';
import { buildTeamWhereQuery, isTeamRoleWithinUserHierarchy } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationGroupType } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZDeleteTeamMemberRequestSchema, ZDeleteTeamMemberResponseSchema } from './delete-team-member.types.js';

const deleteTeamMemberRoute = authenticatedProcedure
// .meta(deleteTeamMemberMeta)
.input(ZDeleteTeamMemberRequestSchema).output(ZDeleteTeamMemberResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    teamId,
    memberId
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      teamId,
      memberId
    }
  });
  const team = await prismaWithReplicas.team.findFirst({
    where: buildTeamWhereQuery({
      teamId,
      userId: user.id,
      roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
    }),
    include: {
      organisation: {
        select: {
          ownerUserId: true
        }
      },
      teamGroups: {
        where: {
          organisationGroup: {
            type: OrganisationGroupType.INTERNAL_TEAM,
            organisationGroupMembers: {
              some: {
                organisationMember: {
                  id: memberId
                }
              }
            }
          }
        },
        include: {
          organisationGroup: {
            include: {
              organisationGroupMembers: {
                include: {
                  organisationMember: true
                }
              }
            }
          }
        }
      }
    }
  });
  if (!team) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
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
  const {
    teamRole: currentMemberToDeleteTeamRole
  } = await getMemberRoles({
    teamId,
    reference: {
      type: 'Member',
      id: memberId
    }
  });
  // Check role permissions.
  if (!isTeamRoleWithinUserHierarchy(currentUserTeamRole, currentMemberToDeleteTeamRole)) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'Cannot remove a member with a higher role'
    });
  }
  const teamGroupToRemoveMemberFrom = team.teamGroups[0];
  // Sanity check.
  // This means that the member was inherited (which means they should not be deleted directly)
  // or it means that they are not part of any team groups relating to this?
  if (team.teamGroups.length !== 1) {
    console.error('Member must have 1 one internal team group. This should not happen.');
    // Todo: Logging.
  }
  if (team.teamGroups.length === 0) {
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Team has no internal team groups'
    });
  }
  const removedMember = teamGroupToRemoveMemberFrom.organisationGroup.organisationGroupMembers.find(ogm => ogm.organisationMember.id === memberId);
  if (!removedMember) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Member not found in this team'
    });
  }
  await prismaWithReplicas.$transaction(async tx => {
    // Removing a user from a single team drops their INTERNAL_TEAM
    // OrganisationGroupMember link, but Envelope rows they authored in this
    // team still point at their userId. Reassign to the org owner so those
    // envelopes remain reachable after the member loses team access.
    await tx.envelope.updateMany({
      where: {
        userId: removedMember.organisationMember.userId,
        teamId
      },
      data: {
        userId: team.organisation.ownerUserId
      }
    });
    await tx.organisationGroupMember.delete({
      where: {
        organisationMemberId_groupId: {
          organisationMemberId: memberId,
          groupId: teamGroupToRemoveMemberFrom.organisationGroupId
        }
      }
    });
  });
});

export { deleteTeamMemberRoute };
//# sourceMappingURL=delete-team-member.js.map
