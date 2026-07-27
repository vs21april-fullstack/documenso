import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

/**
 * Pre-resolve all team groups a user has access to via their organisation group memberships,
 * keyed by team ID.
 *
 * This is significantly cheaper than joining team groups inline in a Prisma `findMany`
 * because it avoids deep EXISTS subqueries and redundant LEFT JOINs per row.
 */
const getUserTeamGroups = async ({
  userId
}) => {
  const teamGroups = await prismaWithReplicas.teamGroup.findMany({
    where: {
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
  });
  const map = new Map();
  for (const tg of teamGroups) {
    const existing = map.get(tg.teamId);
    if (existing) {
      existing.push(tg);
    } else {
      map.set(tg.teamId, [tg]);
    }
  }
  return map;
};

export { getUserTeamGroups };
//# sourceMappingURL=get-user-team-groups.js.map
