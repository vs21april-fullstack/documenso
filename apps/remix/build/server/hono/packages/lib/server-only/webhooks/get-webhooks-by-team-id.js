import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const getWebhooksByTeamId = async (teamId, userId) => {
  return await prismaWithReplicas.webhook.findMany({
    where: {
      team: {
        id: teamId,
        teamGroups: {
          some: {
            organisationGroup: {
              organisationGroupMembers: {
                some: {
                  organisationMember: {
                    userId
                  }
                }
              }
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export { getWebhooksByTeamId };
//# sourceMappingURL=get-webhooks-by-team-id.js.map
