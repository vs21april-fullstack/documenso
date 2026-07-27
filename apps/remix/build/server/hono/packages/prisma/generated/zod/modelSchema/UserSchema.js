import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema.js';
import { IdentityProviderSchema } from '../inputTypeSchemas/IdentityProviderSchema.js';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////
const UserSchema = z.object({
  identityProvider: IdentityProviderSchema,
  id: z.number(),
  name: z.string().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  password: z.string().nullable(),
  source: z.string().nullable(),
  signature: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  lastSignedIn: z.coerce.date(),
  /**
   * [Role[]]
   */
  roles: JsonValueSchema,
  avatarImageId: z.string().nullable(),
  disabled: z.boolean(),
  twoFactorSecret: z.string().nullable(),
  twoFactorEnabled: z.boolean(),
  twoFactorBackupCodes: z.string().nullable()
});

export { UserSchema, UserSchema as default };
//# sourceMappingURL=UserSchema.js.map
