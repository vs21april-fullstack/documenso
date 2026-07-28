import { jsxs, jsx } from "react/jsx-runtime";
import { R as RECIPIENT_ROLES_DESCRIPTION, p as prismaWithReplicas, N as NEXT_PUBLIC_WEBAPP_URL, j as formatDocumentsPath } from "./server-build-BNe-XpRU.js";
import { useLingui, Trans } from "@lingui/react";
import { RecipientRole } from "@prisma/client";
import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { T as TemplateBrandingLogo } from "./template-branding-logo-7_RaUFaC.js";
import { T as TemplateDocumentImage } from "./template-document-image-d_zk9qBW.js";
import { T as TemplateFooter, g as getI18nInstance, r as renderEmailWithI18N } from "./render-email-with-i18n-BHx5-qXF.js";
import { createElement } from "react";
import { g as getEmailContext } from "./get-email-context-z-l_GnqT.js";
import "node:stream";
import "zod";
import "@lingui/core";
import "ts-pattern";
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
const DocumentCreatedFromDirectTemplateEmailTemplate = ({
  recipientName = "John Doe",
  recipientRole = RecipientRole.SIGNER,
  documentLink = "http://localhost:3000",
  documentName = "Open Source Pledge.pdf",
  assetBaseUrl = "http://localhost:3002"
}) => {
  const {
    _
  } = useLingui();
  const action = _(RECIPIENT_ROLES_DESCRIPTION[recipientRole].actioned).toLowerCase();
  const previewText = (
    /*i18n*/
    {
      id: "XiDxHt"
    }
  );
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsxs(Body, { className: "mx-auto my-auto font-sans", children: [
      /* @__PURE__ */ jsx(Preview, { children: _(previewText) }),
      /* @__PURE__ */ jsxs(Section, { className: "bg-background", children: [
        /* @__PURE__ */ jsx(Container, { className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-2 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(Section, { className: "p-2", children: [
          /* @__PURE__ */ jsx(TemplateBrandingLogo, { assetBaseUrl, className: "mb-4 h-6" }),
          /* @__PURE__ */ jsx(TemplateDocumentImage, { className: "mt-6", assetBaseUrl }),
          /* @__PURE__ */ jsxs(Section, { children: [
            /* @__PURE__ */ jsx(Text, { className: "mb-0 text-center font-semibold text-foreground text-lg", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
            {
              id: "jrBKG+",
              values: {
                recipientName,
                action
              }
            } }) }),
            /* @__PURE__ */ jsx("div", { className: "mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 text-muted-foreground text-sm", children: documentName }),
            /* @__PURE__ */ jsx(Section, { className: "my-6 text-center", children: /* @__PURE__ */ jsx(Button, { className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline", href: documentLink, children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
            {
              id: "s+pgPi"
            } }) }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Container, { className: "mx-auto max-w-xl", children: /* @__PURE__ */ jsx(TemplateFooter, {}) })
      ] })
    ] })
  ] });
};
const run = async ({
  payload
}) => {
  const {
    envelopeId,
    recipientId
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      id: envelopeId
    },
    include: {
      recipients: {
        where: {
          id: recipientId
        }
      },
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      team: {
        select: {
          url: true
        }
      },
      documentMeta: true
    }
  });
  if (!envelope) {
    throw new Error("Envelope not found");
  }
  if (envelope.recipients.length === 0) {
    throw new Error("Recipient not found");
  }
  const [recipient] = envelope.recipients;
  const {
    user: templateOwner
  } = envelope;
  const {
    branding,
    emailLanguage,
    senderEmail,
    emailTransport
  } = await getEmailContext({
    emailType: "INTERNAL",
    source: {
      type: "team",
      teamId: envelope.teamId
    },
    meta: envelope.documentMeta
  });
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || "http://localhost:3000";
  const documentLink = `${NEXT_PUBLIC_WEBAPP_URL()}${formatDocumentsPath(envelope.team?.url ?? "")}/${envelope.id}`;
  const emailTemplate = createElement(DocumentCreatedFromDirectTemplateEmailTemplate, {
    recipientName: recipient.email,
    recipientRole: recipient.role,
    documentLink,
    documentName: envelope.title,
    assetBaseUrl
  });
  const i18n = await getI18nInstance(emailLanguage);
  const [html, text] = await Promise.all([renderEmailWithI18N(emailTemplate, {
    lang: emailLanguage,
    branding
  }), renderEmailWithI18N(emailTemplate, {
    lang: emailLanguage,
    branding,
    plainText: true
  })]);
  await emailTransport.sendMail({
    to: [{
      name: templateOwner.name || "",
      address: templateOwner.email
    }],
    from: senderEmail,
    subject: i18n._(
      /*i18n*/
      {
        id: "XiDxHt"
      }
    ),
    html,
    text
  });
};
export {
  run
};
