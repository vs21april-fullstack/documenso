import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getTeamById } from '../team/get-team.js';

const updateFolder = async ({
  userId,
  teamId,
  folderId,
  data
}) => {
  const {
    parentId,
    name,
    visibility,
    pinned
  } = data;
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
  if (parentId) {
    const parentFolder = await prismaWithReplicas.folder.findFirst({
      where: {
        id: parentId,
        team: buildTeamWhereQuery({
          teamId,
          userId
        }),
        type: folder.type
      }
    });
    if (!parentFolder) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Parent folder not found'
      });
    }
    if (parentId === folderId) {
      throw new AppError(AppErrorCode.INVALID_REQUEST, {
        message: 'Cannot move a folder into itself'
      });
    }
    let currentParentId = parentFolder.parentId;
    while (currentParentId) {
      if (currentParentId === folderId) {
        throw new AppError(AppErrorCode.INVALID_REQUEST, {
          message: 'Cannot move a folder into its descendant'
        });
      }
      const currentParent = await prismaWithReplicas.folder.findUnique({
        where: {
          id: currentParentId
        },
        select: {
          parentId: true
        }
      });
      if (!currentParent) {
        break;
      }
      currentParentId = currentParent.parentId;
    }
  }
  return await prismaWithReplicas.folder.update({
    where: {
      id: folderId,
      team: buildTeamWhereQuery({
        teamId,
        userId
      })
    },
    data: {
      name,
      visibility,
      parentId,
      pinned
    }
  });
};

export { updateFolder };
//# sourceMappingURL=update-folder.js.map
