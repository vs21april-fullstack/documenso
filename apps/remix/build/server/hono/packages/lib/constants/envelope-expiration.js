import { Duration } from 'luxon';
import { z } from 'zod';

const ZEnvelopeExpirationDurationPeriod = z.object({
  unit: z.enum(['day', 'week', 'month', 'year']),
  amount: z.number().int().min(1)
});
const ZEnvelopeExpirationDisabledPeriod = z.object({
  disabled: z.literal(true)
});
const ZEnvelopeExpirationPeriod = z.union([ZEnvelopeExpirationDurationPeriod, ZEnvelopeExpirationDisabledPeriod]);
const UNIT_TO_LUXON_KEY = {
  day: 'days',
  week: 'weeks',
  month: 'months',
  year: 'years'
};
const DEFAULT_ENVELOPE_EXPIRATION_PERIOD = {
  unit: 'month',
  amount: 3
};
const getEnvelopeExpirationDuration = period => {
  return Duration.fromObject({
    [UNIT_TO_LUXON_KEY[period.unit]]: period.amount
  });
};
/**
 * Resolve the concrete expiresAt timestamp from a raw expiration period (from JSON column).
 *
 * - `null` means use the default period (3 months).
 * - `{ disabled: true }` means never expires (returns null).
 * - `{ unit, amount }` means compute the timestamp from now + duration.
 */
const resolveExpiresAt = rawPeriod => {
  if (rawPeriod === null || rawPeriod === undefined) {
    const duration = getEnvelopeExpirationDuration(DEFAULT_ENVELOPE_EXPIRATION_PERIOD);
    return new Date(Date.now() + duration.toMillis());
  }
  const parsed = ZEnvelopeExpirationPeriod.parse(rawPeriod);
  if ('disabled' in parsed) {
    return null;
  }
  const duration = getEnvelopeExpirationDuration(parsed);
  return new Date(Date.now() + duration.toMillis());
};

export { DEFAULT_ENVELOPE_EXPIRATION_PERIOD, ZEnvelopeExpirationDisabledPeriod, ZEnvelopeExpirationDurationPeriod, ZEnvelopeExpirationPeriod, getEnvelopeExpirationDuration, resolveExpiresAt };
//# sourceMappingURL=envelope-expiration.js.map
