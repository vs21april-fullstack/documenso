import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TemplateType, EnvelopeType } from '@prisma/client';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { getMemberRoles } from '../team/get-member-roles.js';
import { getTeamById } from '../team/get-team.js';

const findOrganisationTemplates = async ({
  userId,
  teamId,
  page = 1,
  perPage = 10
}) => {
  const [team, {
    teamRole
  }] = await Promise.all([getTeamById({
    teamId,
    userId
  }), getMemberRoles({
    teamId,
    reference: {
      type: 'User',
      id: userId
    }
  })]);
  const where = {
    type: EnvelopeType.TEMPLATE,
    templateType: TemplateType.ORGANISATION,
    visibility: {
      in: TEAM_DOCUMENT_VISIBILITY_MAP[teamRole]
    },
    team: {
      organisationId: team.organisationId
    }
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

export { findOrganisationTemplates };
//# sourceMappingURL=find-organisation-templates.js.map
