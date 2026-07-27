import { z } from 'zod';

const ZPasskeyAuthorizeSchema = z.object({
  csrfToken: z.string().min(1),
  credential: z.string().min(1)
});

export { ZPasskeyAuthorizeSchema };
//# sourceMappingURL=passkey.js.map
