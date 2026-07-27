import { syncMemberCountWithStripeSeatPlan } from '../../../ee/server-only/stripe/update-subscription-item-quantity.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { jobs } from '../../../lib/jobs/client.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationMemberInviteStatus } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZLeaveOrganisationRequestSchema, ZLeaveOrganisationResponseSchema } from './leave-organisation.types.js';

const leaveOrganisationRoute = authenticatedProcedure.input(ZLeaveOrganisationRequestSchema).output(ZLeaveOrganisationResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    organisationId
  } = input;
  const userId = ctx.user.id;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId
    }),
    include: {
      organisationClaim: true,
      subscription: true,
      teams: {
        select: {
          id: true
        }
      },
      invites: {
        where: {
          status: OrganisationMemberInviteStatus.PENDING
        },
        select: {
          id: true
        }
      },
      members: {
        select: {
          id: true
        }
      }
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  // The organisation owner cannot leave their own organisation. Ownership must
  // be transferred to another member first.
  if (organisation.ownerUserId === userId) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You cannot leave an organisation you own. Please transfer ownership first.'
    });
  }
  const {
    organisationClaim
  } = organisation;
  const inviteCount = organisation.invites.length;
  const newMemberCount = organisation.members.length + inviteCount - 1;
  // Leaving is a reducing operation, so we don't gate it on the subscription
  // being present. Sync Stripe only when one exists.
  if (organisation.subscription) {
    await syncMemberCountWithStripeSeatPlan(organisation.subscription, organisationClaim, newMemberCount);
  }
  const teamIds = organisation.teams.map(team => team.id);
  await prismaWithReplicas.$transaction(async tx => {
    // Leaving the org cascades the user out of every team via
    // OrganisationGroupMember, but their authored Envelope rows still
    // reference them. Reassign those to the org owner so they remain
    // reachable after the member loses access (mirrors delete-user.ts).
    if (teamIds.length > 0) {
      await tx.envelope.updateMany({
        where: {
          userId,
          teamId: {
            in: teamIds
          }
        },
        data: {
          userId: organisation.ownerUserId
        }
      });
    }
    await tx.organisationMember.delete({
      where: {
        userId_organisationId: {
          userId,
          organisationId
        }
      }
    });
  });
  await jobs.triggerJob({
    name: 'send.organisation-member-left.email',
    payload: {
      organisationId: organisation.id,
      memberUserId: userId
    }
  });
});

export { leaveOrganisationRoute };
//# sourceMappingURL=leave-organisation.js.map
