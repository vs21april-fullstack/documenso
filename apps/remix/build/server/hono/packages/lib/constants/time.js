import { Duration } from 'luxon';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = Duration.fromObject({
  months: 1
});
const THREE_MONTHS = Duration.fromObject({
  months: 3
});
const SIX_MONTHS = Duration.fromObject({
  months: 6
});
const ONE_YEAR = Duration.fromObject({
  years: 1
});

export { ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_MONTH, ONE_SECOND, ONE_WEEK, ONE_YEAR, SIX_MONTHS, THREE_MONTHS };
//# sourceMappingURL=time.js.map
