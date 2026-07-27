import { ZDocumentAuthOptionsSchema, ZRecipientAuthOptionsSchema, DocumentAuth } from '../types/document-auth.js';

/**
 * Parses and extracts the document and recipient authentication values.
 *
 * Will combine the recipient and document auth values to derive the final
 * auth values for a recipient if possible.
 */
const extractDocumentAuthMethods = ({
  documentAuth,
  recipientAuth
}) => {
  const documentAuthOption = ZDocumentAuthOptionsSchema.parse(documentAuth);
  const recipientAuthOption = ZRecipientAuthOptionsSchema.parse(recipientAuth);
  const derivedRecipientAccessAuth = recipientAuthOption.accessAuth.length > 0 ? recipientAuthOption.accessAuth : documentAuthOption.globalAccessAuth;
  const derivedRecipientActionAuth = recipientAuthOption.actionAuth.length > 0 ? recipientAuthOption.actionAuth : documentAuthOption.globalActionAuth;
  const recipientAccessAuthRequired = derivedRecipientAccessAuth.length > 0;
  const recipientActionAuthRequired = derivedRecipientActionAuth.length > 0 && !derivedRecipientActionAuth.includes(DocumentAuth.EXPLICIT_NONE);
  return {
    derivedRecipientAccessAuth,
    derivedRecipientActionAuth,
    recipientAccessAuthRequired,
    recipientActionAuthRequired,
    documentAuthOption,
    recipientAuthOption
  };
};
/**
 * Create document auth options in a type safe way.
 */
const createDocumentAuthOptions = options => {
  return {
    globalAccessAuth: options?.globalAccessAuth ?? [],
    globalActionAuth: options?.globalActionAuth ?? []
  };
};
/**
 * Create recipient auth options in a type safe way.
 */
const createRecipientAuthOptions = options => {
  return {
    accessAuth: options?.accessAuth ?? [],
    actionAuth: options?.actionAuth ?? []
  };
};

export { createDocumentAuthOptions, createRecipientAuthOptions, extractDocumentAuthMethods };
//# sourceMappingURL=document-auth.js.map
