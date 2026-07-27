const QUOTA_WARNING_THRESHOLD = 0.8;
/**
 * Monthly quotas: `null` = unlimited, `0` = blocked. Usage `>=` quota is exceeded.
 */
const isQuotaExceeded = (quota, usage) => {
  if (quota === null) {
    return false;
  }
  if (quota === 0) {
    return true;
  }
  return usage >= quota;
};
/**
 * The usage count at which a positive quota starts "nearing" (80% rounded up).
 * The single source for the warning threshold math so the UI panel, quota flags,
 * and the per-request alert path can't drift apart.
 */
const getQuotaWarningCount = quota => {
  return Math.ceil(quota * QUOTA_WARNING_THRESHOLD);
};
/**
 * Nearing once usage reaches the warning threshold (80% rounded up) but is not exceeded.
 */
const isQuotaNearing = (quota, usage) => {
  if (quota === null || quota === 0) {
    return false;
  }
  if (isQuotaExceeded(quota, usage)) {
    return false;
  }
  return usage >= getQuotaWarningCount(quota);
};

export { QUOTA_WARNING_THRESHOLD, getQuotaWarningCount, isQuotaExceeded, isQuotaNearing };
//# sourceMappingURL=quota-usage.js.map
