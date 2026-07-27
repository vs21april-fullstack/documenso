import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { getMemberRoles } from '../team/get-member-roles.js';

const findTemplates = async ({
  userId,
  teamId,
  type,
  page = 1,
  perPage = 10,
  folderId
}) => {
  const {
    teamRole
  } = await getMemberRoles({
    teamId,
    reference: {
      type: 'User',
      id: userId
    }
  });
  const where = {
    type: EnvelopeType.TEMPLATE,
    templateType: type,
    AND: [{
      teamId
    }, {
      OR: [{
        visibility: {
          in: TEAM_DOCUMENT_VISIBILITY_MAP[teamRole]
        }
      }, {
        userId,
        teamId
      }]
    }, folderId ? {
      folderId
    } : {
      folderId: null
    }]
  };
  const templateInclude = {
    team: {
      select: {
        id: true,
        url: true,
        name: true
      }
    },
    fields: true,
    recipients: true,
    documentMeta: true,
    directLink: {
      select: {
        token: true,
        enabled: true
      }
    }
  };
  const [data, count] = await Promise.all([prismaWithReplicas.envelope.findMany({
    where,
    include: templateInclude,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc'
    }
  }), prismaWithReplicas.envelope.count({
    where
  })]);
  return {
    data,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findTemplates };
//# sourceMappingURL=find-templates.js.map
