import { D as DocumentCancelTemplate } from "./document-cancel-CgDqXHmW.js";
import { p as prismaWithReplicas, e as unsafeBuildEnvelopeIdQuery, f as extractDerivedDocumentEmailSettings, i as isRecipientEmailValidForSending, g as assertOrganisationRatesAndLimits, N as NEXT_PUBLIC_WEBAPP_URL } from "./server-build-Iwbpv6Jl.js";
import { EnvelopeType, RecipientRole, SendStatus, ReadStatus, SigningStatus } from "@prisma/client";
import { createElement } from "react";
import { g as getI18nInstance, r as renderEmailWithI18N } from "./render-email-with-i18n-DfpWuZW_.js";
import { g as getEmailContext } from "./get-email-context-BgMn7nw-.js";
import "react/jsx-runtime";
import "@lingui/react";
import "@react-email/body";
import "@react-email/container";
import "@react-email/head";
import "@react-email/hr";
import "@react-email/html";
import "@react-email/preview";
import "@react-email/section";
import "./template-branding-logo-Cse3uoEE.js";
import "@react-email/img";
import "@react-email/link";
import "@react-email/text";
import "./template-document-image-d_zk9qBW.js";
import "@react-email/column";
import "@react-email/row";
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
import "@documenso/nodemailer-resend";
import "nodemailer";
import "@react-email/render";
import "@react-email/tailwind";
const run = async ({
  payload,
  io
}) => {
  const {
    documentId,
    cancellationReason
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findFirstOrThrow({
    where: unsafeBuildEnvelopeIdQuery({
      type: "documentId",
      id: documentId
    }, EnvelopeType.DOCUMENT),
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          disabled: true
        }
      },
      documentMeta: true,
      recipients: true,
      team: {
        select: {
          teamEmail: true,
          name: true,
          url: true
        }
      }
    }
  });
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
  const {
    documentMeta,
    user: documentOwner
  } = envelope;
  if (emailsDisabled || documentOwner.disabled) {
    return;
  }
  const maximumRecipientCount = claims.recipientCount;
  if (maximumRecipientCount > 0 && envelope.recipients.length > maximumRecipientCount) {
    io.logger.warn({
      msg: "Cancellation email dropped: org recipient limit exceeded",
      organisationId,
      recipientCount: envelope.recipients.length,
      maximumRecipientCount,
      envelopeId: envelope.id
    });
    return;
  }
  const isEmailEnabled = extractDerivedDocumentEmailSettings(documentMeta).documentDeleted;
  if (!isEmailEnabled) {
    return;
  }
  const i18n = await getI18nInstance(emailLanguage);
  const recipientsToNotify = envelope.recipients.filter((recipient) => recipient.role !== RecipientRole.CC && (recipient.sendStatus === SendStatus.SENT || recipient.readStatus === ReadStatus.OPENED) && recipient.signingStatus !== SigningStatus.REJECTED && isRecipientEmailValidForSending(recipient));
  await io.runTask("send-cancellation-emails", async () => {
    await Promise.all(recipientsToNotify.map(async (recipient) => {
      try {
        await assertOrganisationRatesAndLimits({
          organisationId,
          organisationClaim: claims,
          type: "email",
          count: 1
        });
      } catch (_err) {
        io.logger.warn({
          msg: "Cancellation email dropped: org email limit exceeded",
          organisationId,
          recipientId: recipient.id,
          envelopeId: envelope.id
        });
        return;
      }
      const template = createElement(DocumentCancelTemplate, {
        documentName: envelope.title,
        inviterName: documentOwner.name || void 0,
        inviterEmail: documentOwner.email,
        assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
        cancellationReason: cancellationReason || "The document has been cancelled."
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
        subject: i18n._(
          /*i18n*/
          {
            id: "5Fp+1+",
            values: {
              0: envelope.title
            }
          }
        ),
        html,
        text
      });
    }));
  });
};
export {
  run
};
