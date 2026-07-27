import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { R as RECIPIENT_ROLES_DESCRIPTION, p as prismaWithReplicas, f as extractDerivedDocumentEmailSettings, N as NEXT_PUBLIC_WEBAPP_URL, g as assertOrganisationRatesAndLimits, k as createDocumentAuditLogData, am as DOCUMENT_EMAIL_TYPE, l as DOCUMENT_AUDIT_LOG_TYPE, ab as triggerWebhook, ac as ZWebhookDocumentSchema, ad as mapEnvelopeToWebhookDocumentPayload } from "./server-build-CXtBWrcO.js";
import { useLingui, Trans } from "@lingui/react";
import { RecipientRole, DocumentStatus, SendStatus, SigningStatus, DocumentDistributionMethod, OrganisationType, WebhookTriggerEvents } from "@prisma/client";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { T as TemplateBrandingLogo } from "./template-branding-logo-oZ6w7QG2.js";
import { T as TemplateCustomMessageBody, b as buildEnvelopeEmailHeaders, u as updateRecipientNextReminder } from "./update-recipient-next-reminder-Cy2YYst4.js";
import { match } from "ts-pattern";
import { Button } from "@react-email/button";
import { T as TemplateDocumentImage } from "./template-document-image-d_zk9qBW.js";
import { T as TemplateFooter, g as getI18nInstance, r as renderEmailWithI18N } from "./render-email-with-i18n-3T3sRiMH.js";
import { createElement } from "react";
import { g as getEmailContext } from "./get-email-context-CKCGQHWH.js";
import { r as renderCustomEmailTemplate } from "./render-custom-email-template-CJQVxdQl.js";
import "node:stream";
import "zod";
import "@lingui/core";
import "@react-router/node";
import "isbot";
import "react-dom/server";
import "react-router";
import "@prisma/extension-read-replicas";
import "kysely";
import "prisma-extension-kysely";
import "@oslojs/crypto/sha2";
import "@oslojs/encoding";
import "mailchecker";
import "hono/cookie";
import "hono/client";
import "superjson";
import "@trpc/client";
import "@tanstack/react-query";
import "@trpc/react-query";
import "@vvo/tzdb";
import "luxon";
import "@node-rs/bcrypt";
import "crypto";
import "node:module";
import "node:path";
import "@bull-board/api";
import "@bull-board/api/bullMQAdapter";
import "@bull-board/hono";
import "@hono/node-server/serve-static";
import "@noble/hashes/sha2";
import "bullmq";
import "hono";
import "ioredis";
import "inngest";
import "inngest/hono";
import "cron-parser";
import "@noble/ciphers/chacha";
import "@noble/ciphers/utils";
import "@noble/ciphers/webcrypto";
import "nanoid";
import "pino";
import "@trpc/server";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "nuqs/adapters/react-router/v7";
import "remix-themes";
import "@radix-ui/react-slot";
import "framer-motion";
import "cmdk";
import "@radix-ui/react-dialog";
import "react-hotkeys-hook";
import "@radix-ui/react-avatar";
import "@radix-ui/react-dropdown-menu";
import "node:fs/promises";
import "@radix-ui/react-checkbox";
import "react-hook-form";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@hookform/resolvers/zod";
import "@tanstack/react-table";
import "@scure/base";
import "@radix-ui/react-popover";
import "@radix-ui/react-accordion";
import "ua-parser-js";
import "@radix-ui/react-alert-dialog";
import "@radix-ui/react-radio-group";
import "@radix-ui/react-progress";
import "@radix-ui/react-switch";
import "react-colorful";
import "recharts";
import "@radix-ui/react-hover-card";
import "@radix-ui/react-scroll-area";
import "react-icons/fa6";
import "@radix-ui/react-tabs";
import "prop-types";
import "file-selector";
import "attr-accept";
import "papaparse";
import "zod-form-data";
import "react-call";
import "perfect-freehand";
import "input-otp";
import "react-dom";
import "uqr";
import "@simplewebauthn/browser";
import "remeda";
import "colord";
import "konva";
import "@radix-ui/react-separator";
import "@hello-pangea/dnd";
import "react-rnd";
import "nuqs";
import "@azure/storage-blob";
import "@sindresorhus/slugify";
import "@aws-sdk/client-s3";
import "@libpdf/core";
import "@noble/hashes/legacy";
import "@simplewebauthn/server";
import "@simplewebauthn/server/helpers";
import "oslo/otp";
import "hono/utils/cookie";
import "hono/context-storage";
import "@marsidev/react-turnstile";
import "react-icons/fc";
import "sharp";
import "satori";
import "node:fs";
import "stripe";
import "jose";
import "@react-email/img";
import "@react-email/link";
import "@react-email/column";
import "@react-email/row";
import "@documenso/nodemailer-resend";
import "nodemailer";
import "@react-email/render";
import "@react-email/tailwind";
const TemplateDocumentReminder = ({
  recipientName,
  documentName,
  signDocumentLink,
  assetBaseUrl,
  role
}) => {
  const {
    _
  } = useLingui();
  const {
    actionVerb
  } = RECIPIENT_ROLES_DESCRIPTION[role];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TemplateDocumentImage, { className: "mt-6", assetBaseUrl }),
    /* @__PURE__ */ jsxs(Section, { children: [
      /* @__PURE__ */ jsx(Text, { className: "mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "6b/1tS",
        values: {
          0: _(actionVerb).toLowerCase(),
          documentName
        },
        components: {
          0: /* @__PURE__ */ jsx("br", {})
        }
      } }) }),
      /* @__PURE__ */ jsx(Text, { className: "my-1 text-center text-base text-muted-foreground", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "LU3Yvr",
        values: {
          recipientName
        }
      } }) }),
      /* @__PURE__ */ jsx(Text, { className: "my-1 text-center text-base text-muted-foreground", children: match(role).with(RecipientRole.SIGNER, () => /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "uaLDnA"
      } })).with(RecipientRole.VIEWER, () => /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "zgM2eX"
      } })).with(RecipientRole.APPROVER, () => /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "8PVsCY"
      } })).with(RecipientRole.CC, () => "").with(RecipientRole.ASSISTANT, () => /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "JWQdoT"
      } })).exhaustive() }),
      /* @__PURE__ */ jsx(Section, { className: "mt-8 mb-6 text-center", children: /* @__PURE__ */ jsx(Button, { className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline", href: signDocumentLink, children: match(role).with(RecipientRole.SIGNER, () => /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "4QSw6E"
      } })).with(RecipientRole.VIEWER, () => /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "SzshGx"
      } })).with(RecipientRole.APPROVER, () => /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "3WUY2f"
      } })).with(RecipientRole.CC, () => "").with(RecipientRole.ASSISTANT, () => /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "sPceSM"
      } })).exhaustive() }) })
    ] })
  ] });
};
const DocumentReminderEmailTemplate = ({
  recipientName = "John Doe",
  documentName = "Open Source Pledge.pdf",
  signDocumentLink = "https://documenso.com",
  assetBaseUrl = "http://localhost:3002",
  customBody,
  role = RecipientRole.SIGNER,
  reportUrl
}) => {
  const {
    _
  } = useLingui();
  const action = _(RECIPIENT_ROLES_DESCRIPTION[role].actionVerb).toLowerCase();
  const previewText = (
    /*i18n*/
    {
      id: "g8kAKy",
      values: {
        action,
        documentName
      }
    }
  );
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsxs(Body, { className: "mx-auto my-auto bg-background font-sans", children: [
      /* @__PURE__ */ jsx(Preview, { children: _(previewText) }),
      /* @__PURE__ */ jsxs(Section, { children: [
        /* @__PURE__ */ jsx(Container, { className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(Section, { children: [
          /* @__PURE__ */ jsx(TemplateBrandingLogo, { assetBaseUrl, className: "mb-4 h-6" }),
          /* @__PURE__ */ jsx(TemplateDocumentReminder, { recipientName, documentName, signDocumentLink, assetBaseUrl, role })
        ] }) }),
        customBody && /* @__PURE__ */ jsx(Container, { className: "mx-auto mt-12 max-w-xl", children: /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(Text, { className: "mt-2 text-base text-muted-foreground", children: /* @__PURE__ */ jsx(TemplateCustomMessageBody, { text: customBody }) }) }) }),
        /* @__PURE__ */ jsx(Hr, { className: "mx-auto mt-12 max-w-xl" }),
        /* @__PURE__ */ jsx(Container, { className: "mx-auto max-w-xl", children: /* @__PURE__ */ jsx(TemplateFooter, { reportUrl }) })
      ] })
    ] })
  ] });
};
const run = async ({
  payload,
  io
}) => {
  const {
    recipientId
  } = payload;
  const now = /* @__PURE__ */ new Date();
  const updatedCount = await prismaWithReplicas.recipient.updateMany({
    where: {
      id: recipientId,
      signingStatus: SigningStatus.NOT_SIGNED,
      sendStatus: SendStatus.SENT,
      role: {
        not: RecipientRole.CC
      },
      OR: [{
        expiresAt: null
      }, {
        expiresAt: {
          gt: now
        }
      }],
      envelope: {
        status: DocumentStatus.PENDING,
        deletedAt: null
      }
    },
    data: {
      lastReminderSentAt: now,
      nextReminderAt: null,
      reminderCount: {
        increment: 1
      }
    }
  });
  if (updatedCount.count === 0) {
    io.logger.info(`Recipient ${recipientId} no longer eligible for reminder, skipping`);
    return;
  }
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      id: recipientId
    },
    include: {
      envelope: {
        include: {
          documentMeta: true,
          user: true,
          recipients: true,
          team: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  if (!recipient) {
    io.logger.warn(`Recipient ${recipientId} not found`);
    return;
  }
  const {
    envelope
  } = recipient;
  if (!envelope.documentMeta) {
    io.logger.warn(`Envelope ${envelope.id} missing documentMeta`);
    return;
  }
  if (envelope.documentMeta.distributionMethod === DocumentDistributionMethod.NONE) {
    io.logger.info(`Envelope ${envelope.id} uses manual distribution, skipping email reminder`);
    return;
  }
  if (!extractDerivedDocumentEmailSettings(envelope.documentMeta).recipientSigningRequest) {
    io.logger.info(`Envelope ${envelope.id} has email signing requests disabled, skipping`);
    return;
  }
  const {
    branding,
    emailLanguage,
    organisationType,
    senderEmail,
    replyToEmail,
    organisationId,
    claims,
    emailsDisabled,
    emailTransport
  } = await getEmailContext({
    emailType: "RECIPIENT",
    source: {
      type: "team",
      teamId: envelope.teamId
    },
    meta: envelope.documentMeta
  });
  if (envelope.user.disabled || emailsDisabled) {
    io.logger.info(`Envelope ${envelope.id} skipping reminder: owner disabled or organisation emails disabled`);
    return;
  }
  const i18n = await getI18nInstance(emailLanguage);
  const recipientActionVerb = i18n._(RECIPIENT_ROLES_DESCRIPTION[recipient.role].actionVerb).toLowerCase();
  let emailSubject = i18n._(
    /*i18n*/
    {
      id: "WCVG8o",
      values: {
        0: envelope.title,
        recipientActionVerb
      }
    }
  );
  if (organisationType === OrganisationType.ORGANISATION) {
    emailSubject = i18n._(
      /*i18n*/
      {
        id: "k/b/L+",
        values: {
          0: envelope.team.name,
          recipientActionVerb
        }
      }
    );
  }
  const customEmailTemplate = {
    "signer.name": recipient.name,
    "signer.email": recipient.email,
    "document.name": envelope.title
  };
  if (envelope.documentMeta.subject) {
    emailSubject = renderCustomEmailTemplate(i18n._(
      /*i18n*/
      {
        id: "paGeq9",
        values: {
          0: envelope.documentMeta.subject
        }
      }
    ), customEmailTemplate);
  }
  const emailMessage = envelope.documentMeta.message ? renderCustomEmailTemplate(envelope.documentMeta.message, customEmailTemplate) : void 0;
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || "http://localhost:3000";
  const signDocumentLink = `${NEXT_PUBLIC_WEBAPP_URL()}/sign/${recipient.token}`;
  const reportUrl = `${NEXT_PUBLIC_WEBAPP_URL()}/report/${recipient.token}`;
  const isRateLimited = await assertOrganisationRatesAndLimits({
    organisationId,
    organisationClaim: claims,
    type: "email",
    count: 1
  }).then(() => false).catch((_err) => {
    io.logger.warn({
      msg: "Signing reminder dropped: org email limit exceeded",
      organisationId,
      recipientId: recipient.id,
      envelopeId: envelope.id
    });
    return true;
  });
  if (!isRateLimited) {
    io.logger.info(`Sending signing reminder for envelope ${envelope.id} to recipient ${recipient.id} (${recipient.email})`);
    const template = createElement(DocumentReminderEmailTemplate, {
      recipientName: recipient.name,
      documentName: envelope.title,
      assetBaseUrl,
      signDocumentLink,
      customBody: emailMessage,
      role: recipient.role,
      reportUrl
    });
    const [html, text] = await Promise.all([renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding
    }), renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding,
      plainText: true
    })]);
    await emailTransport.sendMail({
      to: {
        name: recipient.name,
        address: recipient.email
      },
      from: senderEmail,
      replyTo: replyToEmail,
      subject: emailSubject,
      html,
      text,
      headers: buildEnvelopeEmailHeaders({
        userId: envelope.userId,
        envelopeId: envelope.id,
        teamId: envelope.teamId
      })
    });
    await prismaWithReplicas.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT,
        envelopeId: envelope.id,
        data: {
          recipientEmail: recipient.email,
          recipientName: recipient.name,
          recipientId: recipient.id,
          recipientRole: recipient.role,
          emailType: DOCUMENT_EMAIL_TYPE.REMINDER,
          isResending: false
        }
      })
    });
    await triggerWebhook({
      event: WebhookTriggerEvents.DOCUMENT_REMINDER_SENT,
      data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(envelope)),
      userId: envelope.userId,
      teamId: envelope.teamId
    });
  }
  if (recipient.sentAt) {
    await updateRecipientNextReminder({
      recipientId: recipient.id,
      envelopeId: envelope.id,
      sentAt: recipient.sentAt,
      lastReminderSentAt: now,
      reminderCount: recipient.reminderCount
    });
  }
};
export {
  run
};
