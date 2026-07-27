import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { FolderType } from '../../types/folder-type.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getTeamSettings } from '../team/get-team-settings.js';

const createFolder = async ({
  userId,
  teamId,
  name,
  parentId,
  type = FolderType.DOCUMENT
}) => {
  // This indirectly verifies whether the user has access to the team.
  const settings = await getTeamSettings({
    userId,
    teamId
  });
  if (parentId) {
    const parentFolder = await prismaWithReplicas.folder.findFirst({
      where: {
        id: parentId,
        team: buildTeamWhereQuery({
          teamId,
          userId
        })
      }
    });
    if (!parentFolder) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Parent folder not found'
      });
    }
    if (parentFolder.type !== type) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: 'Parent folder type does not match the folder type'
      });
    }
  }
  return await prismaWithReplicas.folder.create({
    data: {
      name,
      userId,
      teamId,
      parentId,
      type,
      visibility: settings.documentVisibility
    }
  });
};

export { createFolder };
//# sourceMappingURL=create-folder.js.map
