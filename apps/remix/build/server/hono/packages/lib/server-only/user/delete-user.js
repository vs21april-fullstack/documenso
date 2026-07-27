import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { deleteOrganisation } from '../organisation/delete-organisation.js';

const deleteUser = async ({
  id
}) => {
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id
    },
    include: {
      ownedOrganisations: {
        include: {
          teams: {
            select: {
              id: true
            }
          },
          subscription: {
            select: {
              planId: true
            }
          }
        }
      },
      organisationMember: {
        include: {
          organisation: {
            include: {
              teams: {
                select: {
                  id: true
                }
              }
            }
          }
        }
      }
    }
  });
  if (!user) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: `User with ID ${id} not found`
    });
  }
  // Get team IDs from organisations the user is a member of (but not owner).
  const memberTeams = user.organisationMember.filter(member => member.organisation.ownerUserId !== user.id).flatMap(member => member.organisation.teams.map(team => ({
    teamId: team.id,
    orgOwnerId: member.organisation.ownerUserId
  })));
  // For organisations the user owns - fully tear them down (orphan envelopes,
  // delete the organisation, and cancel any Stripe subscription). Without this
  // the organisations would only cascade away when the user row is deleted,
  // leaving their subscriptions billing and account rows behind.
  for (const organisation of user.ownedOrganisations) {
    await deleteOrganisation({
      organisation
    });
  }
  // For teams where user is a member (not owner) - transfer envelopes to team owner.
  await Promise.all(memberTeams.map(async ({
    teamId,
    orgOwnerId
  }) => {
    return prismaWithReplicas.envelope.updateMany({
      where: {
        userId: user.id,
        teamId
      },
      data: {
        userId: orgOwnerId
      }
    });
  }));
  return await prismaWithReplicas.user.delete({
    where: {
      id: user.id
    }
  });
};

export { deleteUser };
//# sourceMappingURL=delete-user.js.map
