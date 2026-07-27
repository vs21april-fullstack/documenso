import { z } from 'zod';

const ZCreatePasskeyAuthenticationOptionsRequestSchema = z.object({
  preferredPasskeyId: z.string().optional()
}).optional();
const ZCreatePasskeyAuthenticationOptionsResponseSchema = z.object({
  tokenReference: z.string(),
  options: z.any() // PublicKeyCredentialRequestOptions type
});

export { ZCreatePasskeyAuthenticationOptionsRequestSchema, ZCreatePasskeyAuthenticationOptionsResponseSchema };
//# sourceMappingURL=create-passkey-authentication-options.types.js.map
