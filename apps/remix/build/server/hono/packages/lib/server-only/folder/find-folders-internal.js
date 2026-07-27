import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { getTeamById } from '../team/get-team.js';

const findFoldersInternal = async ({
  userId,
  teamId,
  parentId,
  type
}) => {
  const team = await getTeamById({
    userId,
    teamId
  });
  const visibilityFilters = {
    visibility: {
      in: TEAM_DOCUMENT_VISIBILITY_MAP[team.currentTeamRole]
    }
  };
  const whereClause = {
    AND: [{
      parentId
    }, {
      OR: [{
        teamId,
        ...visibilityFilters
      }, {
        userId,
        teamId
      }]
    }]
  };
  try {
    const folders = await prismaWithReplicas.folder.findMany({
      where: {
        ...whereClause,
        ...(type ? {
          type
        } : {})
      },
      orderBy: [{
        pinned: 'desc'
      }, {
        createdAt: 'desc'
      }]
    });
    const foldersWithDetails = await Promise.all(folders.map(async folder => {
      try {
        const [subfolders, documentCount, templateCount, subfolderCount] = await Promise.all([prismaWithReplicas.folder.findMany({
          where: {
            parentId: folder.id,
            teamId,
            ...visibilityFilters
          },
          orderBy: {
            createdAt: 'desc'
          }
        }), prismaWithReplicas.envelope.count({
          where: {
            type: EnvelopeType.DOCUMENT,
            folderId: folder.id,
            deletedAt: null
          }
        }), prismaWithReplicas.envelope.count({
          where: {
            type: EnvelopeType.TEMPLATE,
            folderId: folder.id,
            deletedAt: null
          }
        }), prismaWithReplicas.folder.count({
          where: {
            parentId: folder.id,
            teamId,
            ...visibilityFilters
          }
        })]);
        const subfoldersWithEmptySubfolders = subfolders.map(subfolder => ({
          ...subfolder,
          subfolders: [],
          _count: {
            documents: 0,
            templates: 0,
            subfolders: 0
          }
        }));
        return {
          ...folder,
          subfolders: subfoldersWithEmptySubfolders,
          _count: {
            documents: documentCount,
            templates: templateCount,
            subfolders: subfolderCount
          }
        };
      } catch (error) {
        console.error('Error processing folder:', folder.id, error);
        throw error;
      }
    }));
    return foldersWithDetails;
  } catch (error) {
    console.error('Error in findFolders:', error);
    throw error;
  }
};

export { findFoldersInternal };
//# sourceMappingURL=find-folders-internal.js.map
