const TEMPLATE_RECIPIENT_EMAIL_PLACEHOLDER_REGEX = /recipient\.\d+@documenso\.com/i;
const isTemplateRecipientEmailPlaceholder = email => {
  return TEMPLATE_RECIPIENT_EMAIL_PLACEHOLDER_REGEX.test(email);
};

export { TEMPLATE_RECIPIENT_EMAIL_PLACEHOLDER_REGEX, isTemplateRecipientEmailPlaceholder };
//# sourceMappingURL=template.js.map
