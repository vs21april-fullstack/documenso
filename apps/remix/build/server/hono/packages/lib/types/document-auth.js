import { z } from 'zod';
import { ZAuthenticationResponseJSONSchema } from './webauthn.js';

/**
 * All the available types of document authentication options for both access and action.
 */
const ZDocumentAuthTypesSchema = z.enum(['ACCOUNT', 'PASSKEY', 'TWO_FACTOR_AUTH', 'PASSWORD', 'EXPLICIT_NONE']);
const DocumentAuth = ZDocumentAuthTypesSchema.Enum;
const ZDocumentAuthAccountSchema = z.object({
  type: z.literal(DocumentAuth.ACCOUNT)
});
const ZDocumentAuthExplicitNoneSchema = z.object({
  type: z.literal(DocumentAuth.EXPLICIT_NONE)
});
const ZDocumentAuthPasskeySchema = z.object({
  type: z.literal(DocumentAuth.PASSKEY),
  authenticationResponse: ZAuthenticationResponseJSONSchema,
  tokenReference: z.string().min(1)
});
const ZDocumentAuthPasswordSchema = z.object({
  type: z.literal(DocumentAuth.PASSWORD),
  password: z.string().min(1)
});
const ZDocumentAuth2FASchema = z.object({
  type: z.literal(DocumentAuth.TWO_FACTOR_AUTH),
  token: z.string().min(4).max(10),
  method: z.enum(['email', 'authenticator']).default('authenticator').optional()
});
/**
 * All the document auth methods for both accessing and actioning.
 */
z.discriminatedUnion('type', [ZDocumentAuthAccountSchema, ZDocumentAuthExplicitNoneSchema, ZDocumentAuthPasskeySchema, ZDocumentAuth2FASchema, ZDocumentAuthPasswordSchema]);
/**
 * The global document access auth methods.
 *
 * Must keep these two in sync.
 */
z.discriminatedUnion('type', [ZDocumentAuthAccountSchema, ZDocumentAuth2FASchema]);
const ZDocumentAccessAuthTypesSchema = z.enum([DocumentAuth.ACCOUNT, DocumentAuth.TWO_FACTOR_AUTH]).describe('The type of authentication required for the recipient to access the document.');
/**
 * The global document action auth methods.
 *
 * Must keep these two in sync.
 */
z.discriminatedUnion('type', [ZDocumentAuthAccountSchema, ZDocumentAuthPasskeySchema, ZDocumentAuth2FASchema, ZDocumentAuthPasswordSchema]);
const ZDocumentActionAuthTypesSchema = z.enum([DocumentAuth.ACCOUNT, DocumentAuth.PASSKEY, DocumentAuth.TWO_FACTOR_AUTH, DocumentAuth.PASSWORD]).describe('The type of authentication required for the recipient to sign the document. This field is restricted to Enterprise plan users only.');
/**
 * The recipient access auth methods.
 *
 * Must keep these two in sync.
 */
const ZRecipientAccessAuthSchema = z.discriminatedUnion('type', [ZDocumentAuthAccountSchema, ZDocumentAuth2FASchema]);
const ZRecipientAccessAuthTypesSchema = z.enum([DocumentAuth.ACCOUNT, DocumentAuth.TWO_FACTOR_AUTH]).describe('The type of authentication required for the recipient to access the document.');
/**
 * The recipient action auth methods.
 *
 * Must keep these two in sync.
 */
const ZRecipientActionAuthSchema = z.discriminatedUnion('type', [ZDocumentAuthAccountSchema, ZDocumentAuthPasskeySchema, ZDocumentAuth2FASchema, ZDocumentAuthPasswordSchema, ZDocumentAuthExplicitNoneSchema]);
const ZRecipientActionAuthTypesSchema = z.enum([DocumentAuth.ACCOUNT, DocumentAuth.PASSKEY, DocumentAuth.TWO_FACTOR_AUTH, DocumentAuth.PASSWORD, DocumentAuth.EXPLICIT_NONE]).describe('The type of authentication required for the recipient to sign the document.');
const DocumentAccessAuth = ZDocumentAccessAuthTypesSchema.Enum;
ZDocumentActionAuthTypesSchema.Enum;
ZRecipientAccessAuthTypesSchema.Enum;
ZRecipientActionAuthTypesSchema.Enum;
/**
 * Authentication options attached to the document.
 */
const ZDocumentAuthOptionsSchema = z.preprocess(unknownValue => {
  if (!unknownValue || typeof unknownValue !== 'object') {
    return {
      globalAccessAuth: [],
      globalActionAuth: []
    };
  }
  const globalAccessAuth = 'globalAccessAuth' in unknownValue ? processAuthValue(unknownValue.globalAccessAuth) : [];
  const globalActionAuth = 'globalActionAuth' in unknownValue ? processAuthValue(unknownValue.globalActionAuth) : [];
  return {
    globalAccessAuth,
    globalActionAuth
  };
}, z.object({
  globalAccessAuth: z.array(ZDocumentAccessAuthTypesSchema),
  globalActionAuth: z.array(ZDocumentActionAuthTypesSchema)
}));
/**
 * Authentication options attached to the recipient.
 */
const ZRecipientAuthOptionsSchema = z.preprocess(unknownValue => {
  if (!unknownValue || typeof unknownValue !== 'object') {
    return {
      accessAuth: [],
      actionAuth: []
    };
  }
  const accessAuth = 'accessAuth' in unknownValue ? processAuthValue(unknownValue.accessAuth) : [];
  const actionAuth = 'actionAuth' in unknownValue ? processAuthValue(unknownValue.actionAuth) : [];
  return {
    accessAuth,
    actionAuth
  };
}, z.object({
  accessAuth: z.array(ZRecipientAccessAuthTypesSchema),
  actionAuth: z.array(ZRecipientActionAuthTypesSchema)
}));
/**
 * Utility function to process the auth value.
 *
 * Converts the old singular auth value to an array of auth values.
 */
const processAuthValue = value => {
  if (value === null || value === undefined) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
};

export { DocumentAccessAuth, DocumentAuth, ZDocumentAccessAuthTypesSchema, ZDocumentActionAuthTypesSchema, ZDocumentAuthOptionsSchema, ZDocumentAuthTypesSchema, ZRecipientAccessAuthSchema, ZRecipientAccessAuthTypesSchema, ZRecipientActionAuthSchema, ZRecipientActionAuthTypesSchema, ZRecipientAuthOptionsSchema };
//# sourceMappingURL=document-auth.js.map
