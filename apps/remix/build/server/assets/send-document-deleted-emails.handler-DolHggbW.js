import { D as DocumentCancelTemplate } from "./document-cancel-C-Wwz6xs.js";
import { createElement } from "react";
import { g as getI18nInstance, r as renderEmailWithI18N } from "./render-email-with-i18n-BpYjTW2C.js";
import { N as NEXT_PUBLIC_WEBAPP_URL, i as isRecipientEmailValidForSending } from "./server-build-BNclrAgx.js";
import { g as getEmailContext } from "./get-email-context-DtuzhfDZ.js";
import "react/jsx-runtime";
import "@lingui/react";
import "@react-email/body";
import "@react-email/container";
import "@react-email/head";
import "@react-email/hr";
import "@react-email/html";
import "@react-email/preview";
import "@react-email/section";
import "./template-branding-logo-PAGx2Qld.js";
import "@react-email/img";
import "@react-email/link";
import "@react-email/text";
import "./template-document-image-d_zk9qBW.js";
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
const run = async ({
  payload,
  io
}) => {
  const {
    teamId,
    documentName,
    inviterName,
    inviterEmail,
    meta,
    recipients
  } = payload;
  if (recipients.length === 0) {
    return;
  }
  const {
    branding,
    emailLanguage,
    senderEmail,
    replyToEmail,
    emailsDisabled,
    emailTransport
  } = await getEmailContext({
    emailType: "RECIPIENT",
    source: {
      type: "team",
      teamId
    },
    meta
  });
  if (emailsDisabled) {
    return;
  }
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || "http://localhost:3000";
  const i18n = await getI18nInstance(emailLanguage);
  for (const recipient of recipients) {
    await io.runTask(`send-document-deleted-emails-${recipient.email}`, async () => {
      if (!isRecipientEmailValidForSending(recipient)) {
        return;
      }
      const template = createElement(DocumentCancelTemplate, {
        documentName,
        inviterName: inviterName || void 0,
        inviterEmail,
        assetBaseUrl
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
          address: recipient.email,
          name: recipient.name
        },
        from: senderEmail,
        replyTo: replyToEmail,
        subject: i18n._(
          /*i18n*/
          {
            id: "Kvf7iA"
          }
        ),
        html,
        text
      });
    });
  }
};
export {
  run
};
