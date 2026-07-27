import { z } from 'zod';

const ZEnableTwoFactorRequestSchema = z.object({
  code: z.string().min(6).max(6)
});
const ZDisableTwoFactorRequestSchema = z.object({
  totpCode: z.string().trim().optional(),
  backupCode: z.string().trim().optional()
});
const ZViewTwoFactorRecoveryCodesRequestSchema = z.object({
  token: z.string().trim().min(1)
});

export { ZDisableTwoFactorRequestSchema, ZEnableTwoFactorRequestSchema, ZViewTwoFactorRecoveryCodesRequestSchema };
//# sourceMappingURL=two-factor.types.js.map
