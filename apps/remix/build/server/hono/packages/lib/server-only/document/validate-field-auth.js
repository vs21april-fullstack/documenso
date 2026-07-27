import { FieldType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { isRecipientAuthorized } from './is-recipient-authorized.js';

/**
 * Throws an error if the reauth for a field is invalid.
 *
 * Returns the derived recipient action authentication if valid.
 */
const validateFieldAuth = async ({
  documentAuthOptions,
  recipient,
  field,
  userId,
  authOptions
}) => {
  // Override all non-signature fields to not require any auth.
  if (field.type !== FieldType.SIGNATURE) {
    return undefined;
  }
  const isValid = await isRecipientAuthorized({
    type: 'ACTION',
    documentAuthOptions,
    recipient,
    userId,
    authOptions
  });
  if (!isValid) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'Invalid authentication values'
    });
  }
  return authOptions?.type;
};

export { validateFieldAuth };
//# sourceMappingURL=validate-field-auth.js.map
