import { acceptOrganisationInvitation } from '../../../lib/server-only/organisation/accept-organisation-invitation.js';
import { maybeAuthenticatedProcedure } from '../trpc.js';
import { ZAcceptOrganisationMemberInviteRequestSchema, ZAcceptOrganisationMemberInviteResponseSchema } from './accept-organisation-member-invite.types.js';

const acceptOrganisationMemberInviteRoute = maybeAuthenticatedProcedure.input(ZAcceptOrganisationMemberInviteRequestSchema).output(ZAcceptOrganisationMemberInviteResponseSchema).mutation(async ({
  input
}) => {
  const {
    token
  } = input;
  return await acceptOrganisationInvitation({
    token
  });
});

export { acceptOrganisationMemberInviteRoute };
//# sourceMappingURL=accept-organisation-member-invite.js.map
