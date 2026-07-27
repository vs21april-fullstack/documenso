import { FieldType } from '@prisma/client';
import { match } from 'ts-pattern';
import { resolveFieldCanvasStyle } from './field-canvas-style.js';
import { renderCheckboxFieldElement } from './render-checkbox-field.js';
import { renderDropdownFieldElement } from './render-dropdown-field.js';
import { renderGenericTextFieldElement } from './render-generic-text-field.js';
import { renderRadioFieldElement } from './render-radio-field.js';
import { renderSignatureFieldElement } from './render-signature-field.js';

const renderField = ({
  field,
  translations,
  pageLayer,
  pageWidth,
  pageHeight,
  mode,
  scale,
  editable,
  color,
  fieldCanvasStyleCache
}) => {
  const options = {
    pageLayer,
    pageWidth,
    pageHeight,
    translations,
    mode,
    color,
    editable,
    scale,
    fieldCanvasStyle: resolveFieldCanvasStyle()
  };
  // If the generic text field element array changes, update the `GenericTextFieldTypeMetas` type
  return match(field.type).with(FieldType.INITIALS, FieldType.NAME, FieldType.EMAIL, FieldType.DATE, FieldType.TEXT, FieldType.NUMBER, () => renderGenericTextFieldElement(field, options)).with(FieldType.CHECKBOX, () => renderCheckboxFieldElement(field, options)).with(FieldType.RADIO, () => renderRadioFieldElement(field, options)).with(FieldType.DROPDOWN, () => renderDropdownFieldElement(field, options)).with(FieldType.SIGNATURE, () => renderSignatureFieldElement(field, options)).with(FieldType.FREE_SIGNATURE, () => {
    throw new Error('Free signature fields are not supported');
  }).exhaustive();
};

export { renderField };
//# sourceMappingURL=render-field.js.map
