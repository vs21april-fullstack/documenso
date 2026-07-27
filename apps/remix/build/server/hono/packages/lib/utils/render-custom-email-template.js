const renderCustomEmailTemplate = (template, variables) => {
  return template.replace(/\{(\S+)\}/g, (_, key) => {
    if (key in variables) {
      return variables[key];
    }
    return key;
  });
};

export { renderCustomEmailTemplate };
//# sourceMappingURL=render-custom-email-template.js.map
