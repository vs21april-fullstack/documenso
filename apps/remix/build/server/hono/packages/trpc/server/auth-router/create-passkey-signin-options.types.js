import { z } from 'zod';

const ZCreatePasskeySigninOptionsRequestSchema = z.void();
const ZCreatePasskeySigninOptionsResponseSchema = z.object({
  options: z.any(),
  // PublicKeyCredentialRequestOptions type
  sessionId: z.string()
});

export { ZCreatePasskeySigninOptionsRequestSchema, ZCreatePasskeySigninOptionsResponseSchema };
//# sourceMappingURL=create-passkey-signin-options.types.js.map
