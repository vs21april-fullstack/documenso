import '@prisma/client';
import { extractLegacyIds } from '../universal/id.js';

const mapFieldToLegacyField = (field, envelope) => {
  const legacyId = extractLegacyIds(envelope);
  return {
    ...field,
    ...legacyId
  };
};
const parseCheckboxCustomText = customText => {
  if (!customText) {
    return [];
  }
  return JSON.parse(customText);
};
const toCheckboxCustomText = checkedValues => {
  return JSON.stringify(checkedValues);
};
const toRadioCustomText = value => {
  return value.toString();
};

export { mapFieldToLegacyField, parseCheckboxCustomText, toCheckboxCustomText, toRadioCustomText };
//# sourceMappingURL=fields.js.map
