import { authenticatedProcedure } from '../trpc.js';
import { ZDeleteOrganisationMemberRequestSchema, ZDeleteOrganisationMemberResponseSchema } from './delete-organisation-member.types.js';
import { deleteOrganisationMembers } from './delete-organisation-members.js';

const deleteOrganisationMemberRoute = authenticatedProcedure
//   .meta(deleteOrganisationMemberMeta)
.input(ZDeleteOrganisationMemberRequestSchema).output(ZDeleteOrganisationMemberResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    organisationId,
    organisationMemberId
  } = input;
  const userId = ctx.user.id;
  ctx.logger.info({
    input: {
      organisationId,
      organisationMemberId
    }
  });
  await deleteOrganisationMembers({
    userId,
    organisationId,
    organisationMemberIds: [organisationMemberId]
  });
});

export { deleteOrganisationMemberRoute };
//# sourceMappingURL=delete-organisation-member.js.map
