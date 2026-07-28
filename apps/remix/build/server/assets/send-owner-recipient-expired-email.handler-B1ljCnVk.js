import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Trans, useLingui } from "@lingui/react";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { T as TemplateBrandingLogo } from "./template-branding-logo-7_RaUFaC.js";
import { T as TemplateFooter, g as getI18nInstance, r as renderEmailWithI18N } from "./render-email-with-i18n-BHx5-qXF.js";
import { Button } from "@react-email/button";
import { Text } from "@react-email/text";
import { T as TemplateDocumentImage } from "./template-document-image-d_zk9qBW.js";
import { p as prismaWithReplicas, f as extractDerivedDocumentEmailSettings, N as NEXT_PUBLIC_WEBAPP_URL, j as formatDocumentsPath } from "./server-build-BNe-XpRU.js";
import { createElement } from "react";
import { g as getEmailContext } from "./get-email-context-z-l_GnqT.js";
import "@react-email/img";
import "@react-email/link";
import "@documenso/nodemailer-resend";
import "nodemailer";
import "colord";
import "@react-email/render";
import "@react-email/tailwind";
import "@lingui/core";
import "@react-email/column";
import "@react-email/row";
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
const TemplateRecipientExpired = ({
  documentName,
  recipientName,
  recipientEmail,
  documentLink,
  assetBaseUrl
}) => {
  const displayName = recipientName || recipientEmail;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TemplateDocumentImage, { className: "mt-6", assetBaseUrl }),
    /* @__PURE__ */ jsxs(Section, { children: [
      /* @__PURE__ */ jsx(Text, { className: "mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "q1A1gV",
        values: {
          displayName,
          documentName
        }
      } }) }),
      /* @__PURE__ */ jsx(Text, { className: "my-1 text-center text-base text-muted-foreground", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "UGo721",
        values: {
          displayName,
          documentName
        }
      } }) }),
      /* @__PURE__ */ jsx(Section, { className: "my-4 text-center", children: /* @__PURE__ */ jsx(Button, { className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline", href: documentLink, children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "SzshGx"
      } }) }) })
    ] })
  ] });
};
const RecipientExpiredTemplate = ({
  documentName = "Open Source Pledge.pdf",
  recipientName = "John Doe",
  recipientEmail = "john@example.com",
  documentLink = "https://documenso.com",
  assetBaseUrl = "http://localhost:3002"
}) => {
  const {
    _
  } = useLingui();
  const previewText = (
    /*i18n*/
    {
      id: "xHjq3T",
      values: {
        recipientName,
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
          /* @__PURE__ */ jsx(TemplateRecipientExpired, { documentName, recipientName, recipientEmail, documentLink, assetBaseUrl })
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
    recipientId,
    envelopeId
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      id: envelopeId
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      documentMeta: true,
      team: {
        select: {
          teamEmail: true,
          name: true,
          url: true
        }
      }
    }
  });
  if (!envelope) {
    throw new Error(`Envelope ${envelopeId} not found`);
  }
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      id: recipientId,
      envelopeId
    }
  });
  if (!recipient) {
    throw new Error(`Recipient ${recipientId} not found on envelope ${envelopeId}`);
  }
  const {
    documentMeta,
    user: documentOwner
  } = envelope;
  const isEmailEnabled = extractDerivedDocumentEmailSettings(documentMeta).ownerRecipientExpired;
  if (!isEmailEnabled) {
    return;
  }
  const {
    branding,
    emailLanguage,
    senderEmail,
    emailsDisabled,
    emailTransport
  } = await getEmailContext({
    emailType: "RECIPIENT",
    source: {
      type: "team",
      teamId: envelope.teamId
    },
    meta: documentMeta
  });
  if (emailsDisabled) {
    return;
  }
  const i18n = await getI18nInstance(emailLanguage);
  const documentLink = `${NEXT_PUBLIC_WEBAPP_URL()}${formatDocumentsPath(envelope.team.url)}/${envelope.id}`;
  const template = createElement(RecipientExpiredTemplate, {
    documentName: envelope.title,
    recipientName: recipient.name || recipient.email,
    recipientEmail: recipient.email,
    documentLink,
    assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL()
  });
  await io.runTask("send-owner-recipient-expired-email", async () => {
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
        name: documentOwner.name || "",
        address: documentOwner.email
      },
      from: senderEmail,
      subject: i18n._(
        /*i18n*/
        {
          id: "9pcLFb",
          values: {
            0: recipient.name || recipient.email,
            1: envelope.title
          }
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
