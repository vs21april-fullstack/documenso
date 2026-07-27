import { currentMonthlyPeriod } from '../../../lib/universal/monthly-period.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { match } from 'ts-pattern';
import { adminProcedure } from '../trpc.js';
import { ZResetOrganisationMonthlyStatRequestSchema, ZResetOrganisationMonthlyStatResponseSchema } from './reset-organisation-monthly-stat.types.js';

const resetOrganisationMonthlyStatRoute = adminProcedure.input(ZResetOrganisationMonthlyStatRequestSchema).output(ZResetOrganisationMonthlyStatResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    organisationId,
    counter
  } = input;
  const period = currentMonthlyPeriod();
  ctx.logger.info({
    organisationId,
    counter,
    period
  });
  const data = match(counter).with('document', () => ({
    documentCount: 0
  })).with('email', () => ({
    emailCount: 0
  })).with('api', () => ({
    apiCount: 0
  })).exhaustive();
  await prismaWithReplicas.organisationMonthlyStat.update({
    where: {
      organisationId_period: {
        organisationId,
        period
      }
    },
    data
  });
});

export { resetOrganisationMonthlyStatRoute };
//# sourceMappingURL=reset-organisation-monthly-stat.js.map
