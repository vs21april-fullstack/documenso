import { isQuotaNearing, isQuotaExceeded } from '../../universal/quota-usage.js';

const computeQuotaFlags = ({
  quotas,
  usage
}) => {
  return {
    isDocumentQuotaExceeded: isQuotaExceeded(quotas.documentQuota, usage?.documentCount ?? 0),
    isEmailQuotaExceeded: isQuotaExceeded(quotas.emailQuota, usage?.emailCount ?? 0),
    isApiQuotaExceeded: isQuotaExceeded(quotas.apiQuota, usage?.apiCount ?? 0),
    isDocumentQuotaNearing: isQuotaNearing(quotas.documentQuota, usage?.documentCount ?? 0),
    isEmailQuotaNearing: isQuotaNearing(quotas.emailQuota, usage?.emailCount ?? 0),
    isApiQuotaNearing: isQuotaNearing(quotas.apiQuota, usage?.apiCount ?? 0)
  };
};

export { computeQuotaFlags };
//# sourceMappingURL=compute-quota-flags.js.map
