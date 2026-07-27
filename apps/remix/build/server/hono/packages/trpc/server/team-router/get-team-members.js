import { getTeamMembers } from '../../../lib/server-only/team/get-team-members.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetTeamMembersRequestSchema, ZGetTeamMembersResponseSchema } from './get-team-members.types.js';

const getTeamMembersRoute = authenticatedProcedure
//   .meta(getTeamMembersMeta)
.input(ZGetTeamMembersRequestSchema).output(ZGetTeamMembersResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      teamId
    }
  });
  return await getTeamMembers({
    userId: user.id,
    teamId
  });
});

export { getTeamMembersRoute };
//# sourceMappingURL=get-team-members.js.map
