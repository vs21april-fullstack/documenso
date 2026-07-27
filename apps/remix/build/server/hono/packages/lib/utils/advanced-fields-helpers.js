import { FieldType } from '@prisma/client';
import { ZFieldMetaSchema } from '../types/field-meta.js';

// Currently it seems that the majority of fields have advanced fields for font reasons.
// This array should only contain fields that have an optional setting in the fieldMeta.
const ADVANCED_FIELD_TYPES_WITH_OPTIONAL_SETTING = [FieldType.NUMBER, FieldType.TEXT, FieldType.DROPDOWN, FieldType.RADIO, FieldType.CHECKBOX];
/**
 * Whether a field is required to be inserted.
 */
const isRequiredField = field => {
  // All fields without the optional metadata are assumed to be required.
  if (!ADVANCED_FIELD_TYPES_WITH_OPTIONAL_SETTING.includes(field.type)) {
    return true;
  }
  // Not sure why fieldMeta can be optional for advanced fields, but it is.
  // Therefore we must assume if there is no fieldMeta, then the field is optional.
  if (!field.fieldMeta) {
    return false;
  }
  const parsedData = ZFieldMetaSchema.safeParse(field.fieldMeta);
  // If it fails, assume the field is optional.
  // This needs to be logged somewhere.
  if (!parsedData.success) {
    return false;
  }
  return parsedData.data?.required === true;
};
/**
 * Whether the provided field is required and not inserted.
 */
const isFieldUnsignedAndRequired = field => isRequiredField(field) && !field.inserted;
/**
 * Whether the provided fields contains a field that is required to be inserted.
 */
const fieldsContainUnsignedRequiredField = fields => fields.some(isFieldUnsignedAndRequired);

export { ADVANCED_FIELD_TYPES_WITH_OPTIONAL_SETTING, fieldsContainUnsignedRequiredField, isFieldUnsignedAndRequired, isRequiredField };
//# sourceMappingURL=advanced-fields-helpers.js.map
