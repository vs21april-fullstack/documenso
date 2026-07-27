import { getTeam } from '../../../lib/server-only/team/get-team.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetTeamRequestSchema, ZGetTeamResponseSchema } from './get-team.types.js';

const getTeamRoute = authenticatedProcedure
//   .meta(getTeamMeta)
.input(ZGetTeamRequestSchema).output(ZGetTeamResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamReference
  } = input;
  ctx.logger.info({
    input: {
      teamReference
    }
  });
  return await getTeam({
    teamReference,
    userId: ctx.user.id
  });
});

export { getTeamRoute };
//# sourceMappingURL=get-team.js.map
