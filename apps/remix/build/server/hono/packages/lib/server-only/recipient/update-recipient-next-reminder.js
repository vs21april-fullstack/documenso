import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { DocumentDistributionMethod, RecipientRole, SendStatus, SigningStatus } from '@prisma/client';
import { ZEnvelopeReminderSettings, resolveNextReminderAt } from '../../constants/envelope-reminder.js';

/**
 * Compute and store `nextReminderAt` for a single recipient.
 *
 * Pass `resetReminderCount: true` to restart the reminder cycle (e.g. on a
 * manual resend): the count is zeroed and the schedule recomputed as if the
 * request was freshly sent at `sentAt`.
 */
const updateRecipientNextReminder = async options => {
  const {
    recipientId,
    envelopeId,
    sentAt,
    lastReminderSentAt,
    reminderCount = 0,
    resetReminderCount
  } = options;
  let settings = options.reminderSettings;
  if (settings === undefined) {
    const envelope = await prismaWithReplicas.envelope.findFirst({
      where: {
        id: envelopeId
      },
      select: {
        documentMeta: {
          select: {
            reminderSettings: true
          }
        }
      }
    });
    settings = envelope?.documentMeta?.reminderSettings ? ZEnvelopeReminderSettings.parse(envelope.documentMeta.reminderSettings) : null;
  }
  const nextReminderAt = resolveNextReminderAt({
    config: settings,
    sentAt,
    lastReminderSentAt,
    reminderCount: resetReminderCount ? 0 : reminderCount
  });
  await prismaWithReplicas.recipient.update({
    where: {
      id: recipientId
    },
    data: {
      nextReminderAt,
      ...(resetReminderCount ? {
        reminderCount: 0
      } : {})
    }
  });
};
/**
 * Recompute `nextReminderAt` for all active (unsigned, sent) recipients
 * of a given envelope. Call when document-level reminder settings change.
 */
const recomputeNextReminderForEnvelope = async envelopeId => {
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      id: envelopeId
    },
    select: {
      documentMeta: {
        select: {
          reminderSettings: true,
          distributionMethod: true
        }
      }
    }
  });
  // No reminders for manually distributed documents.
  const isEmailDistribution = envelope?.documentMeta?.distributionMethod !== DocumentDistributionMethod.NONE;
  const settings = isEmailDistribution && envelope?.documentMeta?.reminderSettings ? ZEnvelopeReminderSettings.parse(envelope.documentMeta.reminderSettings) : null;
  const now = new Date();
  const recipients = await prismaWithReplicas.recipient.findMany({
    where: {
      envelopeId,
      signingStatus: SigningStatus.NOT_SIGNED,
      sendStatus: SendStatus.SENT,
      sentAt: {
        not: null
      },
      role: {
        not: RecipientRole.CC
      },
      // Don't reschedule reminders for recipients whose deadline has passed.
      OR: [{
        expiresAt: null
      }, {
        expiresAt: {
          gt: now
        }
      }]
    },
    select: {
      id: true,
      sentAt: true,
      lastReminderSentAt: true,
      reminderCount: true
    }
  });
  await Promise.all(recipients.map(async recipient => {
    if (!recipient.sentAt) {
      return;
    }
    const nextReminderAt = resolveNextReminderAt({
      config: settings,
      sentAt: recipient.sentAt,
      lastReminderSentAt: recipient.lastReminderSentAt,
      reminderCount: recipient.reminderCount
    });
    await prismaWithReplicas.recipient.update({
      where: {
        id: recipient.id
      },
      data: {
        nextReminderAt
      }
    });
  }));
};

export { recomputeNextReminderForEnvelope, updateRecipientNextReminder };
//# sourceMappingURL=update-recipient-next-reminder.js.map
