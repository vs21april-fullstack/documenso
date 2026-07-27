import { getHighestOrganisationRoleInGroup } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetOrganisationsRequestSchema, ZGetOrganisationsResponseSchema } from './get-organisations.types.js';

const getOrganisationsRoute = authenticatedProcedure
//   .meta(getOrganisationsMeta)
.input(ZGetOrganisationsRequestSchema).output(ZGetOrganisationsResponseSchema).query(async ({
  ctx
}) => {
  const {
    user
  } = ctx;
  return getOrganisations({
    userId: user.id
  });
});
const getOrganisations = async ({
  userId
}) => {
  const organisations = await prismaWithReplicas.organisation.findMany({
    where: {
      members: {
        some: {
          userId
        }
      }
    },
    include: {
      members: {
        where: {
          userId
        }
      },
      groups: {
        where: {
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
  });
  return organisations.map(({
    groups,
    ...organisation
  }) => {
    const currentOrganisationRole = getHighestOrganisationRoleInGroup(groups);
    return {
      ...organisation,
      currentOrganisationRole: currentOrganisationRole,
      currentMemberId: organisation.members[0].id
    };
  });
};

export { getOrganisations, getOrganisationsRoute };
//# sourceMappingURL=get-organisations.js.map
