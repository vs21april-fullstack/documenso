import { updateTeam } from '../../../lib/server-only/team/update-team.js';
import { updateTeamPublicProfile } from '../../../lib/server-only/team/update-team-public-profile.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZUpdateTeamRequestSchema, ZUpdateTeamResponseSchema } from './update-team.types.js';

const updateTeamRoute = authenticatedProcedure
//   .meta(updateTeamMeta)
.input(ZUpdateTeamRequestSchema).output(ZUpdateTeamResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    data
  } = input;
  const {
    name,
    url,
    profileBio,
    profileEnabled
  } = data;
  ctx.logger.info({
    input: {
      teamId
    }
  });
  if (name || url) {
    await updateTeam({
      userId: ctx.user.id,
      teamId,
      data: {
        name,
        url
      }
    });
  }
  if (profileBio || profileEnabled !== undefined) {
    await updateTeamPublicProfile({
      userId: ctx.user.id,
      teamId,
      data: {
        bio: profileBio,
        enabled: profileEnabled
      }
    });
  }
});

export { updateTeamRoute };
//# sourceMappingURL=update-team.js.map
