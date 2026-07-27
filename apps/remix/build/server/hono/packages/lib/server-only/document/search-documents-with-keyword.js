import { getHighestTeamRoleInGroup, formatDocumentsPath } from '../../utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { DocumentStatus, EnvelopeType, DocumentVisibility, TeamMemberRole } from '@prisma/client';
import { match } from 'ts-pattern';
import { mapSecondaryIdToDocumentId } from '../../utils/envelope.js';
import { getUserTeamGroups } from '../team/get-user-team-groups.js';

const searchDocumentsWithKeyword = async ({
  query,
  userId,
  limit = 20
}) => {
  if (!query.trim()) {
    return [];
  }
  const [user, teamGroupsByTeamId] = await Promise.all([prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    }
  }), getUserTeamGroups({
    userId
  })]);
  const teamIds = [...teamGroupsByTeamId.keys()];
  const filters = [
  // Documents owned by the user matching title, externalId, or recipient email.
  {
    userId,
    deletedAt: null,
    OR: [{
      title: {
        contains: query
      }
    }, {
      externalId: {
        contains: query
      }
    }, {
      recipients: {
        some: {
          email: {
            contains: query
          }
        }
      }
    }]
  },
  // Documents where the user is a recipient (completed or pending).
  {
    status: {
      in: [DocumentStatus.COMPLETED, DocumentStatus.PENDING]
    },
    recipients: {
      some: {
        email: user.email
      }
    },
    title: {
      contains: query
    },
    deletedAt: null
  }];
  // Team documents the user has access to.
  if (teamIds.length > 0) {
    filters.push({
      teamId: {
        in: teamIds
      },
      deletedAt: null,
      OR: [{
        title: {
          contains: query
        }
      }, {
        externalId: {
          contains: query
        }
      }, {
        recipients: {
          some: {
            email: {
              contains: query
            }
          }
        }
      }]
    });
  }
  const envelopes = await prismaWithReplicas.envelope.findMany({
    where: {
      type: EnvelopeType.DOCUMENT,
      OR: filters
    },
    select: {
      id: true,
      userId: true,
      teamId: true,
      title: true,
      secondaryId: true,
      visibility: true,
      recipients: {
        select: {
          email: true,
          token: true
        }
      },
      team: {
        select: {
          url: true
        }
      }
    },
    distinct: ['id'],
    orderBy: {
      createdAt: 'desc'
    },
    // Over-fetch to compensate for post-query visibility filtering on team documents.
    take: limit * 3
  });
  const results = envelopes.filter(envelope => {
    if (!envelope.teamId || envelope.userId === user.id) {
      return true;
    }
    const teamGroups = teamGroupsByTeamId.get(envelope.teamId) ?? [];
    const teamMemberRole = getHighestTeamRoleInGroup(teamGroups);
    if (!teamMemberRole) {
      return false;
    }
    return match([envelope.visibility, teamMemberRole]).with([DocumentVisibility.EVERYONE, TeamMemberRole.ADMIN], () => true).with([DocumentVisibility.EVERYONE, TeamMemberRole.MANAGER], () => true).with([DocumentVisibility.EVERYONE, TeamMemberRole.MEMBER], () => true).with([DocumentVisibility.MANAGER_AND_ABOVE, TeamMemberRole.ADMIN], () => true).with([DocumentVisibility.MANAGER_AND_ABOVE, TeamMemberRole.MANAGER], () => true).with([DocumentVisibility.ADMIN, TeamMemberRole.ADMIN], () => true).otherwise(() => false);
  }).slice(0, limit).map(envelope => {
    const legacyDocumentId = mapSecondaryIdToDocumentId(envelope.secondaryId);
    let path;
    if (envelope.userId === user.id || envelope.teamId && teamGroupsByTeamId.has(envelope.teamId)) {
      path = `${formatDocumentsPath(envelope.team.url)}/${legacyDocumentId}`;
    } else {
      const signingToken = envelope.recipients.find(r => r.email === user.email)?.token;
      path = `/sign/${signingToken}`;
    }
    return {
      title: envelope.title,
      path,
      value: [envelope.id, envelope.title, ...envelope.recipients.map(r => r.email)].join(' ')
    };
  });
  return results;
};

export { searchDocumentsWithKeyword };
//# sourceMappingURL=search-documents-with-keyword.js.map
