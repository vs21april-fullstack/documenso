import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Trans, useLingui } from "@lingui/react";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { T as TemplateBrandingLogo } from "./template-branding-logo-oZ6w7QG2.js";
import { Button } from "@react-email/button";
import { Column } from "@react-email/column";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";
import { T as TemplateDocumentImage } from "./template-document-image-d_zk9qBW.js";
import { T as TemplateFooter, r as renderEmailWithI18N, g as getI18nInstance } from "./render-email-with-i18n-3T3sRiMH.js";
import { p as prismaWithReplicas, e as unsafeBuildEnvelopeIdQuery, h as getFileServerSide, N as NEXT_PUBLIC_WEBAPP_URL, j as formatDocumentsPath, f as extractDerivedDocumentEmailSettings, k as createDocumentAuditLogData, l as DOCUMENT_AUDIT_LOG_TYPE, i as isRecipientEmailValidForSending, g as assertOrganisationRatesAndLimits } from "./server-build-CXtBWrcO.js";
import { EnvelopeType, DocumentSource, RecipientRole } from "@prisma/client";
import { createElement } from "react";
import { g as getEmailContext } from "./get-email-context-CKCGQHWH.js";
import { r as renderCustomEmailTemplate } from "./render-custom-email-template-CJQVxdQl.js";
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
const TemplateDocumentCompleted = ({
  downloadLink,
  documentName,
  assetBaseUrl,
  customBody
}) => {
  const getAssetUrl = (path) => {
    return new URL(path, assetBaseUrl).toString();
  };
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
      /* @__PURE__ */ jsx(Text, { className: "mb-0 text-center font-semibold text-foreground text-lg", children: customBody || /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "gKjZXX",
        values: {
          documentName
        }
      } }) }),
      /* @__PURE__ */ jsx(Text, { className: "my-1 text-center text-base text-muted-foreground", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "j6HHO/"
      } }) }),
      /* @__PURE__ */ jsx(Section, { className: "mt-8 mb-6 text-center", children: /* @__PURE__ */ jsxs(Button, { className: "rounded-lg border border-border border-solid px-4 py-2 text-center font-medium text-foreground text-sm no-underline", href: downloadLink, children: [
        /* @__PURE__ */ jsx(Img, { src: getAssetUrl("/static/download.png"), className: "mr-2 mb-0.5 inline h-5 w-5 align-middle", alt: "" }),
        /* @__PURE__ */ jsx(Trans, { .../*i18n*/
        {
          id: "mzI/c+"
        } })
      ] }) })
    ] })
  ] });
};
const DocumentCompletedEmailTemplate = ({
  downloadLink = "https://documenso.com",
  documentName = "Open Source Pledge.pdf",
  assetBaseUrl = "http://localhost:3002",
  customBody,
  reportUrl
}) => {
  const {
    _
  } = useLingui();
  const previewText = (
    /*i18n*/
    {
      id: "XbKX9W"
    }
  );
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsxs(Body, { className: "mx-auto my-auto font-sans", children: [
      /* @__PURE__ */ jsx(Preview, { children: _(previewText) }),
      /* @__PURE__ */ jsxs(Section, { className: "bg-background", children: [
        /* @__PURE__ */ jsx(Container, { className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-2 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(Section, { className: "p-2", children: [
          /* @__PURE__ */ jsx(TemplateBrandingLogo, { assetBaseUrl, className: "mb-4 h-6" }),
          /* @__PURE__ */ jsx(TemplateDocumentCompleted, { downloadLink, documentName, assetBaseUrl, customBody })
        ] }) }),
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
    envelopeId,
    requestMetadata
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: unsafeBuildEnvelopeIdQuery({
      type: "envelopeId",
      id: envelopeId
    }, EnvelopeType.DOCUMENT),
    include: {
      envelopeItems: {
        include: {
          documentData: {
            select: {
              type: true,
              id: true,
              data: true
            }
          }
        }
      },
      documentMeta: true,
      recipients: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          disabled: true
        }
      },
      team: {
        select: {
          id: true,
          url: true
        }
      }
    }
  });
  if (!envelope) {
    throw new Error("Document not found");
  }
  const isDirectTemplate = envelope?.source === DocumentSource.TEMPLATE_DIRECT_LINK;
  if (envelope.recipients.length === 0) {
    throw new Error("Document has no recipients");
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
  if (envelope.user.disabled || emailsDisabled) {
    return;
  }
  const {
    user: owner
  } = envelope;
  const completedDocumentEmailAttachments = await Promise.all(envelope.envelopeItems.map(async (envelopeItem) => {
    const file = await getFileServerSide(envelopeItem.documentData);
    const fileNameToUse = envelope.internalVersion === 1 ? envelope.title : envelopeItem.title + ".pdf";
    return {
      filename: fileNameToUse.endsWith(".pdf") ? fileNameToUse : fileNameToUse + ".pdf",
      content: Buffer.from(file),
      contentType: "application/pdf"
    };
  }));
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || "http://localhost:3000";
  let documentOwnerDownloadLink = `${NEXT_PUBLIC_WEBAPP_URL()}${formatDocumentsPath(envelope.team?.url)}/${envelope.id}`;
  if (envelope.team?.url) {
    documentOwnerDownloadLink = `${NEXT_PUBLIC_WEBAPP_URL()}/t/${envelope.team.url}/documents/${envelope.id}`;
  }
  const emailSettings = extractDerivedDocumentEmailSettings(envelope.documentMeta);
  const isDocumentCompletedEmailEnabled = emailSettings.documentCompleted;
  const isOwnerDocumentCompletedEmailEnabled = emailSettings.ownerDocumentCompleted;
  if (isOwnerDocumentCompletedEmailEnabled && (!envelope.recipients.find((recipient) => recipient.email === owner.email) || !isDocumentCompletedEmailEnabled)) {
    const template = createElement(DocumentCompletedEmailTemplate, {
      documentName: envelope.title,
      assetBaseUrl,
      downloadLink: documentOwnerDownloadLink
    });
    const [html, text] = await Promise.all([renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding
    }), renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding,
      plainText: true
    })]);
    const i18n = await getI18nInstance(emailLanguage);
    await emailTransport.sendMail({
      to: [{
        name: owner.name || "",
        address: owner.email
      }],
      from: senderEmail,
      replyTo: replyToEmail,
      subject: i18n._(
        /*i18n*/
        {
          id: "vksYri"
        }
      ),
      html,
      text,
      attachments: completedDocumentEmailAttachments
    });
    await prismaWithReplicas.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT,
        envelopeId: envelope.id,
        user: null,
        requestMetadata,
        data: {
          emailType: "DOCUMENT_COMPLETED",
          recipientEmail: owner.email,
          recipientName: owner.name ?? "",
          recipientId: owner.id,
          recipientRole: "OWNER",
          isResending: false
        }
      })
    });
  }
  if (!isDocumentCompletedEmailEnabled) {
    return;
  }
  const recipientsToNotify = envelope.recipients.filter((recipient) => isRecipientEmailValidForSending(recipient));
  await Promise.all(recipientsToNotify.map(async (recipient) => {
    if (recipient.role === RecipientRole.CC) {
      try {
        await assertOrganisationRatesAndLimits({
          organisationId,
          organisationClaim: claims,
          type: "email",
          count: 1
        });
      } catch (_err) {
        io.logger.warn({
          msg: "CC completion email dropped: org email limit exceeded",
          organisationId,
          recipientId: recipient.id,
          envelopeId: envelope.id
        });
        return;
      }
    }
    const customEmailTemplate = {
      "signer.name": recipient.name,
      "signer.email": recipient.email,
      "document.name": envelope.title
    };
    const downloadLink = `${NEXT_PUBLIC_WEBAPP_URL()}/sign/${recipient.token}/complete`;
    const reportUrl = recipient.role === RecipientRole.CC ? `${NEXT_PUBLIC_WEBAPP_URL()}/report/${recipient.token}` : void 0;
    const template = createElement(DocumentCompletedEmailTemplate, {
      documentName: envelope.title,
      assetBaseUrl,
      downloadLink: recipient.email === owner.email ? documentOwnerDownloadLink : downloadLink,
      customBody: isDirectTemplate && envelope.documentMeta?.message ? renderCustomEmailTemplate(envelope.documentMeta.message, customEmailTemplate) : void 0,
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
    const i18n = await getI18nInstance(emailLanguage);
    await emailTransport.sendMail({
      to: [{
        name: recipient.name,
        address: recipient.email
      }],
      from: senderEmail,
      replyTo: replyToEmail,
      subject: isDirectTemplate && envelope.documentMeta?.subject ? renderCustomEmailTemplate(envelope.documentMeta.subject, customEmailTemplate) : i18n._(
        /*i18n*/
        {
          id: "vksYri"
        }
      ),
      html,
      text,
      attachments: completedDocumentEmailAttachments
    });
    await prismaWithReplicas.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT,
        envelopeId: envelope.id,
        user: null,
        requestMetadata,
        data: {
          emailType: "DOCUMENT_COMPLETED",
          recipientEmail: recipient.email,
          recipientName: recipient.name,
          recipientId: recipient.id,
          recipientRole: recipient.role,
          isResending: false
        }
      })
    });
  }));
};
export {
  run
};
