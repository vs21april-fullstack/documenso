import { DOCUMENSO_ENCRYPTION_SECONDARY_KEY } from '../../constants/crypto.js';
import { symmetricDecrypt, symmetricEncrypt } from '../../universal/crypto.js';
import { z } from 'zod';

/**
 * Config keys that hold secret values across all transport types.
 *
 * Secrets are never sent back to the client, so on update an empty incoming
 * value means "keep the existing secret". This list lets the update route know
 * which fields to preserve when left blank.
 *
 * Keep in sync with the fields marked `Secret` in the schemas below.
 */
const EMAIL_TRANSPORT_SECRET_KEYS = ['password', 'apiKey'];
const ZSmtpAuthConfigSchema = z.object({
  type: z.literal('SMTP_AUTH'),
  host: z.string().min(1),
  port: z.number().int().positive(),
  secure: z.boolean().default(false),
  ignoreTLS: z.boolean().default(false),
  username: z.string().optional(),
  password: z.string().optional(),
  // Secret — keep in sync with EMAIL_TRANSPORT_SECRET_KEYS.
  service: z.string().optional()
});
const ZSmtpApiConfigSchema = z.object({
  type: z.literal('SMTP_API'),
  host: z.string().min(1),
  port: z.number().int().positive(),
  secure: z.boolean().default(false),
  apiKey: z.string().min(1),
  // Secret — keep in sync with EMAIL_TRANSPORT_SECRET_KEYS.
  apiKeyUser: z.string().optional()
});
const ZResendConfigSchema = z.object({
  type: z.literal('RESEND'),
  apiKey: z.string().min(1) // Secret — keep in sync with EMAIL_TRANSPORT_SECRET_KEYS.
});
const ZMailChannelsConfigSchema = z.object({
  type: z.literal('MAILCHANNELS'),
  apiKey: z.string().min(1),
  // Secret — keep in sync with EMAIL_TRANSPORT_SECRET_KEYS.
  endpoint: z.string().optional()
});
const ZEmailTransportConfigSchema = z.discriminatedUnion('type', [ZSmtpAuthConfigSchema, ZSmtpApiConfigSchema, ZResendConfigSchema, ZMailChannelsConfigSchema]);
/**
 * Non-secret view of a transport config (secret fields removed).
 *
 * Safe to return to the client so the edit form can pre-fill the connection
 * settings without exposing secrets.
 */
const ZEmailTransportPublicConfigSchema = z.discriminatedUnion('type', [ZSmtpAuthConfigSchema.omit({
  password: true
}), ZSmtpApiConfigSchema.omit({
  apiKey: true
}), ZResendConfigSchema.omit({
  apiKey: true
}), ZMailChannelsConfigSchema.omit({
  apiKey: true
})]);
/**
 * Strips secret fields (see EMAIL_TRANSPORT_SECRET_KEYS) from a transport
 * config, returning only the non-secret connection settings.
 */
const toPublicEmailTransportConfig = config => {
  const publicConfig = {
    ...config
  };
  for (const key of EMAIL_TRANSPORT_SECRET_KEYS) {
    delete publicConfig[key];
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return publicConfig;
};
const encryptEmailTransportConfig = config => {
  if (!DOCUMENSO_ENCRYPTION_SECONDARY_KEY) {
    throw new Error('Missing encryption key');
  }
  return symmetricEncrypt({
    key: DOCUMENSO_ENCRYPTION_SECONDARY_KEY,
    data: JSON.stringify(config)
  });
};
const decryptEmailTransportConfig = encrypted => {
  if (!DOCUMENSO_ENCRYPTION_SECONDARY_KEY) {
    throw new Error('Missing encryption key');
  }
  const decrypted = Buffer.from(symmetricDecrypt({
    key: DOCUMENSO_ENCRYPTION_SECONDARY_KEY,
    data: encrypted
  })).toString('utf-8');
  return ZEmailTransportConfigSchema.parse(JSON.parse(decrypted));
};

export { EMAIL_TRANSPORT_SECRET_KEYS, ZEmailTransportConfigSchema, ZEmailTransportPublicConfigSchema, ZMailChannelsConfigSchema, ZResendConfigSchema, ZSmtpApiConfigSchema, ZSmtpAuthConfigSchema, decryptEmailTransportConfig, encryptEmailTransportConfig, toPublicEmailTransportConfig };
//# sourceMappingURL=email-transport-config.js.map
