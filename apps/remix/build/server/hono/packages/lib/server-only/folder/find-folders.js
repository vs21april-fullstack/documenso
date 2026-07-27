import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getTeamById } from '../team/get-team.js';

const findFolders = async ({
  userId,
  teamId,
  parentId,
  type,
  page = 1,
  perPage = 10
}) => {
  const team = await getTeamById({
    userId,
    teamId
  });
  const whereClause = {
    parentId,
    team: buildTeamWhereQuery({
      teamId,
      userId
    }),
    type,
    visibility: {
      in: TEAM_DOCUMENT_VISIBILITY_MAP[team.currentTeamRole]
    }
  };
  const [data, count] = await Promise.all([prismaWithReplicas.folder.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc'
    }
  }), prismaWithReplicas.folder.count({
    where: whereClause
  })]);
  return {
    data,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findFolders };
//# sourceMappingURL=find-folders.js.map
