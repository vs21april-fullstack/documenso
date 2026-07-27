import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationGroupType } from '@prisma/client';
import { adminProcedure } from '../trpc.js';
import { ZDeleteAdminTeamMemberRequestSchema, ZDeleteAdminTeamMemberResponseSchema } from './delete-team-member.types.js';

const deleteAdminTeamMemberRoute = adminProcedure.input(ZDeleteAdminTeamMemberRequestSchema).output(ZDeleteAdminTeamMemberResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    teamId,
    memberId
  } = input;
  ctx.logger.info({
    input: {
      teamId,
      memberId
    }
  });
  const team = await prismaWithReplicas.team.findUnique({
    where: {
      id: teamId
    },
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
        }
      }
    }
  });
  if (!team) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Team not found'
    });
  }
  const teamGroupToRemoveMemberFrom = team.teamGroups[0];
  if (!teamGroupToRemoveMemberFrom) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Member is not directly assigned to this team. Inherited members cannot be removed here.'
    });
  }
  const member = await prismaWithReplicas.organisationMember.findUnique({
    where: {
      id: memberId
    },
    select: {
      userId: true
    }
  });
  if (!member) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Member not found'
    });
  }
  await prismaWithReplicas.$transaction(async tx => {
    // Removing a user from a single team drops their INTERNAL_TEAM
    // OrganisationGroupMember link, but Envelope rows they authored in this
    // team still point at their userId. Reassign to the org owner so those
    // envelopes remain reachable after the member loses team access.
    await tx.envelope.updateMany({
      where: {
        userId: member.userId,
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

export { deleteAdminTeamMemberRoute };
//# sourceMappingURL=delete-team-member.js.map
