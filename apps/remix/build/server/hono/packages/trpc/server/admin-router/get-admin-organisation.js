import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZGetAdminOrganisationRequestSchema, ZGetAdminOrganisationResponseSchema } from './get-admin-organisation.types.js';

const getAdminOrganisationRoute = adminProcedure.input(ZGetAdminOrganisationRequestSchema).output(ZGetAdminOrganisationResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    organisationId
  } = input;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  return await getAdminOrganisation({
    organisationId
  });
});
const getAdminOrganisation = async ({
  organisationId
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: {
      id: organisationId
    },
    include: {
      organisationClaim: true,
      organisationGlobalSettings: true,
      teams: true,
      monthlyStats: {
        orderBy: {
          period: 'desc'
        }
      },
      members: {
        include: {
          organisationGroupMembers: {
            include: {
              group: true
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          }
        }
      },
      subscription: true
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Organisation not found'
    });
  }
  return {
    ...organisation
  };
};

export { getAdminOrganisation, getAdminOrganisationRoute };
//# sourceMappingURL=get-admin-organisation.js.map
