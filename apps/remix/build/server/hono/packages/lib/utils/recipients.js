import { isSignatureFieldType } from '../../prisma/guards/is-signature-field.js';
import { RecipientRole, SigningStatus } from '@prisma/client';
import { NEXT_PUBLIC_WEBAPP_URL } from '../constants/app.js';
import { AppError, AppErrorCode } from '../errors/app-error.js';
import { extractLegacyIds } from '../universal/id.js';
import { zEmail } from './zod.js';

/**
 * Roles that require fields to be assigned before a document can be distributed.
 *
 * Currently only SIGNER requires a signature field.
 */
[RecipientRole.SIGNER];
/**
 * Returns recipients who are missing required fields for their role.
 *
 * Currently only SIGNERs are validated - they must have at least one signature field.
 */
const getRecipientsWithMissingFields = (recipients, fields) => {
  return recipients.filter(recipient => {
    if (recipient.role === RecipientRole.SIGNER) {
      const hasSignatureField = fields.some(field => field.recipientId === recipient.id && isSignatureFieldType(field.type));
      return !hasSignatureField;
    }
    return false;
  });
};
const formatSigningLink = token => `${NEXT_PUBLIC_WEBAPP_URL()}/sign/${token}`;
/**
 * Whether a recipient can be modified by the document owner.
 */
const canRecipientBeModified = (recipient, fields) => {
  if (!recipient) {
    return false;
  }
  // CCers can always be modified (unless document is completed).
  if (recipient.role === RecipientRole.CC) {
    return true;
  }
  // Deny if the recipient has already signed the document.
  if (recipient.signingStatus === SigningStatus.SIGNED) {
    return false;
  }
  // Deny if the recipient has inserted any fields.
  if (fields.some(field => field.recipientId === recipient.id && field.inserted)) {
    return false;
  }
  return true;
};
/**
 * Whether a recipient can have their fields modified by the document owner.
 *
 * A recipient can their fields modified if all the conditions are met:
 * - They are not a Viewer or CCer
 * - They can be modified (canRecipientBeModified)
 */
const canRecipientFieldsBeModified = (recipient, fields) => {
  if (!canRecipientBeModified(recipient, fields)) {
    return false;
  }
  return recipient.role !== RecipientRole.VIEWER && recipient.role !== RecipientRole.CC;
};
const mapRecipientToLegacyRecipient = (recipient, envelope) => {
  const legacyId = extractLegacyIds(envelope);
  return {
    ...recipient,
    ...legacyId
  };
};
const isRecipientEmailValidForSending = recipient => {
  return zEmail().safeParse(recipient.email).success;
};
/**
 * Whether the recipient's signing window has expired.
 */
const isRecipientExpired = recipient => {
  return Boolean(recipient.expiresAt && new Date(recipient.expiresAt) <= new Date());
};
/**
 * Asserts that the recipient's signing window has not expired.
 *
 * Throws an AppError with RECIPIENT_EXPIRED if the expiration date has passed.
 */
const assertRecipientNotExpired = recipient => {
  if (isRecipientExpired(recipient)) {
    throw new AppError(AppErrorCode.RECIPIENT_EXPIRED, {
      message: 'Recipient signing window has expired'
    });
  }
};

export { assertRecipientNotExpired, canRecipientBeModified, canRecipientFieldsBeModified, formatSigningLink, getRecipientsWithMissingFields, isRecipientEmailValidForSending, isRecipientExpired, mapRecipientToLegacyRecipient };
//# sourceMappingURL=recipients.js.map
