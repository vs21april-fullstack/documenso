import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetOrganisationRequestSchema, ZGetOrganisationResponseSchema } from './get-organisation.types.js';

const getOrganisationRoute = authenticatedProcedure
//   .meta(getOrganisationMeta)
.input(ZGetOrganisationRequestSchema).output(ZGetOrganisationResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    organisationReference
  } = input;
  ctx.logger.info({
    input: {
      organisationReference
    }
  });
  return await getOrganisation({
    userId: ctx.user.id,
    organisationReference
  });
});
const getOrganisation = async ({
  userId,
  organisationReference
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: {
      OR: [{
        id: organisationReference
      }, {
        url: organisationReference
      }],
      members: {
        some: {
          userId
        }
      }
    },
    include: {
      organisationGlobalSettings: true,
      subscription: true,
      organisationClaim: true,
      members: {
        select: {
          id: true
        }
      },
      teams: {
        where: {
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
      }
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Organisation not found'
    });
  }
  return {
    ...organisation,
    teams: organisation.teams
  };
};

export { getOrganisation, getOrganisationRoute };
//# sourceMappingURL=get-organisation.js.map
