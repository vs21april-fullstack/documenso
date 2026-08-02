import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Trans, useLingui } from "@lingui/react";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { T as TemplateBrandingLogo } from "./template-branding-logo-DkQCSq-o.js";
import { Column } from "@react-email/column";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";
import { T as TemplateDocumentImage } from "./template-document-image-ClaHnWUr.js";
import { T as TemplateFooter, g as getI18nInstance, r as renderEmailWithI18N } from "./render-email-with-i18n-BaewMkpR.js";
import { p as prismaWithReplicas, e as unsafeBuildEnvelopeIdQuery, f as extractDerivedDocumentEmailSettings, i as isRecipientEmailValidForSending, N as NEXT_PUBLIC_WEBAPP_URL } from "./server-build-1kmO9YXy.js";
import { EnvelopeType } from "@prisma/client";
import { createElement } from "react";
import { g as getEmailContext } from "./get-email-context-CX5p8udK.js";
import "@react-email/link";
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
const TemplateDocumentRecipientSigned = ({
  documentName,
  recipientName,
  recipientEmail,
  assetBaseUrl
}) => {
  const getAssetUrl = (path) => {
    return new URL(path, assetBaseUrl).toString();
  };
  const recipientReference = recipientName || recipientEmail;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TemplateDocumentImage, { className: "mt-6", assetBaseUrl }),
    /* @__PURE__ */ jsxs(Section, { children: [
      /* @__PURE__ */ jsx(Section, { className: "mb-4", children: /* @__PURE__ */ jsx(Column, { align: "center", children: /* @__PURE__ */ jsxs(Text, { className: "font-semibold text-base text-foreground", children: [
        /* @__PURE__ */ jsx(Img, { src: getAssetUrl("/static/completed.png"), className: "-mt-0.5 mr-2 inline h-7 w-7 align-middle", alt: "" }),
        /* @__PURE__ */ jsx(Trans, { .../*i18n*/
        {
          id: "qqWcBV"
        } })
      ] }) }) }),
      /* @__PURE__ */ jsx(Text, { className: "mb-0 text-center font-semibold text-foreground text-lg", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "/f/1hG",
        values: {
          recipientReference,
          documentName
        }
      } }) }),
      /* @__PURE__ */ jsx(Text, { className: "mx-auto mt-1 mb-6 max-w-[80%] text-center text-base text-muted-foreground", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "wxK4xF",
        values: {
          recipientReference
        }
      } }) })
    ] })
  ] });
};
const DocumentRecipientSignedEmailTemplate = ({
  documentName = "Open Source Pledge.pdf",
  recipientName = "John Doe",
  recipientEmail = "lucas@documenso.com",
  assetBaseUrl = "http://localhost:3002"
}) => {
  const {
    _
  } = useLingui();
  const recipientReference = recipientName || recipientEmail;
  const previewText = (
    /*i18n*/
    {
      id: "sfH7EU",
      values: {
        recipientReference,
        documentName
      }
    }
  );
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsxs(Body, { className: "mx-auto my-auto font-sans", children: [
      /* @__PURE__ */ jsx(Preview, { children: _(previewText) }),
      /* @__PURE__ */ jsxs(Section, { className: "bg-background", children: [
        /* @__PURE__ */ jsx(Container, { className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-2 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(Section, { className: "p-2", children: [
          /* @__PURE__ */ jsx(TemplateBrandingLogo, { assetBaseUrl, className: "mb-4 h-6" }),
          /* @__PURE__ */ jsx(TemplateDocumentRecipientSigned, { documentName, recipientName, recipientEmail, assetBaseUrl })
        ] }) }),
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
    documentId,
    recipientId
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      ...unsafeBuildEnvelopeIdQuery({
        type: "documentId",
        id: documentId
      }, EnvelopeType.DOCUMENT),
      recipients: {
        some: {
          id: recipientId
        }
      }
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
      documentMeta: true
    }
  });
  if (!envelope) {
    throw new Error("Document not found");
  }
  if (envelope.recipients.length === 0) {
    throw new Error("Document has no recipients");
  }
  const isRecipientSignedEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).recipientSigned;
  if (!isRecipientSignedEmailEnabled) {
    return;
  }
  const [recipient] = envelope.recipients;
  const {
    email: recipientEmail,
    name: recipientName
  } = recipient;
  const {
    user: owner
  } = envelope;
  const recipientReference = recipientName || recipientEmail;
  if (owner.email === recipientEmail || !isRecipientEmailValidForSending(recipient)) {
    return;
  }
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
  const i18n = await getI18nInstance(emailLanguage);
  const template = createElement(DocumentRecipientSignedEmailTemplate, {
    documentName: envelope.title,
    recipientName,
    recipientEmail,
    assetBaseUrl
  });
  await io.runTask("send-recipient-signed-email", async () => {
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
        name: owner.name ?? "",
        address: owner.email
      },
      from: senderEmail,
      subject: i18n._(
        /*i18n*/
        {
          id: "5tKJAh",
          values: {
            0: envelope.title,
            recipientReference
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
