import { createTeam } from '../../../lib/server-only/team/create-team.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZCreateTeamRequestSchema, ZCreateTeamResponseSchema } from './create-team.types.js';

const createTeamRoute = authenticatedProcedure
// .meta(createOrganisationGroupMeta)
.input(ZCreateTeamRequestSchema).output(ZCreateTeamResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamName,
    teamUrl,
    organisationId,
    inheritMembers
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  return await createTeam({
    userId: user.id,
    teamName,
    teamUrl,
    organisationId,
    inheritMembers
  });
});

export { createTeamRoute };
//# sourceMappingURL=create-team.js.map
