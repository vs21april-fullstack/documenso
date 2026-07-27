import { buildTeamWhereQuery } from '../../utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';

const getRecipientSuggestions = async ({
  userId,
  teamId,
  query
}) => {
  const trimmedQuery = query.trim();
  const nameEmailFilter = trimmedQuery ? {
    OR: [{
      name: {
        contains: trimmedQuery
      }
    }, {
      email: {
        contains: trimmedQuery
      }
    }]
  } : {};
  const recipients = await prismaWithReplicas.recipient.findMany({
    where: {
      envelope: {
        type: EnvelopeType.DOCUMENT,
        team: buildTeamWhereQuery({
          teamId,
          userId
        })
      },
      ...nameEmailFilter
    },
    select: {
      name: true,
      email: true,
      envelope: {
        select: {
          createdAt: true
        }
      }
    },
    distinct: ['email'],
    orderBy: {
      envelope: {
        createdAt: 'desc'
      }
    },
    take: 5
  });
  if (teamId) {
    const teamMembers = await prismaWithReplicas.organisationMember.findMany({
      where: {
        user: {
          ...nameEmailFilter,
          NOT: {
            id: userId
          }
        },
        organisationGroupMembers: {
          some: {
            group: {
              teamGroups: {
                some: {
                  teamId
                }
              }
            }
          }
        }
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      },
      take: 5
    });
    const uniqueTeamMember = teamMembers.find(member => !recipients.some(r => r.email === member.user.email));
    if (uniqueTeamMember) {
      const teamMemberSuggestion = {
        email: uniqueTeamMember.user.email,
        name: uniqueTeamMember.user.name
      };
      const allSuggestions = [...recipients.slice(0, 4), teamMemberSuggestion];
      return allSuggestions;
    }
  }
  return recipients;
};

export { getRecipientSuggestions };
//# sourceMappingURL=get-recipient-suggestions.js.map
