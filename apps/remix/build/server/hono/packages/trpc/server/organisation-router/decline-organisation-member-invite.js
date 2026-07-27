import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationMemberInviteStatus } from '@prisma/client';
import { maybeAuthenticatedProcedure } from '../trpc.js';
import { ZDeclineOrganisationMemberInviteRequestSchema, ZDeclineOrganisationMemberInviteResponseSchema } from './decline-organisation-member-invite.types.js';

const declineOrganisationMemberInviteRoute = maybeAuthenticatedProcedure.input(ZDeclineOrganisationMemberInviteRequestSchema).output(ZDeclineOrganisationMemberInviteResponseSchema).mutation(async ({
  input
}) => {
  const {
    token
  } = input;
  const organisationMemberInvite = await prismaWithReplicas.organisationMemberInvite.findFirst({
    where: {
      token
    }
  });
  if (!organisationMemberInvite) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  await prismaWithReplicas.organisationMemberInvite.update({
    where: {
      id: organisationMemberInvite.id
    },
    data: {
      status: OrganisationMemberInviteStatus.DECLINED
    }
  });
  // TODO: notify the team owner
});

export { declineOrganisationMemberInviteRoute };
//# sourceMappingURL=decline-organisation-member-invite.js.map
