import { createOrganisationMemberInvites } from '../../../lib/server-only/organisation/create-organisation-member-invites.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZCreateOrganisationMemberInvitesRequestSchema, ZCreateOrganisationMemberInvitesResponseSchema } from './create-organisation-member-invites.types.js';

const createOrganisationMemberInvitesRoute = authenticatedProcedure.input(ZCreateOrganisationMemberInvitesRequestSchema).output(ZCreateOrganisationMemberInvitesResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    organisationId,
    invitations
  } = input;
  const userId = ctx.user.id;
  const userName = ctx.user.name || '';
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  await createOrganisationMemberInvites({
    userId,
    userName,
    organisationId,
    invitations
  });
});

export { createOrganisationMemberInvitesRoute };
//# sourceMappingURL=create-organisation-member-invites.js.map
