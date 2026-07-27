import { validateCheckboxLength } from '../advanced-fields-validation/validate-checkbox.js';
import { validateDropdownField } from '../advanced-fields-validation/validate-dropdown.js';
import { validateNumberField } from '../advanced-fields-validation/validate-number.js';
import { validateTextField } from '../advanced-fields-validation/validate-text.js';
import { DEFAULT_DOCUMENT_DATE_FORMAT } from '../constants/date-formats.js';
import { isBase64Image } from '../constants/signatures.js';
import { DEFAULT_DOCUMENT_TIME_ZONE } from '../constants/time-zones.js';
import { AppError, AppErrorCode } from '../errors/app-error.js';
import { ZNumberFieldMeta, ZTextFieldMeta, ZRadioFieldMeta, ZCheckboxFieldMeta, ZDropdownFieldMeta } from '../types/field-meta.js';
import { toRadioCustomText, toCheckboxCustomText } from './fields.js';
import { zEmail } from './zod.js';
import { checkboxValidationSigns } from '../../ui/primitives/document-flow/field-items-advanced-settings/constants.js';
import { FieldType } from '@prisma/client';
import { DateTime } from 'luxon';
import { match, P } from 'ts-pattern';
import { z } from 'zod';

const extractFieldInsertionValues = ({
  fieldValue,
  field,
  documentMeta
}) => {
  return match(fieldValue).with({
    type: FieldType.EMAIL
  }, fieldValue => {
    const parsedEmailValue = zEmail().nullable().safeParse(fieldValue.value);
    if (!parsedEmailValue.success) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: 'Invalid email'
      });
    }
    if (parsedEmailValue.data === null) {
      return {
        customText: '',
        inserted: false
      };
    }
    return {
      customText: parsedEmailValue.data,
      inserted: true
    };
  }).with({
    type: P.union(FieldType.NAME, FieldType.INITIALS)
  }, fieldValue => {
    const parsedGenericStringValue = z.string().min(1).nullable().safeParse(fieldValue.value);
    if (!parsedGenericStringValue.success) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: 'Value is required'
      });
    }
    if (parsedGenericStringValue.data === null) {
      return {
        customText: '',
        inserted: false
      };
    }
    return {
      customText: parsedGenericStringValue.data,
      inserted: true
    };
  }).with({
    type: FieldType.DATE
  }, fieldValue => {
    if (!fieldValue.value) {
      return {
        customText: '',
        inserted: false
      };
    }
    return {
      customText: DateTime.now().setZone(documentMeta.timezone ?? DEFAULT_DOCUMENT_TIME_ZONE).toFormat(documentMeta.dateFormat ?? DEFAULT_DOCUMENT_DATE_FORMAT),
      inserted: true
    };
  }).with({
    type: FieldType.NUMBER
  }, fieldValue => {
    if (!fieldValue.value) {
      return {
        customText: '',
        inserted: false
      };
    }
    const numberFieldParsedMeta = ZNumberFieldMeta.parse(field.fieldMeta);
    const errors = validateNumberField(fieldValue.value, numberFieldParsedMeta, true);
    if (errors.length > 0) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: 'Invalid number'
      });
    }
    return {
      customText: fieldValue.value,
      inserted: true
    };
  }).with({
    type: FieldType.TEXT
  }, fieldValue => {
    if (fieldValue.value === null) {
      return {
        customText: '',
        inserted: false
      };
    }
    const parsedTextFieldMeta = ZTextFieldMeta.parse(field.fieldMeta);
    const errors = validateTextField(fieldValue.value, parsedTextFieldMeta, true);
    if (errors.length > 0) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: 'Invalid email'
      });
    }
    return {
      customText: fieldValue.value,
      inserted: true
    };
  }).with({
    type: FieldType.RADIO
  }, fieldValue => {
    if (fieldValue.value === null) {
      return {
        customText: '',
        inserted: false
      };
    }
    const parsedRadioFieldParsedMeta = ZRadioFieldMeta.parse(field.fieldMeta);
    const radioFieldValues = parsedRadioFieldParsedMeta.values || [];
    if (!radioFieldValues[fieldValue.value]) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: 'Invalid radio value'
      });
    }
    return {
      customText: toRadioCustomText(fieldValue.value),
      inserted: true
    };
  }).with({
    type: FieldType.CHECKBOX
  }, fieldValue => {
    if (fieldValue.value === null || fieldValue.value.length === 0) {
      return {
        customText: '',
        inserted: false
      };
    }
    const parsedCheckboxFieldParsedMeta = ZCheckboxFieldMeta.parse(field.fieldMeta);
    const checkboxFieldValues = parsedCheckboxFieldParsedMeta.values || [];
    const {
      value
    } = fieldValue;
    const selectedValues = value.map(valueIndex => checkboxFieldValues[valueIndex]);
    if (selectedValues.some(value => !value)) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: 'Invalid checkbox values'
      });
    }
    const {
      validationRule,
      validationLength
    } = parsedCheckboxFieldParsedMeta;
    if (validationRule && validationLength) {
      const checkboxValidationRule = checkboxValidationSigns.find(sign => sign.label === validationRule);
      if (checkboxValidationRule) {
        const isValid = validateCheckboxLength(selectedValues.length, checkboxValidationRule.value, validationLength);
        if (!isValid) {
          throw new AppError(AppErrorCode.INVALID_BODY, {
            message: 'Checkbox values failed length validation'
          });
        }
      }
    }
    return {
      customText: toCheckboxCustomText(fieldValue.value),
      inserted: true
    };
  }).with({
    type: FieldType.DROPDOWN
  }, fieldValue => {
    if (fieldValue.value === null) {
      return {
        customText: '',
        inserted: false
      };
    }
    const parsedDropdownFieldMeta = ZDropdownFieldMeta.parse(field.fieldMeta);
    const errors = validateDropdownField(fieldValue.value, parsedDropdownFieldMeta, true);
    if (errors.length > 0) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: 'Invalid dropdown value'
      });
    }
    return {
      customText: fieldValue.value,
      inserted: true
    };
  }).with({
    type: FieldType.SIGNATURE
  }, fieldValue => {
    const {
      value
    } = fieldValue;
    if (!value) {
      return {
        customText: '',
        inserted: false
      };
    }
    const isBase64 = isBase64Image(value);
    if (documentMeta.typedSignatureEnabled === false && !isBase64) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: 'Typed signatures are not allowed. Please draw your signature'
      });
    }
    return {
      customText: '',
      inserted: true
    };
  }).exhaustive();
};

export { extractFieldInsertionValues };
//# sourceMappingURL=envelope-signing.js.map
