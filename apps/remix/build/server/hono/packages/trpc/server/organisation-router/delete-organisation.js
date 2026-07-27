import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { deleteOrganisation } from '../../../lib/server-only/organisation/delete-organisation.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZDeleteOrganisationRequestSchema, ZDeleteOrganisationResponseSchema } from './delete-organisation.types.js';

const deleteOrganisationRoute = authenticatedProcedure
//   .meta(deleteOrganisationMeta)
.input(ZDeleteOrganisationRequestSchema).output(ZDeleteOrganisationResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    organisationId
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId: user.id,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['DELETE_ORGANISATION']
    }),
    select: {
      id: true,
      owner: {
        select: {
          id: true
        }
      },
      teams: {
        select: {
          id: true
        }
      },
      subscription: {
        select: {
          planId: true
        }
      }
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not authorized to delete this organisation'
    });
  }
  await deleteOrganisation({
    organisation
  });
});

export { deleteOrganisationRoute };
//# sourceMappingURL=delete-organisation.js.map
