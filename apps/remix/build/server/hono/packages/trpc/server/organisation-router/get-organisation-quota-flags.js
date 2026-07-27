import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { computeQuotaFlags } from '../../../lib/server-only/rate-limit/compute-quota-flags.js';
import { currentMonthlyPeriod } from '../../../lib/universal/monthly-period.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetOrganisationQuotaFlagsRequestSchema, ZGetOrganisationQuotaFlagsResponseSchema } from './get-organisation-quota-flags.types.js';

const getOrganisationQuotaFlagsRoute = authenticatedProcedure.input(ZGetOrganisationQuotaFlagsRequestSchema).output(ZGetOrganisationQuotaFlagsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    organisationId
  } = input;
  const userId = ctx.user.id;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  // Any member of the organisation may view quota usage flags.
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId
    }),
    include: {
      organisationClaim: true,
      monthlyStats: {
        where: {
          period: currentMonthlyPeriod()
        }
      }
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Organisation not found'
    });
  }
  return computeQuotaFlags({
    quotas: {
      documentQuota: organisation.organisationClaim.documentQuota,
      emailQuota: organisation.organisationClaim.emailQuota,
      apiQuota: organisation.organisationClaim.apiQuota
    },
    usage: organisation.monthlyStats[0] ?? undefined
  });
});

export { getOrganisationQuotaFlagsRoute };
//# sourceMappingURL=get-organisation-quota-flags.js.map
