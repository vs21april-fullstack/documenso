const numberFormatValues = [{
  label: '123,456,789.00',
  value: '123,456,789.00',
  regex: /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{1,2})?$/
}, {
  label: '123.456.789,00',
  value: '123.456.789,00',
  regex: /^(?:\d{1,3}(?:\.\d{3})*|\d+)(?:,\d{1,2})?$/
}, {
  label: '123456,789.00',
  value: '123456,789.00',
  regex: /^(?:\d+)(?:,\d{1,3}(?:\.\d{1,2})?)?$/
}];
var CheckboxValidationRules;
(function (CheckboxValidationRules) {
  CheckboxValidationRules["SELECT_AT_LEAST"] = "Select at least";
  CheckboxValidationRules["SELECT_EXACTLY"] = "Select exactly";
  CheckboxValidationRules["SELECT_AT_MOST"] = "Select at most";
})(CheckboxValidationRules || (CheckboxValidationRules = {}));
const checkboxValidationSigns = [{
  label: 'Select at least',
  value: '>='
}, {
  label: 'Select exactly',
  value: '='
}, {
  label: 'Select at most',
  value: '<='
}];

export { CheckboxValidationRules, checkboxValidationSigns, numberFormatValues };
//# sourceMappingURL=constants.js.map
