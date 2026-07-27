import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { buildTeamWhereQuery, canAccessTeamDocument } from '../../utils/teams.js';
import { getTeamById } from '../team/get-team.js';

const deleteFolder = async ({
  userId,
  teamId,
  folderId
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
  const hasPermission = canAccessTeamDocument(team.currentTeamRole, folder.visibility);
  if (!hasPermission) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You do not have permission to delete this folder'
    });
  }
  return await prismaWithReplicas.folder.delete({
    where: {
      id: folder.id
    }
  });
};

export { deleteFolder };
//# sourceMappingURL=delete-folder.js.map
