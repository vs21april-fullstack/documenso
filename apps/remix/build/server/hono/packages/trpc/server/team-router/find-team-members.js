import { findTeamMembers } from '../../../lib/server-only/team/find-team-members.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindTeamMembersRequestSchema, ZFindTeamMembersResponseSchema } from './find-team-members.types.js';

const findTeamMembersRoute = authenticatedProcedure.input(ZFindTeamMembersRequestSchema).output(ZFindTeamMembersResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    query,
    page,
    perPage
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      teamId
    }
  });
  return await findTeamMembers({
    userId: user.id,
    teamId,
    query,
    page,
    perPage
  });
});

export { findTeamMembersRoute };
//# sourceMappingURL=find-team-members.js.map
