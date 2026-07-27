import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../../lib/constants/teams.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getMultipleEnvelopeWhereInput } from '../../../lib/server-only/envelope/get-envelopes-by-ids.js';
import { buildTeamWhereQuery } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZBulkMoveEnvelopesRequestSchema, ZBulkMoveEnvelopesResponseSchema } from './bulk-move-envelopes.types.js';

const bulkMoveEnvelopesRoute = authenticatedProcedure
// .meta(bulkMoveEnvelopesMeta)
.input(ZBulkMoveEnvelopesRequestSchema).output(ZBulkMoveEnvelopesResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    envelopeIds,
    envelopeType,
    folderId
  } = input;
  ctx.logger.info({
    input: {
      envelopeIds,
      envelopeType,
      folderId
    }
  });
  // Build the where input for the update query.
  const {
    envelopeWhereInput,
    team
  } = await getMultipleEnvelopeWhereInput({
    ids: {
      type: 'envelopeId',
      ids: envelopeIds
    },
    userId: user.id,
    teamId,
    type: envelopeType
  });
  // Validate folder access if moving to a folder (not root).
  if (folderId) {
    const folder = await prismaWithReplicas.folder.findFirst({
      where: {
        id: folderId,
        team: buildTeamWhereQuery({
          teamId,
          userId: user.id
        }),
        type: envelopeType,
        visibility: {
          in: TEAM_DOCUMENT_VISIBILITY_MAP[team.currentTeamRole]
        }
      }
    });
    if (!folder) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Folder not found or access denied'
      });
    }
  }
  const result = await prismaWithReplicas.envelope.updateMany({
    where: envelopeWhereInput,
    data: {
      folderId: folderId
    }
  });
  return {
    movedCount: result.count
  };
});

export { bulkMoveEnvelopesRoute };
//# sourceMappingURL=bulk-move-envelopes.js.map
