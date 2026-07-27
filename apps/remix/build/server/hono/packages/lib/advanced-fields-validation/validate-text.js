const validateTextField = (value, fieldMeta, isSigningPage = false) => {
  const errors = [];
  const {
    characterLimit,
    readOnly,
    required,
    fontSize
  } = fieldMeta;
  if (required && !value && isSigningPage) {
    errors.push('Value is required');
  }
  if (characterLimit !== undefined && characterLimit > 0 && value.length > characterLimit) {
    errors.push(`Value length (${value.length}) exceeds the character limit (${characterLimit})`);
  }
  if (readOnly && value.length < 1) {
    errors.push('A read-only field must have text');
  }
  if (readOnly && required) {
    errors.push('A field cannot be both read-only and required');
  }
  if (fontSize && (fontSize < 8 || fontSize > 96)) {
    errors.push('Font size must be between 8 and 96.');
  }
  return errors;
};

export { validateTextField };
//# sourceMappingURL=validate-text.js.map
