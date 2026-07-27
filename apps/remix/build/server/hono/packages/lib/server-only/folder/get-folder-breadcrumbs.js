import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TeamMemberRole } from '@prisma/client';
import { match } from 'ts-pattern';
import { DocumentVisibility } from '../../types/document-visibility.js';
import { getTeamById } from '../team/get-team.js';

const getFolderBreadcrumbs = async ({
  userId,
  teamId,
  folderId,
  type
}) => {
  const team = await getTeamById({
    userId,
    teamId
  });
  const visibilityFilters = match(team.currentTeamRole).with(TeamMemberRole.ADMIN, () => ({
    visibility: {
      in: [DocumentVisibility.EVERYONE, DocumentVisibility.MANAGER_AND_ABOVE, DocumentVisibility.ADMIN]
    }
  })).with(TeamMemberRole.MANAGER, () => ({
    visibility: {
      in: [DocumentVisibility.EVERYONE, DocumentVisibility.MANAGER_AND_ABOVE]
    }
  })).otherwise(() => ({
    visibility: DocumentVisibility.EVERYONE
  }));
  const whereClause = folderId => ({
    id: folderId,
    ...(type ? {
      type
    } : {}),
    OR: [{
      teamId,
      ...visibilityFilters
    }, {
      userId,
      teamId
    }]
  });
  const breadcrumbs = [];
  let currentFolderId = folderId;
  const currentFolder = await prismaWithReplicas.folder.findFirst({
    where: whereClause(currentFolderId)
  });
  if (!currentFolder) {
    return [];
  }
  breadcrumbs.push(currentFolder);
  while (currentFolder?.parentId) {
    const parentFolder = await prismaWithReplicas.folder.findFirst({
      where: whereClause(currentFolder.parentId)
    });
    if (!parentFolder) {
      break;
    }
    breadcrumbs.unshift(parentFolder);
    currentFolderId = parentFolder.id;
    currentFolder.parentId = parentFolder.parentId;
  }
  return breadcrumbs;
};

export { getFolderBreadcrumbs };
//# sourceMappingURL=get-folder-breadcrumbs.js.map
