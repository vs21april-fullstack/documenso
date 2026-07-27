import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { sendOrganisationMemberInviteEmail } from '../../../lib/server-only/organisation/create-organisation-member-invites.js';
import { getMemberOrganisationRole } from '../../../lib/server-only/team/get-member-roles.js';
import { buildOrganisationWhereQuery, isOrganisationRoleWithinUserHierarchy } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZResendOrganisationMemberInviteRequestSchema, ZResendOrganisationMemberInviteResponseSchema } from './resend-organisation-member-invite.types.js';

const resendOrganisationMemberInviteRoute = authenticatedProcedure
//   .meta(resendOrganisationMemberInviteMeta)
.input(ZResendOrganisationMemberInviteRequestSchema).output(ZResendOrganisationMemberInviteResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    organisationId,
    invitationId
  } = input;
  const userId = ctx.user.id;
  const userName = ctx.user.name || '';
  ctx.logger.info({
    input: {
      organisationId,
      invitationId
    }
  });
  await resendOrganisationMemberInvitation({
    userId,
    userName,
    organisationId,
    invitationId
  });
});
/**
 * Resend an email for a given member invite.
 */
const resendOrganisationMemberInvitation = async ({
  userId,
  userName,
  organisationId,
  invitationId
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    }),
    include: {
      organisationGlobalSettings: true,
      invites: {
        where: {
          id: invitationId
        }
      }
    }
  });
  if (!organisation) {
    throw new AppError('OrganisationNotFound', {
      message: 'User is not a valid member of the team.',
      statusCode: 404
    });
  }
  const invitation = organisation.invites[0];
  if (!invitation) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Invitation does not exist'
    });
  }
  const currentUserOrganisationRole = await getMemberOrganisationRole({
    organisationId: organisation.id,
    reference: {
      type: 'User',
      id: userId
    }
  });
  // A user cannot interact with an invitation that is not within their own hierarchy.
  if (!isOrganisationRoleWithinUserHierarchy(currentUserOrganisationRole, invitation.organisationRole)) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You cannot resend an invite for a member with a higher role'
    });
  }
  await sendOrganisationMemberInviteEmail({
    email: invitation.email,
    token: invitation.token,
    senderName: userName,
    organisation
  });
};

export { resendOrganisationMemberInvitation, resendOrganisationMemberInviteRoute };
//# sourceMappingURL=resend-organisation-member-invite.js.map
