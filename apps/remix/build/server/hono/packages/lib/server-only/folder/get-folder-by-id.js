import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getTeamById } from '../team/get-team.js';

const getFolderById = async ({
  userId,
  teamId,
  folderId,
  type
}) => {
  const team = await getTeamById({
    userId,
    teamId
  });
  const folder = await prismaWithReplicas.folder.findFirst({
    where: {
      id: folderId,
      team: buildTeamWhereQuery({
        teamId,
        userId
      }),
      type,
      visibility: {
        in: TEAM_DOCUMENT_VISIBILITY_MAP[team.currentTeamRole]
      }
    }
  });
  if (!folder) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Folder not found'
    });
  }
  return folder;
};

export { getFolderById };
//# sourceMappingURL=get-folder-by-id.js.map
