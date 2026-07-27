import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZUpdateAdminOrganisationRequestSchema, ZUpdateAdminOrganisationResponseSchema } from './update-admin-organisation.types.js';

const updateAdminOrganisationRoute = adminProcedure.input(ZUpdateAdminOrganisationRequestSchema).output(ZUpdateAdminOrganisationResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    organisationId,
    data
  } = input;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  const organisation = await prismaWithReplicas.organisation.findUnique({
    where: {
      id: organisationId
    },
    include: {
      organisationClaim: true
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  const {
    name,
    url,
    customerId,
    claims,
    originalSubscriptionClaimId
  } = data;
  await prismaWithReplicas.organisation.update({
    where: {
      id: organisationId
    },
    data: {
      name,
      url,
      customerId: customerId ? customerId : undefined
    }
  });
  await prismaWithReplicas.organisationClaim.update({
    where: {
      id: organisation.organisationClaimId
    },
    data: {
      ...claims,
      originalSubscriptionClaimId
    }
  });
});

export { updateAdminOrganisationRoute };
//# sourceMappingURL=update-admin-organisation.js.map
