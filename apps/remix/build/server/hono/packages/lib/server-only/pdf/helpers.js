import { existsSync } from 'node:fs';
import path from 'node:path';
import { FieldType } from '@prisma/client';
import { FontLibrary } from 'skia-canvas';
import { match } from 'ts-pattern';
import { AppError, AppErrorCode } from '../../errors/app-error.js';

/**
 * Ensure all required fonts are registered in the skia-canvas FontLibrary.
 *
 * Fonts are registered once per process and retained — calling this multiple
 * times is a no-op after the first invocation.
 */
const ensureFontLibrary = () => {
  const fontPath = resolvePdfFontPath();
  if (!FontLibrary.has('Caveat')) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    FontLibrary.use({
      ['Caveat']: [path.join(fontPath, 'caveat.ttf')],
    });
  }
  if (!FontLibrary.has('Inter')) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    FontLibrary.use({
      ['Inter']: [path.join(fontPath, 'inter-variablefont_opsz,wght.ttf')],
    });
  }
  if (!FontLibrary.has('Noto Sans')) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    FontLibrary.use({
      ['Noto Sans']: [path.join(fontPath, 'noto-sans.ttf')],
      ['Noto Sans Japanese']: [path.join(fontPath, 'noto-sans-japanese.ttf')],
      ['Noto Sans Chinese']: [path.join(fontPath, 'noto-sans-chinese.ttf')],
      ['Noto Sans Korean']: [path.join(fontPath, 'noto-sans-korean.ttf')],
    });
  }
};
const resolvePdfFontPath = (workingDirectory = process.cwd()) => {
  const fontPathCandidates = [
    path.join(workingDirectory, 'public/fonts'),
    path.join(workingDirectory, 'apps/remix/public/fonts'),
    path.join(workingDirectory, 'apps/remix/build/client/fonts'),
  ];
  const fontPath = fontPathCandidates.find((candidate) => existsSync(path.join(candidate, 'caveat.ttf')));
  if (!fontPath) {
    throw new Error(`Unable to locate PDF fonts from working directory: ${workingDirectory}`);
  }
  return fontPath;
};
const resolvePdfStaticAssetPath = (assetName, workingDirectory = process.cwd()) => {
  const assetPathCandidates = [
    path.join(workingDirectory, 'public/static', assetName),
    path.join(workingDirectory, 'apps/remix/public/static', assetName),
    path.join(workingDirectory, 'apps/remix/build/client/static', assetName),
  ];
  const assetPath = assetPathCandidates.find((candidate) => existsSync(candidate));
  if (!assetPath) {
    throw new Error(`Unable to locate PDF static asset "${assetName}" from working directory: ${workingDirectory}`);
  }
  return assetPath;
};
/*
  Parse field type string to FieldType enum.
  Normalizes the input (uppercase, trim) and validates it's a valid field type.
  This ensures we handle case variations and whitespace, and provides clear error messages.
*/
const parseFieldTypeFromPlaceholder = (fieldTypeString) => {
  const normalizedType = fieldTypeString.toUpperCase().trim();
  return match(normalizedType)
    .with('SIGNATURE', () => FieldType.SIGNATURE)
    .with('FREE_SIGNATURE', () => FieldType.FREE_SIGNATURE)
    .with('INITIALS', () => FieldType.INITIALS)
    .with('NAME', () => FieldType.NAME)
    .with('EMAIL', () => FieldType.EMAIL)
    .with('DATE', () => FieldType.DATE)
    .with('TEXT', () => FieldType.TEXT)
    .with('NUMBER', () => FieldType.NUMBER)
    .with('RADIO', () => FieldType.RADIO)
    .with('CHECKBOX', () => FieldType.CHECKBOX)
    .with('DROPDOWN', () => FieldType.DROPDOWN)
    .otherwise(() => {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid field type: ${fieldTypeString}`,
      });
    });
};
/*
  Transform raw field metadata from placeholder format to schema format.
  Users should provide properly capitalized property names (e.g., readOnly, fontSize, textAlign).
  Converts string values to proper types (booleans, numbers).
*/
const parseFieldMetaFromPlaceholder = (rawFieldMeta, fieldType) => {
  if (fieldType === FieldType.SIGNATURE || fieldType === FieldType.FREE_SIGNATURE) {
    return;
  }
  if (Object.keys(rawFieldMeta).length === 0) {
    return;
  }
  const fieldTypeString = String(fieldType).toLowerCase();
  const parsedFieldMeta = {
    type: fieldTypeString,
  };
  /*
    rawFieldMeta is an object with string keys and string values.
    It contains string values because the PDF parser returns the values as strings.
       E.g. { 'required': 'true', 'fontSize': '12', 'maxValue': '100', 'minValue': '0', 'characterLimit': '100' }
  */
  const rawFieldMetaEntries = Object.entries(rawFieldMeta);
  for (const [property, value] of rawFieldMetaEntries) {
    if (property === 'readOnly' || property === 'required') {
      parsedFieldMeta[property] = value === 'true';
    } else if (
      property === 'fontSize' ||
      property === 'maxValue' ||
      property === 'minValue' ||
      property === 'characterLimit'
    ) {
      const numValue = Number(value);
      if (!Number.isNaN(numValue)) {
        parsedFieldMeta[property] = numValue;
      }
    } else {
      parsedFieldMeta[property] = value;
    }
  }
  return parsedFieldMeta;
};
const extractRecipientPlaceholder = (placeholder) => {
  const indexMatch = placeholder.match(/^r(\d+)$/i);
  if (!indexMatch) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: `Invalid recipient placeholder format: ${placeholder}. Expected format: r1, r2, r3, etc.`,
    });
  }
  const recipientIndex = Number(indexMatch[1]);
  return {
    email: `recipient.${recipientIndex}@documenso.com`,
    name: `Recipient ${recipientIndex}`,
    recipientIndex,
  };
};
/*
  Finds a recipient based on a placeholder reference.
  If recipients array is provided, uses index-based matching (r1 -> recipients[0], etc.).
  Otherwise, uses email-based matching from createdRecipients.
*/
const findRecipientByPlaceholder = (recipientPlaceholder, placeholder, recipients, createdRecipients) => {
  if (recipients && recipients.length > 0) {
    /*
      Map placeholder by index: r1 -> recipients[0], r2 -> recipients[1], etc.
      recipientIndex is 1-based, so we subtract 1 to get the array index.
    */
    const { recipientIndex } = extractRecipientPlaceholder(recipientPlaceholder);
    const recipientArrayIndex = recipientIndex - 1;
    if (recipientArrayIndex < 0 || recipientArrayIndex >= recipients.length) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Recipient placeholder ${recipientPlaceholder} (index ${recipientIndex}) is out of range. Provided ${recipients.length} recipient(s).`,
      });
    }
    return recipients[recipientArrayIndex];
  }
  /*
    Use email-based matching for placeholder recipients.
  */
  const { email } = extractRecipientPlaceholder(recipientPlaceholder);
  const recipient = createdRecipients.find((r) => r.email === email);
  if (!recipient) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: `Could not find recipient ID for placeholder: ${placeholder}`,
    });
  }
  return recipient;
};

export {
  ensureFontLibrary,
  findRecipientByPlaceholder,
  parseFieldMetaFromPlaceholder,
  parseFieldTypeFromPlaceholder,
  resolvePdfFontPath,
  resolvePdfStaticAssetPath,
};
//# sourceMappingURL=helpers.js.map
