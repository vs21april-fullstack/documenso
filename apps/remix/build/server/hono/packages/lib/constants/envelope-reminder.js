import { Duration } from 'luxon';
import { z } from 'zod';

const ZEnvelopeReminderDurationPeriod = z.object({
  unit: z.enum(['day', 'week', 'month']),
  amount: z.number().int().min(1)
});
const ZEnvelopeReminderDisabledPeriod = z.object({
  disabled: z.literal(true)
});
const ZEnvelopeReminderPeriod = z.union([ZEnvelopeReminderDurationPeriod, ZEnvelopeReminderDisabledPeriod]);
const ZEnvelopeReminderSettings = z.object({
  sendAfter: ZEnvelopeReminderPeriod,
  repeatEvery: ZEnvelopeReminderPeriod
});
const DEFAULT_ENVELOPE_REMINDER_SETTINGS = {
  sendAfter: {
    unit: 'day',
    amount: 5
  },
  repeatEvery: {
    unit: 'day',
    amount: 2
  }
};
/**
 * Hard upper bound on the window in which automated reminders may be sent,
 * measured from the moment the signing request was first sent to the
 * recipient. Prevents runaway reminder chains for recipients with no
 * expiration set who never sign.
 */
const MAX_REMINDER_WINDOW_DAYS = 30;
/**
 * Maximum number of automated reminders sent to a recipient before reminders
 * stop. A manual resend resets the count, re-arming reminders.
 */
const MAX_REMINDERS_BEFORE_RESEND = 5;
const UNIT_TO_LUXON_KEY = {
  day: 'days',
  week: 'weeks',
  month: 'months'
};
const getEnvelopeReminderDuration = period => {
  return Duration.fromObject({
    [UNIT_TO_LUXON_KEY[period.unit]]: period.amount
  });
};
/**
 * Resolve the next reminder timestamp from the config and the last reminder sent time.
 *
 * - `null` config means reminders are disabled (inherit = no override, resolved as disabled).
 * - `{ sendAfter: { disabled: true }, ... }` means never send the first reminder.
 * - `{ repeatEvery: { disabled: true }, ... }` means don't repeat after the first reminder.
 *
 * Reminders stop (returns null) once either cap is hit: `MAX_REMINDER_WINDOW_DAYS`
 * from `sentAt`, or `MAX_REMINDERS_BEFORE_RESEND` reminders already sent.
 *
 * `sentAt` is when the signing request was sent to this specific recipient.
 *
 * Returns the next Date the reminder should be sent, or null if none.
 */
const resolveNextReminderAt = options => {
  const {
    config,
    sentAt,
    lastReminderSentAt,
    reminderCount
  } = options;
  if (!config) {
    return null;
  }
  if (reminderCount >= MAX_REMINDERS_BEFORE_RESEND) {
    return null;
  }
  const maxReminderAt = new Date(sentAt.getTime() + Duration.fromObject({
    days: MAX_REMINDER_WINDOW_DAYS
  }).toMillis());
  let candidate;
  // If we haven't sent the first reminder yet, use sendAfter.
  if (!lastReminderSentAt) {
    if ('disabled' in config.sendAfter) {
      return null;
    }
    const delay = getEnvelopeReminderDuration(config.sendAfter);
    candidate = new Date(sentAt.getTime() + delay.toMillis());
  } else {
    // For subsequent reminders, use repeatEvery.
    if ('disabled' in config.repeatEvery) {
      return null;
    }
    const interval = getEnvelopeReminderDuration(config.repeatEvery);
    candidate = new Date(lastReminderSentAt.getTime() + interval.toMillis());
  }
  // Stop if the candidate is past the hard cap measured from sentAt.
  if (candidate.getTime() > maxReminderAt.getTime()) {
    return null;
  }
  return candidate;
};

export { DEFAULT_ENVELOPE_REMINDER_SETTINGS, MAX_REMINDERS_BEFORE_RESEND, MAX_REMINDER_WINDOW_DAYS, ZEnvelopeReminderDisabledPeriod, ZEnvelopeReminderDurationPeriod, ZEnvelopeReminderPeriod, ZEnvelopeReminderSettings, getEnvelopeReminderDuration, resolveNextReminderAt };
//# sourceMappingURL=envelope-reminder.js.map
