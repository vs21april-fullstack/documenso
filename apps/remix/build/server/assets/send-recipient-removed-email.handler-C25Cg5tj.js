import { jsxs, jsx } from "react/jsx-runtime";
import { useLingui, Trans } from "@lingui/react";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { T as TemplateBrandingLogo } from "./template-branding-logo-7_RaUFaC.js";
import { T as TemplateDocumentImage } from "./template-document-image-d_zk9qBW.js";
import { T as TemplateFooter, g as getI18nInstance, r as renderEmailWithI18N } from "./render-email-with-i18n-BHx5-qXF.js";
import { p as prismaWithReplicas, i as isRecipientEmailValidForSending, f as extractDerivedDocumentEmailSettings, g as assertOrganisationRatesAndLimits, N as NEXT_PUBLIC_WEBAPP_URL } from "./server-build-BNe-XpRU.js";
import { createElement } from "react";
import { g as getEmailContext } from "./get-email-context-z-l_GnqT.js";
import "@react-email/img";
import "@react-email/link";
import "@react-email/column";
import "@react-email/row";
import "@documenso/nodemailer-resend";
import "nodemailer";
import "colord";
import "@react-email/render";
import "@react-email/tailwind";
import "@lingui/core";
import "node:stream";
import "zod";
import "ts-pattern";
import "@react-router/node";
import "isbot";
import "react-dom/server";
import "react-router";
import "@prisma/client";
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
const RecipientRemovedFromDocumentTemplate = ({
  inviterName = "Lucas Smith",
  documentName = "Open Source Pledge.pdf",
  assetBaseUrl = "http://localhost:3002"
}) => {
  const {
    _
  } = useLingui();
  const previewText = (
    /*i18n*/
    {
      id: "3rXIjZ",
      values: {
        inviterName,
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
          /* @__PURE__ */ jsx(TemplateDocumentImage, { className: "mt-6", assetBaseUrl }),
          /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(Text, { className: "mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
          {
            id: "UiALQN",
            values: {
              inviterName,
              documentName
            },
            components: {
              0: /* @__PURE__ */ jsx("br", {})
            }
          } }) }) })
        ] }) }),
        /* @__PURE__ */ jsx(Hr, { className: "mx-auto mt-12 max-w-xl" }),
        /* @__PURE__ */ jsx(Container, { className: "mx-auto max-w-xl", children: /* @__PURE__ */ jsx(TemplateFooter, {}) })
      ] })
    ] })
  ] });
};
const run = async ({
  payload,
  io
}) => {
  const {
    envelopeId,
    recipientEmail,
    recipientName,
    inviterName
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      id: envelopeId
    },
    include: {
      documentMeta: true
    }
  });
  if (!envelope || !recipientEmail || !isRecipientEmailValidForSending({
    email: recipientEmail
  })) {
    return;
  }
  const isRecipientRemovedEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).recipientRemoved;
  if (!isRecipientRemovedEmailEnabled) {
    return;
  }
  const {
    branding,
    emailLanguage,
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
  if (emailsDisabled) {
    return;
  }
  try {
    await assertOrganisationRatesAndLimits({
      organisationId,
      organisationClaim: claims,
      type: "email",
      count: 1
    });
  } catch (_err) {
    io.logger.warn({
      msg: "Recipient removed email dropped: org email limit exceeded",
      organisationId,
      envelopeId: envelope.id
    });
    return;
  }
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || "http://localhost:3000";
  const template = createElement(RecipientRemovedFromDocumentTemplate, {
    documentName: envelope.title,
    inviterName: inviterName || void 0,
    assetBaseUrl
  });
  const i18n = await getI18nInstance(emailLanguage);
  await io.runTask("send-recipient-removed-email", async () => {
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
        address: recipientEmail,
        name: recipientName
      },
      from: senderEmail,
      replyTo: replyToEmail,
      subject: i18n._(
        /*i18n*/
        {
          id: "18SyOd"
        }
      ),
      html,
      text
    });
  });
};
export {
  run
};
