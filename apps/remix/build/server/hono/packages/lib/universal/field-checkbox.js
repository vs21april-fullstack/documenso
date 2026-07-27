const fromCheckboxValue = customText => {
  if (!customText) {
    return [];
  }
  try {
    const parsed = JSON.parse(customText);
    if (!Array.isArray(parsed)) {
      throw new Error('Parsed checkbox values are not an array');
    }
    return parsed;
  } catch {
    return customText.split(',').filter(Boolean);
  }
};

export { fromCheckboxValue };
//# sourceMappingURL=field-checkbox.js.map
