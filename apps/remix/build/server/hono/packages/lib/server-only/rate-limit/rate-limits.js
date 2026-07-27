import { createRateLimit } from './rate-limit.js';

// ---- Auth (Tier 1 - Critical, sends emails) ----
const signupRateLimit = createRateLimit({
  action: 'auth.signup',
  max: 3,
  window: '3h'
});
const forgotPasswordRateLimit = createRateLimit({
  action: 'auth.forgot-password',
  max: 3,
  globalMax: 20,
  window: '1h'
});
const resendVerifyEmailRateLimit = createRateLimit({
  action: 'auth.resend-verify-email',
  max: 3,
  globalMax: 20,
  window: '1h'
});
const request2FAEmailRateLimit = createRateLimit({
  action: 'auth.request-2fa-email',
  max: 5,
  globalMax: 20,
  window: '15m'
});
// ---- Auth (Tier 2 - Unauthenticated) ----
const loginRateLimit = createRateLimit({
  action: 'auth.login',
  max: 10,
  globalMax: 50,
  window: '15m'
});
const resetPasswordRateLimit = createRateLimit({
  action: 'auth.reset-password',
  max: 5,
  globalMax: 20,
  window: '1h'
});
const verifyEmailRateLimit = createRateLimit({
  action: 'auth.verify-email',
  max: 5,
  globalMax: 20,
  window: '15m'
});
const passkeyRateLimit = createRateLimit({
  action: 'auth.passkey',
  max: 10,
  globalMax: 50,
  window: '15m'
});
const linkOrgAccountRateLimit = createRateLimit({
  action: 'auth.link-org-account',
  max: 5,
  globalMax: 20,
  window: '1h'
});
const reportSenderRateLimit = createRateLimit({
  action: 'recipient.report-sender',
  max: 1,
  window: '7d'
});
// ---- Billing ----
const syncSubscriptionRateLimit = createRateLimit({
  action: 'billing.sync-subscription',
  max: 10,
  window: '15m'
});
// ---- API (Tier 4 - Standard) ----
const apiV1RateLimit = createRateLimit({
  action: 'api.v1',
  max: 100,
  window: '1m'
});
const apiV2RateLimit = createRateLimit({
  action: 'api.v2',
  max: 100,
  window: '1m'
});
const apiTrpcRateLimit = createRateLimit({
  action: 'api.trpc',
  max: 100,
  window: '1m'
});
const aiRateLimit = createRateLimit({
  action: 'api.ai',
  max: 3,
  window: '1m'
});
const fileUploadRateLimit = createRateLimit({
  action: 'api.file-upload',
  max: 20,
  window: '1m'
});

export { aiRateLimit, apiTrpcRateLimit, apiV1RateLimit, apiV2RateLimit, fileUploadRateLimit, forgotPasswordRateLimit, linkOrgAccountRateLimit, loginRateLimit, passkeyRateLimit, reportSenderRateLimit, request2FAEmailRateLimit, resendVerifyEmailRateLimit, resetPasswordRateLimit, signupRateLimit, syncSubscriptionRateLimit, verifyEmailRateLimit };
//# sourceMappingURL=rate-limits.js.map
