import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { orphanEnvelopes } from '../../../lib/server-only/envelope/orphan-envelopes.js';
import { transferTeamEnvelopes } from '../../../lib/server-only/envelope/transfer-team-envelopes.js';
import { deleteTeam } from '../../../lib/server-only/team/delete-team.js';
import { getTeamById } from '../../../lib/server-only/team/get-team.js';
import { TeamMemberRole } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZDeleteTeamRequestSchema, ZDeleteTeamResponseSchema } from './delete-team.types.js';

const deleteTeamRoute = authenticatedProcedure
// .meta(deleteTeamMeta)
.input(ZDeleteTeamRequestSchema).output(ZDeleteTeamResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    transferTeamId
  } = input;
  const {
    user
  } = ctx;
  const team = await getTeamById({
    userId: user.id,
    teamId
  });
  if (team.currentTeamRole !== TeamMemberRole.ADMIN) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not allowed to delete this team'
    });
  }
  ctx.logger.info({
    input: {
      teamId
    }
  });
  const transferTeam = transferTeamId ? await getTeamById({
    userId: user.id,
    teamId: transferTeamId
  }).catch(() => {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Invalid transfer team ID'
    });
  }) : undefined;
  if (transferTeam) {
    await transferTeamEnvelopes({
      sourceTeamId: teamId,
      targetTeamId: transferTeam.id
    });
  } else {
    await orphanEnvelopes({
      teamId
    });
  }
  await deleteTeam({
    userId: user.id,
    teamId
  });
});

export { deleteTeamRoute };
//# sourceMappingURL=delete-team.js.map
