import { jsx, jsxs } from "react/jsx-runtime";
import React__default from "react";
import { p as prismaWithReplicas, E as ZEnvelopeReminderSettings, F as resolveNextReminderAt } from "./server-build-Iwbpv6Jl.js";
const TemplateCustomMessageBody = ({
  text
}) => {
  if (!text) {
    return null;
  }
  const normalized = text.trim().replace(/\r\n?/g, "\n").replace(/\n\s*\n+/g, "\n\n").replace(/\n{2,}/g, "\n\n");
  const paragraphs = normalized.split("\n\n");
  return paragraphs.map((paragraph, i) => /* @__PURE__ */ jsx("p", { className: "whitespace-pre-line break-words font-sans text-base text-muted-foreground", children: paragraph.split("\n").map((line, j) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
    j > 0 && /* @__PURE__ */ jsx("br", {}),
    line
  ] }, `line-${i}-${j}`)) }, `p-${i}`));
};
const buildEnvelopeEmailHeaders = ({
  userId,
  envelopeId,
  teamId
}) => {
  return {
    "X-Documenso-Sender-User-Id": String(userId),
    "X-Documenso-Envelope-Id": envelopeId,
    "X-Documenso-Team-Id": String(teamId)
  };
};
const updateRecipientNextReminder = async (options) => {
  const {
    recipientId,
    envelopeId,
    sentAt,
    lastReminderSentAt,
    reminderCount = 0,
    resetReminderCount
  } = options;
  let settings = options.reminderSettings;
  if (settings === void 0) {
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
      ...resetReminderCount ? {
        reminderCount: 0
      } : {}
    }
  });
};
export {
  TemplateCustomMessageBody as T,
  buildEnvelopeEmailHeaders as b,
  updateRecipientNextReminder as u
};
