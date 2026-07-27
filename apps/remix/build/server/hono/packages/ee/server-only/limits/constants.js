const FREE_PLAN_LIMITS = {
  documents: 5,
  recipients: 10,
  directTemplates: 3
};
const INACTIVE_PLAN_LIMITS = {
  documents: 0,
  recipients: 0,
  directTemplates: 0
};
const PAID_PLAN_LIMITS = {
  documents: Infinity,
  recipients: Infinity,
  directTemplates: Infinity
};
const SELFHOSTED_PLAN_LIMITS = {
  documents: Infinity,
  recipients: Infinity,
  directTemplates: Infinity
};

export { FREE_PLAN_LIMITS, INACTIVE_PLAN_LIMITS, PAID_PLAN_LIMITS, SELFHOSTED_PLAN_LIMITS };
//# sourceMappingURL=constants.js.map
