import { findTeams } from '../../../lib/server-only/team/find-teams.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindTeamsRequestSchema, ZFindTeamsResponseSchema } from './find-teams.types.js';

const findTeamsRoute = authenticatedProcedure
//   .meta(getTeamsMeta)
.input(ZFindTeamsRequestSchema).output(ZFindTeamsResponseSchema).query(async ({
  ctx,
  input
}) => {
  const {
    organisationId
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  return findTeams({
    userId: user.id,
    organisationId
  });
});

export { findTeamsRoute };
//# sourceMappingURL=find-teams.js.map
