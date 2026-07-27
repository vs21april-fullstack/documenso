/** Current UTC calendar month as `YYYY-MM`. */
const currentMonthlyPeriod = () => {
  const now = new Date();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${now.getUTCFullYear()}-${month}`;
};

export { currentMonthlyPeriod };
//# sourceMappingURL=monthly-period.js.map
