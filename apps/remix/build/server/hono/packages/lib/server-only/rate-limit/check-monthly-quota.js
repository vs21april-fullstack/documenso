import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { jobsClient } from '../../jobs/client.js';
import { generateDatabaseId } from '../../universal/id.js';
import { currentMonthlyPeriod } from '../../universal/monthly-period.js';
import { getQuotaAlertKind } from './get-quota-alert-kind.js';

const COUNTER_COLUMN = {
  document: 'documentCount',
  email: 'emailCount',
  api: 'apiCount'
};
const checkMonthlyQuota = async opts => {
  if (opts.quota === 0) {
    throw new AppError(AppErrorCode.TOO_MANY_REQUESTS, {
      message: 'Your request could not be completed at this time due to your account exceeding the fair use limits of your current plan. Please contact support.'
      // Not tossing headers here to avoid confusion, this isn't rate limits.
    });
  }
  const period = currentMonthlyPeriod();
  const column = COUNTER_COLUMN[opts.counter];
  const latestMonthlyStat = await prismaWithReplicas.organisationMonthlyStat.upsert({
    where: {
      organisationId_period: {
        organisationId: opts.organisationId,
        period
      }
    },
    update: {
      [column]: {
        increment: opts.count
      }
    },
    create: {
      id: generateDatabaseId('org_monthly_stat'),
      organisationId: opts.organisationId,
      period,
      [column]: opts.count
    }
  });
  // For unlimited quotas, we still allow the request to send so we can collect the monthly stat.
  if (opts.quota === null) {
    return;
  }
  const newCount = latestMonthlyStat[column];
  const previousCount = newCount - opts.count;
  // Returns 'quota' on the single request that reached (or jumped past) the quota,
  // 'quotaNearing' on the single request that reached the warning threshold,
  // otherwise null. See getQuotaAlertKind for the exactly-once guarantee.
  const alertKind = getQuotaAlertKind({
    previousCount,
    newCount,
    quota: opts.quota
  });
  // Trigger the alert before the over-quota check — the 'quota' alert usually fires
  // on the successful request that consumes the last unit of allowance, but when a
  // batch jumps past the boundary it fires on this rejected request. Either way it
  // will never fire again this period, so it must be enqueued before any throw.
  if (alertKind) {
    await jobsClient.triggerJob({
      name: 'send.organisation-limit-alert.email',
      payload: {
        organisationId: opts.organisationId,
        counter: opts.counter,
        kind: alertKind,
        period
      }
    }).catch(error => {
      console.error({
        msg: 'Failed to send organisation limit alert email',
        error
      });
      // Do nothing.
    });
  }
  if (newCount > opts.quota) {
    throw new AppError(AppErrorCode.TOO_MANY_REQUESTS, {
      message: 'Your request could not be completed at this time due to your account exceeding the fair use limits of your current plan. Please contact support.'
      // Not tossing headers here to avoid confusion, this isn't rate limits.
    });
  }
};

export { checkMonthlyQuota };
//# sourceMappingURL=check-monthly-quota.js.map
