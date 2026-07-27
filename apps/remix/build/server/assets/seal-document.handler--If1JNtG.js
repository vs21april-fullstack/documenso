import path from "node:path";
import { RotationTypes, radiansToDegrees, degrees, rgb as rgb$1, TextAlignment, setFontAndSize, PDFDocument } from "@cantoo/pdf-lib";
import { an as NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY, v as AppError, w as AppErrorCode, h as getFileServerSide, ao as putPdfFileServerSide, p as prismaWithReplicas, ap as NEXT_PRIVATE_INTERNAL_WEBAPP_URL, aq as DOCUMENT_STATUS, A as APP_I18N_OPTIONS, R as RECIPIENT_ROLES_DESCRIPTION, ar as formatDocumentAuditLogAction, l as DOCUMENT_AUDIT_LOG_TYPE, as as ZSupportedLanguageCodeSchema, at as getOrganisationClaimByTeamId, au as getTranslations, av as parseDocumentAuditLogData, N as NEXT_PUBLIC_WEBAPP_URL, aw as svgToPng, ax as getSignatureFontFamily, ay as RECIPIENT_ROLE_SIGNING_REASONS, az as getDocumentCertificateAuditLogs, $ as extractDocumentAuthMethods, aA as PDF_SIZE_A4_72PPI, m as env, aB as NEXT_PRIVATE_USE_LEGACY_SIGNING_SUBFILTER, aC as NEXT_PUBLIC_SIGNING_CONTACT_INFO, aD as encryptSecondaryData, n as isValidLanguageCode, aE as USE_INTERNAL_URL_BROWSERLESS, aF as isSignatureFieldType, aG as DEFAULT_HANDWRITING_FONT_SIZE, aH as DEFAULT_STANDARD_FONT_SIZE, aI as MIN_HANDWRITING_FONT_SIZE, aJ as MIN_STANDARD_FONT_SIZE, af as ZCheckboxFieldMeta, aK as fromCheckboxValue, ae as ZRadioFieldMeta, aL as ZInitialsFieldMeta, aM as ZNameFieldMeta, aN as ZEmailFieldMeta, aO as ZDateFieldMeta, aP as ZNumberFieldMeta, aQ as ZTextFieldMeta, aR as renderField, K as mapDocumentIdToSecondaryId, Y as getTeamSettings, aS as fieldsContainUnsignedRequiredField, a5 as prefixedId, k as createDocumentAuditLogData, aT as isTspEnvelope, aU as NEXT_PRIVATE_USE_PLAYWRIGHT_PDF, ab as triggerWebhook, ac as ZWebhookDocumentSchema, ad as mapEnvelopeToWebhookDocumentPayload, aV as isDocumentCompleted, J as jobs } from "./server-build-p5av3CDS.js";
import { PDF, HttpTimestampAuthority, rgb, GoogleKmsSigner, parsePem, P12Signer } from "@libpdf/core";
import { DocumentStatus, SigningStatus, FieldType, EnvelopeType, RecipientRole, WebhookTriggerEvents } from "@prisma/client";
import { z } from "zod";
import { i18n } from "@lingui/core";
import Konva from "konva";
import "konva/skia-backend";
import * as fs from "node:fs";
import fs__default from "node:fs";
import { DateTime } from "luxon";
import { FontLibrary, Image, DOMMatrix, Path2D, Canvas } from "skia-canvas";
import { match, P } from "ts-pattern";
import { UAParser } from "ua-parser-js";
import { sortBy, prop, once, groupBy } from "remeda";
import { renderSVG } from "uqr";
import { nanoid } from "nanoid";
import fontkit from "@pdf-lib/fontkit";
import { Konva as Konva$1 } from "konva/lib/_CoreInternals";
import "react/jsx-runtime";
import "node:stream";
import "@lingui/react";
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
import "react";
import "@tanstack/react-query";
import "@trpc/react-query";
import "@vvo/tzdb";
import "@node-rs/bcrypt";
import "crypto";
import "node:module";
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
import "@simplewebauthn/browser";
import "colord";
import "@radix-ui/react-separator";
import "@hello-pangea/dnd";
import "react-rnd";
import "nuqs";
import "@azure/storage-blob";
import "@sindresorhus/slugify";
import "@aws-sdk/client-s3";
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
import "stripe";
import "jose";
z.object({
  error: z.string(),
  error_description: z.string().optional()
});
z.object({
  lang: z.string().optional()
});
z.object({
  specs: z.string(),
  name: z.string(),
  logo: z.string(),
  region: z.string(),
  lang: z.string(),
  description: z.string(),
  authType: z.array(z.string()),
  // REQUIRED Conditional — present when authType includes `oauth2code` /
  // `oauth2client`, or when any credential supports `oauth2code` authMode.
  // We always need it for V1, but keeping the schema permissive matches the
  // spec; absence is detected at the call site.
  oauth2: z.string().optional(),
  methods: z.array(z.string())
});
z.object({
  // OAuth2 user-specific service auth → userID MUST be omitted (§11.4 NOTE 1).
  userID: z.string().optional(),
  maxResults: z.number().int().positive().optional(),
  pageToken: z.string().optional(),
  clientData: z.string().optional()
});
z.object({
  credentialIDs: z.array(z.string()),
  nextPageToken: z.string().optional()
});
z.object({
  credentialID: z.string(),
  certificates: z.enum(["none", "single", "chain"]).optional(),
  certInfo: z.boolean().optional(),
  authInfo: z.boolean().optional(),
  lang: z.string().optional(),
  clientData: z.string().optional()
});
const ZCscCredentialsInfoKeySchema = z.object({
  status: z.enum(["enabled", "disabled"]),
  algo: z.array(z.string()),
  // REQUIRED per §11.5 but kept optional here so the algorithm-resolver can
  // surface absence as a typed `CSC_ALGORITHM_REFUSED` (matching the spec's
  // policy table) instead of a generic transport schema failure.
  len: z.number().int().positive().optional(),
  // REQUIRED Conditional for ECDSA per §11.5; absence handled by the resolver.
  curve: z.string().optional()
});
const ZCscCredentialsInfoCertSchema = z.object({
  status: z.enum(["valid", "expired", "revoked", "suspended"]).optional(),
  certificates: z.array(z.string()).optional(),
  issuerDN: z.string().optional(),
  serialNumber: z.string().optional(),
  subjectDN: z.string().optional(),
  validFrom: z.string().optional(),
  validTo: z.string().optional()
});
const ZCscCredentialsInfoPinSchema = z.object({
  presence: z.enum(["true", "false", "optional"]),
  format: z.enum(["A", "N"]).optional(),
  label: z.string().optional(),
  description: z.string().optional()
});
const ZCscCredentialsInfoOtpSchema = z.object({
  presence: z.enum(["true", "false", "optional"]),
  type: z.enum(["offline", "online"]).optional(),
  format: z.enum(["A", "N"]).optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  ID: z.string().optional(),
  provider: z.string().optional()
});
z.object({
  description: z.string().optional(),
  key: ZCscCredentialsInfoKeySchema,
  cert: ZCscCredentialsInfoCertSchema,
  authMode: z.enum(["implicit", "explicit", "oauth2code"]),
  SCAL: z.enum(["1", "2"]).optional(),
  PIN: ZCscCredentialsInfoPinSchema.optional(),
  OTP: ZCscCredentialsInfoOtpSchema.optional(),
  multisign: z.number().int().min(1),
  lang: z.string().optional()
});
z.object({
  credentialID: z.string(),
  SAD: z.string(),
  // Base64-encoded raw message digests.
  hash: z.array(z.string()).nonempty(),
  // REQUIRED Conditional — OID of the hash algorithm. Omit only when implied
  // by signAlgo (per §11.9). The caller decides.
  hashAlgo: z.string().optional(),
  signAlgo: z.string(),
  // REQUIRED Conditional for algorithms like RSASSA-PSS.
  signAlgoParams: z.string().optional(),
  clientData: z.string().optional()
});
z.object({
  // Position-ordered Base64-encoded signed hashes matching the input order.
  signatures: z.array(z.string()).nonempty()
});
z.object({
  hash: z.string(),
  hashAlgo: z.string(),
  // Hex-encoded random; SHALL round-trip in the timestamp token when supplied.
  nonce: z.string().optional(),
  clientData: z.string().optional()
});
z.object({
  // Base64-encoded RFC 3161 (with RFC 5816 update) time-stamp token.
  timestamp: z.string()
});
const resolveCscSealTimeTsa = () => {
  const envUrls = parseTsaEnv(NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY());
  if (envUrls.length === 0) {
    throw new AppError(AppErrorCode.CSC_PROVIDER_NO_TSA, {
      message: "CSC seal-time archival timestamps require NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY. This should have been caught by the boot-time guard in buildCscTransport — the env var is required at seal time even when the TSP advertises signatures/timestamp."
    });
  }
  return {
    urls: envUrls
  };
};
const parseTsaEnv = (raw) => {
  if (!raw) {
    return [];
  }
  return raw.split(",").map((url) => url.trim()).filter(Boolean);
};
const finalizeTspEnvelopeCompletion = async (opts) => {
  const {
    envelope,
    envelopeCompletedAuditLog
  } = opts;
  const tsa = resolveCscSealTimeTsa();
  const timestampAuthority = buildLibpdfTsa(tsa);
  const archivedItems = [];
  for (const envelopeItem of envelope.envelopeItems) {
    const pdfBytes = await getFileServerSide(envelopeItem.documentData);
    const pdfDoc = await PDF.load(pdfBytes);
    const archived = await pdfDoc.addArchivalData({
      timestampAuthority
    });
    const {
      documentData: uploaded
    } = await putPdfFileServerSide({
      name: envelopeItem.title.endsWith(".pdf") ? envelopeItem.title : `${envelopeItem.title}.pdf`,
      type: "application/pdf",
      arrayBuffer: async () => Promise.resolve(archived.bytes)
    }, envelopeItem.documentData.initialData);
    archivedItems.push({
      envelopeItemDataId: envelopeItem.documentData.id,
      uploadedType: uploaded.type,
      uploadedData: uploaded.data
    });
  }
  await prismaWithReplicas.$transaction(async (tx) => {
    for (const {
      envelopeItemDataId,
      uploadedType,
      uploadedData
    } of archivedItems) {
      await tx.documentData.update({
        where: {
          id: envelopeItemDataId
        },
        data: {
          type: uploadedType,
          data: uploadedData
        }
      });
    }
    await tx.envelope.update({
      where: {
        id: envelope.id
      },
      data: {
        status: DocumentStatus.COMPLETED,
        completedAt: /* @__PURE__ */ new Date()
      }
    });
    await tx.documentAuditLog.create({
      data: envelopeCompletedAuditLog
    });
  });
};
const buildLibpdfTsa = (tsa) => {
  return new HttpTimestampAuthority(tsa.urls[0]);
};
async function addRejectionStampToPdf(pdf, reason) {
  const pages = pdf.getPages();
  const fontBytes = await fetch(`${NEXT_PRIVATE_INTERNAL_WEBAPP_URL()}/fonts/noto-sans.ttf`).then(async (res) => res.arrayBuffer());
  const font = pdf.embedFont(new Uint8Array(fontBytes));
  for (const page of pages) {
    const height = page.height;
    const width = page.width;
    const rejectedTitleText = "DOCUMENT REJECTED";
    const rejectedTitleFontSize = 36;
    const rotationAngle = 45;
    const centerX = width / 2;
    const centerY = height / 2;
    const widthOfText = font.getTextWidth(rejectedTitleText, rejectedTitleFontSize);
    const padding = 20;
    const rectWidth = widthOfText + padding;
    const rectHeight = rejectedTitleFontSize + padding;
    const rectX = centerX - rectWidth / 2;
    const rectY = centerY - rectHeight / 4;
    page.drawRectangle({
      x: rectX,
      y: rectY,
      width: rectWidth,
      height: rectHeight,
      borderColor: rgb(220 / 255, 38 / 255, 38 / 255),
      borderWidth: 4,
      rotate: {
        angle: rotationAngle,
        origin: "center"
      }
    });
    const textX = centerX - widthOfText / 2;
    const textY = centerY;
    page.drawText(rejectedTitleText, {
      x: textX,
      y: textY,
      size: rejectedTitleFontSize,
      font,
      color: rgb(220 / 255, 38 / 255, 38 / 255),
      rotate: {
        angle: rotationAngle,
        origin: "center"
      }
    });
  }
  return pdf;
}
const ensureFontLibrary = () => {
  const fontPath = path.join(process.cwd(), "public/fonts");
  if (!FontLibrary.has("Caveat")) {
    FontLibrary.use({
      ["Caveat"]: [path.join(fontPath, "caveat.ttf")]
    });
  }
  if (!FontLibrary.has("Inter")) {
    FontLibrary.use({
      ["Inter"]: [path.join(fontPath, "inter-variablefont_opsz,wght.ttf")]
    });
  }
  if (!FontLibrary.has("Noto Sans")) {
    FontLibrary.use({
      ["Noto Sans"]: [path.join(fontPath, "noto-sans.ttf")],
      ["Noto Sans Japanese"]: [path.join(fontPath, "noto-sans-japanese.ttf")],
      ["Noto Sans Chinese"]: [path.join(fontPath, "noto-sans-chinese.ttf")],
      ["Noto Sans Korean"]: [path.join(fontPath, "noto-sans-korean.ttf")]
    });
  }
};
const parser = new UAParser();
const textMutedForegroundLight$1 = "#929DAE";
const textForeground = "#000";
const textMutedForeground$1 = "#64748B";
const textSm$1 = 9;
const textXs$1 = 8;
const fontMedium$1 = "500";
const pageTopMargin$1 = 60;
const pageBottomMargin$1 = 27;
const contentMaxWidth$1 = 768;
const rowPadding$1 = 10;
const titleFontSize$1 = 18;
const renderOverviewCardLabels = (options) => {
  const {
    width,
    text
  } = options;
  const labelYSpacing = 4;
  const group = new Konva.Group({
    x: options.groupX ?? 0
  });
  const label = new Konva.Text({
    x: 0,
    y: 0,
    text: options.label,
    fontStyle: fontMedium$1,
    fontFamily: "Inter",
    fill: textForeground,
    fontSize: textSm$1
  });
  group.add(label);
  if (typeof text === "string") {
    const value = new Konva.Text({
      x: 0,
      y: label.height() + labelYSpacing,
      width: width - label.width(),
      fontFamily: "Inter",
      text,
      fill: textForeground,
      wrap: "char",
      fontSize: textSm$1
    });
    group.add(value);
  } else {
    for (const textValue of text) {
      const value = new Konva.Text({
        x: 0,
        y: group.getClientRect().height + 4,
        width: width - label.width(),
        fontFamily: "Inter",
        text: "• " + textValue,
        fill: textForeground,
        wrap: "char",
        fontSize: textSm$1
      });
      group.add(value);
    }
  }
  return group;
};
const renderVerticalLabelAndText = (options) => {
  const {
    label,
    text,
    width,
    align,
    x,
    y,
    textFontFamily
  } = options;
  const group = new Konva.Group({
    x: x ?? 0,
    y: y ?? 0
  });
  const konvaLabel = new Konva.Text({
    align: align ?? "left",
    fontFamily: "Inter",
    width,
    text: label,
    fontSize: textXs$1,
    fill: textMutedForegroundLight$1
  });
  group.add(konvaLabel);
  const konvaText = new Konva.Text({
    y: group.getClientRect().height + 6,
    align: align ?? "left",
    fontFamily: textFontFamily ?? "Inter",
    width,
    text,
    fontSize: textXs$1,
    fill: textForeground
  });
  group.add(konvaText);
  return group;
};
const renderOverviewCard = (options) => {
  const {
    envelope,
    envelopeItems,
    envelopeOwner,
    recipients,
    width,
    i18n: i18n2
  } = options;
  const cardPadding = 16;
  const overviewCard = new Konva.Group();
  const columnSpacing = 10;
  const columnWidth = (width - columnSpacing) / 2;
  const rowVerticalSpacing = 32;
  const rowOne = new Konva.Group({
    x: cardPadding,
    y: cardPadding
  });
  const envelopeIdLabel = renderOverviewCardLabels({
    label: i18n2._(
      /*i18n*/
      {
        id: "YQM6Sv"
      }
    ),
    text: envelope.id,
    width: columnWidth
  });
  const ownerLabel = renderOverviewCardLabels({
    label: i18n2._(
      /*i18n*/
      {
        id: "LtI9AS"
      }
    ),
    text: `${envelopeOwner.name} (${envelopeOwner.email})`,
    width: columnWidth,
    groupX: columnWidth + columnSpacing
  });
  rowOne.add(envelopeIdLabel);
  rowOne.add(ownerLabel);
  overviewCard.add(rowOne);
  const rowTwo = new Konva.Group({
    x: cardPadding,
    y: overviewCard.getClientRect().height + rowVerticalSpacing
  });
  const statusLabel = renderOverviewCardLabels({
    label: i18n2._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ),
    text: i18n2._(envelope.deletedAt ? (
      /*i18n*/
      {
        id: "vGjmyl"
      }
    ) : DOCUMENT_STATUS[envelope.status].description).toUpperCase(),
    width: columnWidth
  });
  const timeZoneLabel = renderOverviewCardLabels({
    label: i18n2._(
      /*i18n*/
      {
        id: "RxsRD6"
      }
    ),
    text: envelope.documentMeta?.timezone || "N/A",
    width: columnWidth,
    groupX: columnWidth + columnSpacing
  });
  rowTwo.add(statusLabel);
  rowTwo.add(timeZoneLabel);
  overviewCard.add(rowTwo);
  const rowThree = new Konva.Group({
    x: cardPadding,
    y: overviewCard.getClientRect().height + rowVerticalSpacing
  });
  const createdAtLabel = renderOverviewCardLabels({
    label: i18n2._(
      /*i18n*/
      {
        id: "88kg0+"
      }
    ),
    text: DateTime.fromJSDate(envelope.createdAt).setLocale(APP_I18N_OPTIONS.defaultLocale).toFormat("yyyy-MM-dd hh:mm:ss a (ZZZZ)"),
    width: columnWidth
  });
  const lastUpdatedLabel = renderOverviewCardLabels({
    label: i18n2._(
      /*i18n*/
      {
        id: "K7P0jz"
      }
    ),
    text: DateTime.fromJSDate(envelope.updatedAt).setLocale(APP_I18N_OPTIONS.defaultLocale).toFormat("yyyy-MM-dd hh:mm:ss a (ZZZZ)"),
    width: columnWidth,
    groupX: columnWidth + columnSpacing
  });
  rowThree.add(createdAtLabel);
  rowThree.add(lastUpdatedLabel);
  overviewCard.add(rowThree);
  const rowFour = new Konva.Group({
    x: cardPadding,
    y: overviewCard.getClientRect().height + rowVerticalSpacing
  });
  const enclosedDocumentsLabel = renderOverviewCardLabels({
    label: i18n2._(
      /*i18n*/
      {
        id: "BBZOHp"
      }
    ),
    text: envelopeItems,
    width: columnWidth
  });
  const recipientsLabel = renderOverviewCardLabels({
    label: i18n2._(
      /*i18n*/
      {
        id: "yPrbsy"
      }
    ),
    text: recipients.map((recipient) => `[${i18n2._(RECIPIENT_ROLES_DESCRIPTION[recipient.role].roleName)}] ${recipient.name} (${recipient.email})`),
    width: columnWidth,
    groupX: columnWidth + columnSpacing
  });
  rowFour.add(enclosedDocumentsLabel);
  rowFour.add(recipientsLabel);
  overviewCard.add(rowFour);
  const cardRect = new Konva.Rect({
    x: 0,
    y: 0,
    width,
    height: overviewCard.getClientRect().height + cardPadding * 2,
    stroke: "#e5e7eb",
    strokeWidth: 1.5,
    cornerRadius: 8
  });
  overviewCard.add(cardRect);
  return overviewCard;
};
const renderRow$1 = (options) => {
  const {
    auditLog,
    width,
    i18n: i18n2
  } = options;
  const paddingWithinCard = 12;
  const columnSpacing = 10;
  const columnWidth = (width - paddingWithinCard * 2 - columnSpacing) / 2;
  const indicatorWidth = 3;
  const indicatorPaddingRight = 10;
  const rowGroup = new Konva.Group();
  const rowHeaderGroup = new Konva.Group();
  const auditLogIndicatorColor = new Konva.Circle({
    x: indicatorWidth,
    y: indicatorWidth + 3,
    radius: indicatorWidth,
    fill: getAuditLogIndicatorColor(auditLog.type)
  });
  const auditLogTypeText = new Konva.Text({
    x: indicatorWidth + indicatorPaddingRight,
    y: 0,
    width: columnWidth - indicatorWidth - indicatorPaddingRight,
    text: auditLog.type.replace(/_/g, " "),
    fontFamily: "Inter",
    fontSize: textSm$1,
    fontStyle: fontMedium$1,
    fill: textMutedForeground$1
  });
  const auditLogDescriptionText = new Konva.Text({
    x: indicatorWidth + indicatorPaddingRight,
    y: auditLogTypeText.height() + 4,
    width: columnWidth - indicatorWidth - indicatorPaddingRight,
    text: formatDocumentAuditLogAction(i18n2, auditLog).description,
    fontFamily: "Inter",
    fontSize: textSm$1,
    fill: textForeground
  });
  const auditLogTimestampText = new Konva.Text({
    x: columnWidth + columnSpacing,
    width: columnWidth,
    text: DateTime.fromJSDate(auditLog.createdAt).setLocale(APP_I18N_OPTIONS.defaultLocale).toLocaleString(dateFormat),
    fontFamily: "Inter",
    align: "right",
    fontSize: textSm$1,
    fill: textMutedForeground$1
  });
  rowHeaderGroup.add(auditLogIndicatorColor);
  rowHeaderGroup.add(auditLogTypeText);
  rowHeaderGroup.add(auditLogDescriptionText);
  rowHeaderGroup.add(auditLogTimestampText);
  rowHeaderGroup.setAttrs({
    x: paddingWithinCard,
    y: paddingWithinCard
  });
  rowGroup.add(rowHeaderGroup);
  const borderLine = new Konva.Line({
    points: [0, 0, width - paddingWithinCard * 2, 0],
    stroke: "#e5e7eb",
    strokeWidth: 1,
    x: paddingWithinCard,
    y: rowGroup.getClientRect().height + paddingWithinCard + 12
  });
  rowGroup.add(borderLine);
  const bottomSection = new Konva.Group({
    x: paddingWithinCard,
    y: rowGroup.getClientRect().height + paddingWithinCard + 12
  });
  const userLabel = renderVerticalLabelAndText({
    label: i18n2._(
      /*i18n*/
      {
        id: "7PzzBU"
      }
    ).toUpperCase(),
    text: auditLog.email || "N/A",
    align: "left",
    width: columnWidth,
    textFontFamily: "ui-monospace"
  });
  const ipAddressLabel = renderVerticalLabelAndText({
    label: i18n2._(
      /*i18n*/
      {
        id: "1xMiTU"
      }
    ).toUpperCase(),
    text: auditLog.ipAddress || "N/A",
    align: "right",
    x: columnWidth + columnSpacing,
    width: columnWidth,
    textFontFamily: "ui-monospace"
  });
  bottomSection.add(userLabel);
  bottomSection.add(ipAddressLabel);
  parser.setUA(auditLog.userAgent || "");
  const userAgentInfo = parser.getResult();
  const userAgentLabel = renderVerticalLabelAndText({
    label: i18n2._(
      /*i18n*/
      {
        id: "qM884L"
      }
    ).toUpperCase(),
    text: i18n2._(formatUserAgent(auditLog.userAgent, userAgentInfo)),
    align: "left",
    width,
    y: bottomSection.getClientRect().height + 16
  });
  bottomSection.add(userAgentLabel);
  rowGroup.add(bottomSection);
  const cardRect = new Konva.Rect({
    x: 0,
    y: 0,
    width: rowGroup.getClientRect().width,
    height: rowGroup.getClientRect().height + paddingWithinCard * 2,
    stroke: "#e5e7eb",
    strokeWidth: 1,
    cornerRadius: 8
  });
  rowGroup.add(cardRect);
  return rowGroup;
};
const renderBranding$1 = () => {
  const branding = new Konva.Group();
  const brandingHeight = 16;
  const logoPath = path.join(process.cwd(), "public/static/logo.png");
  const logo = fs__default.readFileSync(logoPath);
  const img = new Image(logo);
  const brandingImage = new Konva.Image({
    image: img,
    height: brandingHeight,
    width: brandingHeight * (img.width / img.height)
  });
  branding.add(brandingImage);
  return branding;
};
const groupRowsIntoPages$1 = (options) => {
  const {
    auditLogs,
    maxHeight,
    contentWidth,
    i18n: i18n2,
    overviewCard
  } = options;
  const groupedRows = [[]];
  const overviewCardHeight = overviewCard.getClientRect().height;
  let availableHeight = maxHeight - pageTopMargin$1 - overviewCardHeight;
  let currentGroupedRowIndex = 0;
  for (const auditLog of auditLogs) {
    const row = renderRow$1({
      auditLog,
      width: contentWidth,
      i18n: i18n2
    });
    const rowHeight = row.getClientRect().height;
    const requiredHeight = rowHeight + rowPadding$1;
    if (requiredHeight > availableHeight) {
      currentGroupedRowIndex++;
      groupedRows[currentGroupedRowIndex] = [row];
      availableHeight = maxHeight - pageTopMargin$1;
    } else {
      groupedRows[currentGroupedRowIndex].push(row);
    }
    availableHeight -= requiredHeight;
  }
  return groupedRows;
};
const renderPages = (options) => {
  const {
    groupedRows,
    margin,
    pageTopMargin: pageTopMargin2,
    i18n: i18n2,
    overviewCard
  } = options;
  const rowPadding2 = 10;
  const pages = [];
  for (const [pageIndex, rows] of groupedRows.entries()) {
    const pageGroup = new Konva.Group();
    const pageTitle = new Konva.Text({
      x: margin,
      y: 0,
      height: pageTopMargin2,
      verticalAlign: "middle",
      text: i18n2._(
        /*i18n*/
        {
          id: "ilRCh1"
        }
      ),
      fill: textForeground,
      fontFamily: "Inter",
      fontSize: titleFontSize$1,
      fontStyle: "700"
    });
    pageGroup.add(pageTitle);
    if (pageIndex === 0) {
      overviewCard.setAttrs({
        x: margin,
        y: pageGroup.getClientRect().height
      });
      pageGroup.add(overviewCard);
    }
    for (const row of rows) {
      const yPosition = pageGroup.getClientRect().height + rowPadding2;
      row.setAttrs({
        x: margin,
        y: yPosition
      });
      pageGroup.add(row);
    }
    pages.push(pageGroup);
  }
  return pages;
};
async function renderAuditLogs({
  envelope,
  envelopeOwner,
  envelopeItems,
  recipients,
  auditLogs,
  pageWidth,
  pageHeight,
  i18n: i18n2,
  hidePoweredBy
}) {
  ensureFontLibrary();
  const minimumMargin = 10;
  const contentWidth = Math.min(pageWidth - minimumMargin * 2, contentMaxWidth$1);
  const margin = (pageWidth - contentWidth) / 2;
  let stage = new Konva.Stage({
    width: pageWidth,
    height: pageHeight
  });
  const overviewCard = renderOverviewCard({
    envelope,
    envelopeOwner,
    envelopeItems,
    recipients,
    width: contentWidth,
    i18n: i18n2
  });
  const groupedRows = groupRowsIntoPages$1({
    auditLogs,
    maxHeight: pageHeight - pageBottomMargin$1,
    contentWidth,
    i18n: i18n2,
    overviewCard
  });
  const pageGroups = renderPages({
    groupedRows,
    margin,
    pageTopMargin: pageTopMargin$1,
    i18n: i18n2,
    overviewCard
  });
  const brandingGroup = renderBranding$1();
  const brandingRect = brandingGroup.getClientRect();
  const brandingTopPadding = 24;
  const pages = [];
  let isBrandingPlaced = false;
  for (const [index, pageGroup] of pageGroups.entries()) {
    stage.destroyChildren();
    const page = new Konva.Layer();
    const footerText = new Konva.Text({
      x: margin,
      y: pageHeight - textXs$1 - 10,
      text: `${i18n2._(
        /*i18n*/
        {
          id: "YQM6Sv"
        }
      )}: ${envelope.id}`,
      fontFamily: "Inter",
      fontSize: textXs$1,
      fill: textMutedForegroundLight$1
    });
    page.add(footerText);
    page.add(pageGroup);
    if (index === pageGroups.length - 1 && !hidePoweredBy) {
      const remainingHeight = pageHeight - pageGroup.getClientRect().height - pageBottomMargin$1;
      if (brandingRect.height + brandingTopPadding <= remainingHeight) {
        brandingGroup.setAttrs({
          x: pageWidth - brandingRect.width - margin,
          y: pageGroup.getClientRect().height + brandingTopPadding
        });
        page.add(brandingGroup);
        isBrandingPlaced = true;
      }
    }
    stage.add(page);
    const canvas = page.canvas._canvas;
    const buffer = await canvas.toBuffer("pdf");
    pages.push(new Uint8Array(buffer));
  }
  if (!hidePoweredBy && !isBrandingPlaced) {
    stage.destroyChildren();
    const page = new Konva.Layer();
    brandingGroup.setAttrs({
      x: pageWidth - brandingRect.width - margin,
      y: pageTopMargin$1
    });
    const overflowFooterText = new Konva.Text({
      x: margin,
      y: pageHeight - textXs$1 - 10,
      text: `${i18n2._(
        /*i18n*/
        {
          id: "YQM6Sv"
        }
      )}: ${envelope.id}`,
      fontFamily: "Inter",
      fontSize: textXs$1,
      fill: textMutedForegroundLight$1
    });
    page.add(overflowFooterText);
    page.add(brandingGroup);
    stage.add(page);
    const canvas = page.canvas._canvas;
    const buffer = await canvas.toBuffer("pdf");
    pages.push(new Uint8Array(buffer));
  }
  stage.destroy();
  stage = null;
  return pages;
}
const dateFormat = {
  ...DateTime.DATETIME_SHORT,
  hourCycle: "h12"
};
const getAuditLogIndicatorColor = (type) => match(type).with(DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_COMPLETED, () => "#22c55e").with(DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_REJECTED, () => "#ef4444").with(DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_SENT, () => "#f97316").with(
  P.union(DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FIELD_INSERTED, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FIELD_UNINSERTED),
  () => "#3b82f6"
  // bg-blue-500
).otherwise(() => "#f1f5f9");
const formatUserAgent = (userAgent, userAgentInfo) => {
  if (!userAgent) {
    return (
      /*i18n*/
      {
        id: "fj5byd"
      }
    );
  }
  const browser = userAgentInfo.browser.name;
  const version = userAgentInfo.browser.version;
  const os = userAgentInfo.os.name;
  if (browser && os) {
    const browserInfo = version ? `${browser} ${version}` : browser;
    return (
      /*i18n*/
      {
        id: "0XTimV",
        values: {
          browserInfo,
          os
        }
      }
    );
  }
  return (
    /*i18n*/
    {
      id: "LvpoD+",
      values: {
        userAgent
      }
    }
  );
};
const generateAuditLogPdf = async (options) => {
  const {
    envelope,
    envelopeOwner,
    envelopeItems,
    recipients,
    language,
    pageWidth,
    pageHeight,
    additionalAuditLogs = []
  } = options;
  const documentLanguage = ZSupportedLanguageCodeSchema.parse(language);
  const [organisationClaim, partialAuditLogs, messages] = await Promise.all([getOrganisationClaimByTeamId({
    teamId: envelope.teamId
  }), getAuditLogs(envelope.id), getTranslations(documentLanguage)]);
  i18n.loadAndActivate({
    locale: documentLanguage,
    messages
  });
  const auditLogs = [...additionalAuditLogs, ...partialAuditLogs];
  const auditLogPages = await renderAuditLogs({
    envelope,
    envelopeOwner,
    envelopeItems,
    recipients,
    auditLogs,
    hidePoweredBy: organisationClaim.flags.hidePoweredBy ?? false,
    pageWidth,
    pageHeight,
    i18n
  });
  return await PDF.merge(auditLogPages, {
    includeAnnotations: true
  });
};
const getAuditLogs = async (envelopeId) => {
  const auditLogs = await prismaWithReplicas.documentAuditLog.findMany({
    where: {
      envelopeId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return auditLogs.map((auditLog) => parseDocumentAuditLogData(auditLog));
};
const getDevice = (userAgent) => {
  if (!userAgent) {
    return "Unknown";
  }
  const parser2 = new UAParser(userAgent);
  parser2.setUA(userAgent);
  const result = parser2.getResult();
  return `${result.os.name} - ${result.browser.name} ${result.browser.version}`;
};
const textMutedForegroundLight = "#929DAE";
const textMutedForeground = "#64748B";
const textRejectedRed = "#dc2626";
const textBase = 10;
const textSm = 9;
const textXs = 8;
const fontMedium = "500";
const columnWidthPercentages = [30, 30, 40];
const rowPadding = 12;
const tableHeaderHeight = 38;
const pageTopMargin = 72;
const pageBottomMargin = 24;
const contentMaxWidth = 768;
const titleFontSize = 18;
const renderLabelAndText = (options) => {
  const {
    width,
    y
  } = options;
  const group = new Konva.Group({
    y
  });
  const labelFill = options.labelFill ?? textMutedForeground;
  const valueFill = options.valueFill ?? textMutedForeground;
  const label = new Konva.Text({
    x: 0,
    y: 0,
    text: `${options.label}: `,
    fontStyle: fontMedium,
    fontFamily: "Inter",
    fill: labelFill,
    fontSize: textSm
  });
  group.add(label);
  const value = new Konva.Text({
    x: label.width(),
    y: 0,
    width: width - label.width(),
    fontFamily: "Inter",
    text: options.text,
    fill: valueFill,
    wrap: "char",
    fontSize: textSm
  });
  group.add(value);
  return group;
};
const renderRowHeader = (options) => {
  const {
    columnWidths,
    i18n: i18n2
  } = options;
  const columnOneWidth = columnWidths[0];
  const columnTwoWidth = columnWidths[1];
  const columnThreeWidth = columnWidths[2];
  const headerRow = new Konva.Group();
  const headerFontStyling = {
    fontFamily: "Inter",
    fontSize: 11,
    fontStyle: fontMedium,
    verticalAlign: "middle",
    fill: textMutedForeground,
    height: tableHeaderHeight
  };
  const header1 = new Konva.Text({
    x: rowPadding,
    width: columnOneWidth,
    text: i18n2._(
      /*i18n*/
      {
        id: "isWUnR"
      }
    ),
    ...headerFontStyling
  });
  headerRow.add(header1);
  const header2 = new Konva.Text({
    x: columnOneWidth + rowPadding,
    width: columnTwoWidth,
    text: i18n2._(
      /*i18n*/
      {
        id: "n+8yVN"
      }
    ),
    ...headerFontStyling
  });
  headerRow.add(header2);
  const header3 = new Konva.Text({
    x: columnOneWidth + columnTwoWidth + rowPadding,
    width: columnThreeWidth,
    text: i18n2._(
      /*i18n*/
      {
        id: "URmyfc"
      }
    ),
    ...headerFontStyling
  });
  headerRow.add(header3);
  return headerRow;
};
const columnPadding = 10;
const renderColumnOne = (options) => {
  const {
    recipient,
    width,
    i18n: i18n2
  } = options;
  const columnGroup = new Konva.Group();
  const textSectionPadding = 8;
  const textFontStyling = {
    x: 0,
    fontFamily: "Inter",
    wrap: "char",
    lineHeight: 1.2,
    fill: textMutedForeground,
    width: width - columnPadding
  };
  if (recipient.name) {
    const nameText = new Konva.Text({
      y: 0,
      text: recipient.name,
      fontSize: textBase,
      ...textFontStyling,
      fontStyle: fontMedium
    });
    columnGroup.add(nameText);
  }
  const emailText = new Konva.Text({
    y: columnGroup.getClientRect().height,
    text: recipient.email,
    fontSize: textBase,
    ...textFontStyling
  });
  columnGroup.add(emailText);
  const roleText = new Konva.Text({
    y: columnGroup.getClientRect().height + textSectionPadding,
    text: i18n2._(RECIPIENT_ROLES_DESCRIPTION[recipient.role].roleName),
    fontSize: textSm,
    ...textFontStyling
  });
  columnGroup.add(roleText);
  const authLabel = new Konva.Text({
    y: columnGroup.getClientRect().height + textSectionPadding,
    text: `${i18n2._(
      /*i18n*/
      {
        id: "CQZM7l"
      }
    )}:`,
    fontSize: textSm,
    fontStyle: fontMedium,
    ...textFontStyling
  });
  columnGroup.add(authLabel);
  const authValue = new Konva.Text({
    y: columnGroup.getClientRect().height,
    text: recipient.authLevel,
    fontSize: textSm,
    ...textFontStyling
  });
  columnGroup.add(authValue);
  return columnGroup;
};
const renderColumnTwo = (options) => {
  const {
    recipient,
    width,
    i18n: i18n2
  } = options;
  const column = new Konva.Group();
  const columnWidth = width - columnPadding;
  const isRejected = Boolean(recipient.logs.rejected);
  if (recipient.signatureField?.secondaryId) {
    const signatureContainer = new Konva.Group({
      x: 0,
      y: 0
    });
    const minSignatureHeight = 40;
    const maxSignatureWidth = 100;
    if (recipient.signatureField?.signature?.signatureImageAsBase64) {
      const img = new Image(recipient.signatureField?.signature?.signatureImageAsBase64);
      const signatureImage = new Konva.Image({
        image: img,
        x: 4,
        y: 4,
        width: maxSignatureWidth,
        height: maxSignatureWidth * (img.height / img.width)
      });
      signatureContainer.add(signatureImage);
    } else if (recipient.signatureField?.signature?.typedSignature) {
      const typedSig = new Konva.Text({
        x: 2,
        text: recipient.signatureField?.signature?.typedSignature,
        padding: 4,
        fontFamily: getSignatureFontFamily(recipient.signatureField?.signature?.typedSignature),
        fontSize: 16,
        align: "center",
        verticalAlign: "middle",
        width: maxSignatureWidth
      });
      if (typedSig.getClientRect().height < minSignatureHeight) {
        typedSig.setAttrs({
          height: minSignatureHeight
        });
      }
      signatureContainer.add(typedSig);
    }
    if (!isRejected) {
      column.add(signatureContainer);
    }
    const signatureHeight = Math.max(signatureContainer.getClientRect().height, minSignatureHeight);
    const signatureBorder = new Konva.Rect({
      x: 2,
      y: 2,
      width: maxSignatureWidth,
      height: signatureHeight,
      stroke: "rgba(122, 196, 85, 0.6)",
      strokeWidth: 1,
      cornerRadius: 8
    });
    signatureContainer.add(signatureBorder);
    const signatureShadow = new Konva.Rect({
      x: 0,
      y: 0,
      width: maxSignatureWidth + 4,
      height: signatureHeight + 4,
      stroke: "rgba(122, 196, 85, 0.1)",
      strokeWidth: 4,
      cornerRadius: 8
    });
    signatureContainer.add(signatureShadow);
    const sigIdLabel = new Konva.Text({
      x: 0,
      y: isRejected ? 0 : signatureHeight + 10,
      text: `${i18n2._(
        /*i18n*/
        {
          id: "2KM4Ga"
        }
      )}:`,
      fill: textMutedForeground,
      width: columnWidth,
      fontFamily: "Inter",
      fontSize: textSm,
      fontStyle: fontMedium,
      lineHeight: 1.4
    });
    column.add(sigIdLabel);
    const sigIdValue = new Konva.Text({
      x: 0,
      y: column.getClientRect().height,
      text: recipient.signatureField.secondaryId.toUpperCase(),
      fill: textMutedForeground,
      fontFamily: "monospace",
      fontSize: textSm,
      width: columnWidth,
      wrap: "char"
    });
    column.add(sigIdValue);
  } else {
    const naText = new Konva.Text({
      x: 0,
      y: 0,
      text: "N/A",
      fill: textMutedForeground,
      fontFamily: "Inter",
      fontSize: textSm
    });
    column.add(naText);
  }
  const relevantLog = isRejected ? recipient.logs.rejected : recipient.logs.completed;
  const ipLabelAndText = renderLabelAndText({
    label: i18n2._(
      /*i18n*/
      {
        id: "1xMiTU"
      }
    ),
    text: relevantLog?.ipAddress ?? i18n2._(
      /*i18n*/
      {
        id: "Ef7StM"
      }
    ),
    width,
    y: column.getClientRect().height + 6
  });
  column.add(ipLabelAndText);
  const deviceLabelAndText = renderLabelAndText({
    label: i18n2._(
      /*i18n*/
      {
        id: "PEHQTf"
      }
    ),
    text: getDevice(relevantLog?.userAgent),
    width,
    y: column.getClientRect().height + 6
  });
  column.add(deviceLabelAndText);
  return column;
};
const renderColumnThree = (options) => {
  const {
    recipient,
    width,
    i18n: i18n2,
    envelopeOwner
  } = options;
  const column = new Konva.Group();
  const itemsToRender = [{
    label: i18n2._(
      /*i18n*/
      {
        id: "h69WC6"
      }
    ),
    value: recipient.logs.emailed ? DateTime.fromJSDate(recipient.logs.emailed.createdAt).setLocale(APP_I18N_OPTIONS.defaultLocale).toFormat("yyyy-MM-dd hh:mm:ss a (ZZZZ)") : recipient.logs.sent ? DateTime.fromJSDate(recipient.logs.sent.createdAt).setLocale(APP_I18N_OPTIONS.defaultLocale).toFormat("yyyy-MM-dd hh:mm:ss a (ZZZZ)") : i18n2._(
      /*i18n*/
      {
        id: "Ef7StM"
      }
    )
  }, {
    label: i18n2._(
      /*i18n*/
      {
        id: "vXtpAZ"
      }
    ),
    value: recipient.logs.opened ? DateTime.fromJSDate(recipient.logs.opened.createdAt).setLocale(APP_I18N_OPTIONS.defaultLocale).toFormat("yyyy-MM-dd hh:mm:ss a (ZZZZ)") : i18n2._(
      /*i18n*/
      {
        id: "Ef7StM"
      }
    )
  }];
  if (recipient.logs.rejected) {
    itemsToRender.push({
      label: i18n2._(
        /*i18n*/
        {
          id: "ekCRTP"
        }
      ),
      value: DateTime.fromJSDate(recipient.logs.rejected.createdAt).setLocale(APP_I18N_OPTIONS.defaultLocale).toFormat("yyyy-MM-dd hh:mm:ss a (ZZZZ)"),
      labelFill: textRejectedRed,
      valueFill: textRejectedRed
    });
  } else {
    itemsToRender.push({
      label: i18n2._(
        /*i18n*/
        {
          id: "PoH7eg"
        }
      ),
      value: recipient.logs.completed ? DateTime.fromJSDate(recipient.logs.completed.createdAt).setLocale(APP_I18N_OPTIONS.defaultLocale).toFormat("yyyy-MM-dd hh:mm:ss a (ZZZZ)") : i18n2._(
        /*i18n*/
        {
          id: "Ef7StM"
        }
      )
    });
  }
  const isOwner = recipient.email.toLowerCase() === envelopeOwner.email.toLowerCase();
  itemsToRender.push({
    label: i18n2._(
      /*i18n*/
      {
        id: "VJScHU"
      }
    ),
    value: recipient.signingStatus === SigningStatus.REJECTED ? recipient.rejectionReason || "" : isOwner ? i18n2._(
      /*i18n*/
      {
        id: "2+GP4I"
      }
    ) : i18n2._(RECIPIENT_ROLE_SIGNING_REASONS[recipient.role])
  });
  for (const [index, item] of itemsToRender.entries()) {
    const labelAndText = renderLabelAndText({
      label: item.label,
      text: item.value,
      width,
      y: column.getClientRect().height + (index === 0 ? 0 : 8),
      labelFill: item.labelFill,
      valueFill: item.valueFill
    });
    column.add(labelAndText);
  }
  return column;
};
const renderRow = (options) => {
  const {
    recipient,
    columnWidths,
    i18n: i18n2,
    envelopeOwner
  } = options;
  const rowGroup = new Konva.Group();
  const width = columnWidths[0] + columnWidths[1] + columnWidths[2];
  const borderLine = new Konva.Line({
    points: [0, 0, width + rowPadding * 2, 0],
    stroke: "#e5e7eb",
    strokeWidth: 1
  });
  rowGroup.add(borderLine);
  const columnGroup = renderColumnOne({
    recipient,
    width: columnWidths[0],
    i18n: i18n2
  });
  columnGroup.setAttrs({
    x: rowPadding,
    y: rowPadding
  });
  rowGroup.add(columnGroup);
  const columnTwoGroup = renderColumnTwo({
    recipient,
    width: columnWidths[1],
    i18n: i18n2
  });
  columnTwoGroup.setAttrs({
    x: rowPadding + columnWidths[0],
    y: rowPadding
  });
  rowGroup.add(columnTwoGroup);
  const columnThreeGroup = renderColumnThree({
    recipient,
    width: columnWidths[2],
    i18n: i18n2,
    envelopeOwner
  });
  columnThreeGroup.setAttrs({
    x: rowPadding + columnWidths[0] + columnWidths[1],
    y: rowPadding
  });
  rowGroup.add(columnThreeGroup);
  const rowBottomPadding = new Konva.Rect({
    x: 0,
    y: rowGroup.getClientRect().height,
    width: rowGroup.getClientRect().width,
    height: rowPadding
  });
  rowGroup.add(rowBottomPadding);
  return rowGroup;
};
const renderBranding = async ({
  qrToken,
  i18n: i18n2
}) => {
  const branding = new Konva.Group();
  const brandingHeight = 12;
  const text = new Konva.Text({
    x: 0,
    verticalAlign: "middle",
    text: i18n2._(
      /*i18n*/
      {
        id: "k9NQxp"
      }
    ) + ":",
    fontStyle: fontMedium,
    fontFamily: "Inter",
    fontSize: textSm,
    height: brandingHeight
  });
  const logoPath = path.join(process.cwd(), "public/static/logo.png");
  const logo = fs__default.readFileSync(logoPath);
  const img = new Image(logo);
  const documensoImage = new Konva.Image({
    image: img,
    height: brandingHeight,
    width: brandingHeight * (img.width / img.height),
    x: text.width() + 16
  });
  const qrSize = qrToken ? 72 : 0;
  const logoGroup = new Konva.Group({
    y: qrSize + 16
  });
  logoGroup.add(text);
  logoGroup.add(documensoImage);
  branding.add(logoGroup);
  if (qrToken) {
    const qrSvg = renderSVG(`${NEXT_PUBLIC_WEBAPP_URL()}/share/${qrToken}`, {
      ecc: "Q"
    });
    const svgImage = await svgToPng(qrSvg);
    const qrSkiaImage = new Image(svgImage);
    const qrImage = new Konva.Image({
      image: qrSkiaImage,
      height: qrSize,
      width: qrSize,
      x: branding.getClientRect().width - qrSize,
      y: 0
    });
    branding.add(qrImage);
  }
  return branding;
};
const groupRowsIntoPages = (options) => {
  const {
    recipients,
    maxHeight,
    i18n: i18n2,
    columnWidths,
    envelopeOwner
  } = options;
  const rowHeader = renderRowHeader({
    columnWidths,
    i18n: i18n2
  });
  const rowHeaderHeight = rowHeader.getClientRect().height;
  const groupedRows = [[]];
  let availablePageHeight = maxHeight - rowHeaderHeight;
  let currentGroupedRowIndex = 0;
  for (const recipient of recipients) {
    const row = renderRow({
      recipient,
      columnWidths,
      i18n: i18n2,
      envelopeOwner
    });
    const rowHeight = row.getClientRect().height;
    if (rowHeight > availablePageHeight) {
      currentGroupedRowIndex++;
      groupedRows[currentGroupedRowIndex] = [row];
      availablePageHeight = maxHeight - rowHeaderHeight;
    } else {
      groupedRows[currentGroupedRowIndex].push(row);
    }
    availablePageHeight -= rowHeight;
  }
  return groupedRows;
};
const renderTables = (options) => {
  const {
    groupedRows,
    columnWidths,
    i18n: i18n2
  } = options;
  const tables = [];
  for (const rows of groupedRows) {
    const table = new Konva.Group();
    const tableHeader = renderRowHeader({
      columnWidths,
      i18n: i18n2
    });
    table.add(tableHeader);
    for (const row of rows) {
      row.setAttrs({
        x: 0,
        y: table.getClientRect().height
      });
      table.add(row);
    }
    const tableClientRect = table.getClientRect();
    const cardRect = new Konva.Rect({
      x: tableClientRect.x,
      y: tableClientRect.y,
      width: tableClientRect.width,
      height: tableClientRect.height,
      stroke: "#e5e7eb",
      strokeWidth: 1.5,
      cornerRadius: 8
    });
    table.add(cardRect);
    tables.push(table);
  }
  return tables;
};
async function renderCertificate({
  recipients,
  envelopeId,
  qrToken,
  hidePoweredBy,
  i18n: i18n2,
  envelopeOwner,
  pageWidth,
  pageHeight
}) {
  ensureFontLibrary();
  const minimumMargin = 10;
  const tableWidth = Math.min(pageWidth - minimumMargin * 2, contentMaxWidth);
  const tableContentWidth = tableWidth - rowPadding * 2;
  const margin = (pageWidth - tableWidth) / 2;
  const columnOneWidth = tableContentWidth * columnWidthPercentages[0] / 100;
  const columnTwoWidth = tableContentWidth * columnWidthPercentages[1] / 100;
  const columnThreeWidth = tableContentWidth * columnWidthPercentages[2] / 100;
  const columnWidths = [columnOneWidth, columnTwoWidth, columnThreeWidth];
  let stage = new Konva.Stage({
    width: pageWidth,
    height: pageHeight
  });
  const maxTableHeight = pageHeight - pageTopMargin - pageBottomMargin;
  const groupedRows = groupRowsIntoPages({
    recipients,
    maxHeight: maxTableHeight,
    columnWidths,
    i18n: i18n2,
    envelopeOwner
  });
  const tables = renderTables({
    groupedRows,
    columnWidths,
    i18n: i18n2
  });
  const brandingGroup = await renderBranding({
    qrToken,
    i18n: i18n2
  });
  const brandingRect = brandingGroup.getClientRect();
  const brandingTopPadding = 24;
  const pages = [];
  let isQrPlaced = false;
  for (const [index, table] of tables.entries()) {
    stage.destroyChildren();
    const page = new Konva.Layer();
    const group = new Konva.Group();
    const titleText = new Konva.Text({
      x: margin,
      y: 0,
      height: pageTopMargin,
      verticalAlign: "middle",
      text: i18n2._(
        /*i18n*/
        {
          id: "opUNbY"
        }
      ),
      fontFamily: "Inter",
      fontSize: titleFontSize,
      fontStyle: "700"
    });
    table.setAttrs({
      x: margin,
      y: pageTopMargin
    });
    group.add(titleText);
    group.add(table);
    if (index === tables.length - 1 && !hidePoweredBy) {
      const remainingHeight = pageHeight - group.getClientRect().height - pageBottomMargin;
      if (brandingRect.height + brandingTopPadding <= remainingHeight) {
        brandingGroup.setAttrs({
          x: pageWidth - brandingRect.width - margin,
          y: group.getClientRect().height + brandingTopPadding
        });
        page.add(brandingGroup);
        isQrPlaced = true;
      }
    }
    const footerText = new Konva.Text({
      x: margin,
      y: pageHeight - textXs - 10,
      text: `${i18n2._(
        /*i18n*/
        {
          id: "YQM6Sv"
        }
      )}: ${envelopeId}`,
      fontFamily: "Inter",
      fontSize: textXs,
      fill: textMutedForegroundLight
    });
    page.add(footerText);
    page.add(group);
    stage.add(page);
    const canvas = page.canvas._canvas;
    const buffer = await canvas.toBuffer("pdf");
    pages.push(new Uint8Array(buffer));
  }
  if (!hidePoweredBy && !isQrPlaced) {
    const page = new Konva.Layer();
    brandingGroup.setAttrs({
      x: pageWidth - brandingRect.width - margin,
      y: pageTopMargin / 2
      // Less padding since there's nothing else on this page.
    });
    const overflowFooterText = new Konva.Text({
      x: margin,
      y: pageHeight - textXs - 10,
      text: `${i18n2._(
        /*i18n*/
        {
          id: "YQM6Sv"
        }
      )}: ${envelopeId}`,
      fontFamily: "Inter",
      fontSize: textXs,
      fill: textMutedForegroundLight
    });
    page.add(overflowFooterText);
    page.add(brandingGroup);
    stage.add(page);
    const canvas = page.canvas._canvas;
    const buffer = await canvas.toBuffer("pdf");
    pages.push(new Uint8Array(buffer));
  }
  stage.destroy();
  stage = null;
  return pages;
}
const generateCertificatePdf = async (options) => {
  const {
    envelope,
    envelopeOwner,
    recipients,
    fields,
    language,
    pageWidth,
    pageHeight
  } = options;
  const documentLanguage = ZSupportedLanguageCodeSchema.parse(language);
  const [organisationClaim, auditLogs, messages] = await Promise.all([getOrganisationClaimByTeamId({
    teamId: envelope.teamId
  }), getDocumentCertificateAuditLogs({
    envelopeId: envelope.id
  }), getTranslations(documentLanguage)]);
  i18n.loadAndActivate({
    locale: documentLanguage,
    messages
  });
  const payload = {
    recipients: recipients.map((recipient) => {
      const recipientId = recipient.id;
      const signatureField = fields.find((field) => field.recipientId === recipient.id && field.type === FieldType.SIGNATURE);
      const emailSent = auditLogs["EMAIL_SENT"].find((log) => log.type === "EMAIL_SENT" && log.data.recipientId === recipientId);
      const documentSent = auditLogs["DOCUMENT_SENT"].find((log) => log.type === "DOCUMENT_SENT");
      const documentOpened = auditLogs["DOCUMENT_OPENED"].find((log) => log.type === "DOCUMENT_OPENED" && log.data.recipientId === recipientId);
      const documentRecipientCompleted = auditLogs["DOCUMENT_RECIPIENT_COMPLETED"].find((log) => log.type === "DOCUMENT_RECIPIENT_COMPLETED" && log.data.recipientId === recipientId);
      const documentRecipientRejected = auditLogs["DOCUMENT_RECIPIENT_REJECTED"].find((log) => log.type === "DOCUMENT_RECIPIENT_REJECTED" && log.data.recipientId === recipientId);
      const extractedAuthMethods = extractDocumentAuthMethods({
        documentAuth: envelope.authOptions,
        recipientAuth: recipient.authOptions
      });
      const insertedAuditLogsWithFieldAuth = sortBy(auditLogs.DOCUMENT_FIELD_INSERTED.filter((log) => log.data.recipientId === recipient.id && log.data.fieldSecurity), [prop("createdAt"), "desc"]);
      const actionAuthMethod = insertedAuditLogsWithFieldAuth.at(0)?.data?.fieldSecurity?.type;
      let authLevel = match(actionAuthMethod).with("ACCOUNT", () => i18n._(
        /*i18n*/
        {
          id: "T1QAP8"
        }
      )).with("TWO_FACTOR_AUTH", () => i18n._(
        /*i18n*/
        {
          id: "CatCEu"
        }
      )).with("PASSWORD", () => i18n._(
        /*i18n*/
        {
          id: "WFA/1o"
        }
      )).with("PASSKEY", () => i18n._(
        /*i18n*/
        {
          id: "5H5E01"
        }
      )).with("EXPLICIT_NONE", () => i18n._(
        /*i18n*/
        {
          id: "O3oNi5"
        }
      )).with(void 0, () => null).exhaustive();
      if (!authLevel) {
        const accessAuthMethod = extractedAuthMethods.derivedRecipientAccessAuth.at(0);
        authLevel = match(accessAuthMethod).with("ACCOUNT", () => i18n._(
          /*i18n*/
          {
            id: "yn+h2a"
          }
        )).with("TWO_FACTOR_AUTH", () => i18n._(
          /*i18n*/
          {
            id: "C4pKXW"
          }
        )).with(void 0, () => i18n._(
          /*i18n*/
          {
            id: "O3oNi5"
          }
        )).exhaustive();
      }
      return {
        id: recipient.id,
        name: recipient.name,
        email: recipient.email,
        role: recipient.role,
        signingStatus: recipient.signingStatus,
        signatureField,
        rejectionReason: recipient.rejectionReason,
        authLevel,
        logs: {
          emailed: emailSent ?? null,
          sent: documentSent ?? null,
          opened: documentOpened ?? null,
          completed: documentRecipientCompleted ?? null,
          rejected: documentRecipientRejected ?? null
        }
      };
    }),
    envelopeOwner,
    envelopeId: envelope.id,
    qrToken: envelope.qrToken,
    hidePoweredBy: organisationClaim.flags.hidePoweredBy ?? false,
    pageWidth,
    pageHeight,
    i18n
  };
  const certificatePages = await renderCertificate(payload);
  return await PDF.merge(certificatePages);
};
const MIN_CERT_PAGE_WIDTH = 300;
const MIN_CERT_PAGE_HEIGHT = 300;
const getPageSize = (page) => {
  let mediaBox;
  let cropBox;
  try {
    mediaBox = page.getMediaBox();
  } catch {
  }
  try {
    cropBox = page.getCropBox();
  } catch {
  }
  if (mediaBox && cropBox) {
    if (mediaBox.width < cropBox.width || mediaBox.height < cropBox.height) {
      return mediaBox;
    }
    return cropBox;
  }
  return mediaBox || cropBox || PDF_SIZE_A4_72PPI;
};
const getLastPageDimensions = (pdfDoc) => {
  const lastPage = pdfDoc.getPage(pdfDoc.getPageCount() - 1);
  if (!lastPage) {
    return PDF_SIZE_A4_72PPI;
  }
  const width = Math.round(lastPage.width);
  const height = Math.round(lastPage.height);
  if (width < MIN_CERT_PAGE_WIDTH || height < MIN_CERT_PAGE_HEIGHT) {
    return PDF_SIZE_A4_72PPI;
  }
  return {
    width,
    height
  };
};
const setupTimestampAuthorities = once(() => {
  const timestampAuthority = NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY();
  if (!timestampAuthority) {
    return null;
  }
  const timestampAuthorities = timestampAuthority.trim().split(",").filter(Boolean).map((url) => {
    return new HttpTimestampAuthority(url);
  });
  return timestampAuthorities;
});
const getTimestampAuthority = () => {
  const authorities = setupTimestampAuthorities();
  if (!authorities) {
    return null;
  }
  return authorities[Math.floor(Math.random() * authorities.length)];
};
const loadCertificates = async () => {
  const chainContents = env("NEXT_PRIVATE_SIGNING_GCLOUD_HSM_CERT_CHAIN_CONTENTS");
  const chainFilePath = env("NEXT_PRIVATE_SIGNING_GCLOUD_HSM_CERT_CHAIN_FILE_PATH");
  if (chainContents) {
    return parsePem(Buffer.from(chainContents, "base64").toString("utf-8")).map((block) => block.der);
  }
  if (chainFilePath) {
    return parsePem(fs__default.readFileSync(chainFilePath).toString("utf-8")).map((block) => block.der);
  }
  const certContents = env("NEXT_PRIVATE_SIGNING_GCLOUD_HSM_PUBLIC_CRT_FILE_CONTENTS");
  const certFilePath = env("NEXT_PRIVATE_SIGNING_GCLOUD_HSM_PUBLIC_CRT_FILE_PATH");
  if (certContents) {
    return parsePem(Buffer.from(certContents, "base64").toString("utf-8")).map((block) => block.der);
  }
  if (certFilePath) {
    return parsePem(fs__default.readFileSync(certFilePath).toString("utf-8")).map((block) => block.der);
  }
  const certPath = env("NEXT_PRIVATE_SIGNING_GCLOUD_HSM_SECRET_MANAGER_CERT_PATH");
  if (certPath) {
    const {
      cert,
      chain
    } = await GoogleKmsSigner.getCertificateFromSecretManager(certPath);
    if (chain) {
      return [cert, ...chain];
    }
    return [cert];
  }
  throw new Error("No certificate found for Google Cloud HSM signing");
};
const createGoogleCloudSigner = async () => {
  const keyPath = env("NEXT_PRIVATE_SIGNING_GCLOUD_HSM_KEY_PATH");
  if (!keyPath) {
    throw new Error("No key path provided for Google Cloud HSM signing");
  }
  const googleAuthCredentials = env("GOOGLE_APPLICATION_CREDENTIALS");
  const googleAuthCredentialContents = env("NEXT_PRIVATE_SIGNING_GCLOUD_APPLICATION_CREDENTIALS_CONTENTS");
  if (googleAuthCredentials && googleAuthCredentialContents) {
    if (!fs__default.existsSync(googleAuthCredentials)) {
      const contents = new Uint8Array(Buffer.from(googleAuthCredentialContents, "base64"));
      fs__default.writeFileSync(googleAuthCredentials, contents);
    }
  }
  const certs = await loadCertificates();
  if (certs.length === 0) {
    throw new Error("No valid certificates found");
  }
  return GoogleKmsSigner.create({
    keyVersionName: keyPath,
    certificate: certs[0],
    certificateChain: certs.length > 1 ? certs.slice(1) : void 0,
    buildChain: true
  });
};
const loadP12 = () => {
  const localFileContents = env("NEXT_PRIVATE_SIGNING_LOCAL_FILE_CONTENTS");
  if (localFileContents) {
    return Buffer.from(localFileContents, "base64");
  }
  const localFilePath = env("NEXT_PRIVATE_SIGNING_LOCAL_FILE_PATH");
  if (localFilePath) {
    return fs.readFileSync(localFilePath);
  }
  if (env("NODE_ENV") !== "production") {
    return fs.readFileSync("./example/cert.p12");
  }
  throw new Error("No certificate found for local signing");
};
const createLocalSigner = async () => {
  const p12 = loadP12();
  return await P12Signer.create(p12, env("NEXT_PRIVATE_SIGNING_PASSPHRASE") || "", {
    buildChain: true
  });
};
let signer = null;
const getSigner = async () => {
  if (signer) {
    return signer;
  }
  const transport = env("NEXT_PRIVATE_SIGNING_TRANSPORT") || "local";
  signer = await match(transport).with("local", async () => await createLocalSigner()).with("gcloud-hsm", async () => await createGoogleCloudSigner()).otherwise(() => {
    throw new Error(`Unsupported signing transport: ${transport}`);
  });
  return signer;
};
const signPdf = async ({
  pdf
}) => {
  const signer2 = await getSigner();
  const tsa = getTimestampAuthority();
  const {
    bytes
  } = await pdf.sign({
    signer: signer2,
    reason: "Signed by Documenso",
    location: NEXT_PUBLIC_WEBAPP_URL(),
    contactInfo: NEXT_PUBLIC_SIGNING_CONTACT_INFO(),
    subFilter: NEXT_PRIVATE_USE_LEGACY_SIGNING_SUBFILTER() ? "adbe.pkcs7.detached" : "ETSI.CAdES.detached",
    timestampAuthority: tsa ?? void 0,
    longTermValidation: !!tsa,
    archivalTimestamp: !!tsa
  });
  return bytes;
};
const getAuditLogsPdf = async ({
  documentId,
  language
}) => {
  const {
    chromium
  } = await import("playwright");
  const encryptedId = encryptSecondaryData({
    data: documentId.toString(),
    expiresAt: DateTime.now().plus({
      minutes: 5
    }).toJSDate().valueOf()
  });
  let browser;
  const browserlessUrl = env("NEXT_PRIVATE_BROWSERLESS_URL");
  if (browserlessUrl) {
    browser = await chromium.connectOverCDP(browserlessUrl);
  } else {
    browser = await chromium.launch({
      executablePath: env("PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH") || void 0
    });
  }
  if (!browser) {
    throw new Error("Failed to establish a browser, please ensure you have either a Browserless.io url or chromium browser installed");
  }
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  const lang = isValidLanguageCode(language) ? language : "en";
  await page.context().addCookies([{
    name: "language",
    value: lang,
    url: USE_INTERNAL_URL_BROWSERLESS() ? NEXT_PUBLIC_WEBAPP_URL() : NEXT_PRIVATE_INTERNAL_WEBAPP_URL()
  }]);
  await page.goto(`${USE_INTERNAL_URL_BROWSERLESS() ? NEXT_PUBLIC_WEBAPP_URL() : NEXT_PRIVATE_INTERNAL_WEBAPP_URL()}/__htmltopdf/audit-log?d=${encryptedId}`, {
    waitUntil: "networkidle",
    timeout: 1e4
  });
  await page.reload({
    waitUntil: "networkidle",
    timeout: 1e4
  });
  await page.waitForSelector("h1", {
    state: "visible",
    timeout: 1e4
  });
  const result = await page.pdf({
    format: "A4",
    printBackground: true
  });
  await browserContext.close();
  void browser.close();
  return result;
};
const getCertificatePdf = async ({
  documentId,
  language
}) => {
  const {
    chromium
  } = await import("playwright");
  const encryptedId = encryptSecondaryData({
    data: documentId.toString(),
    expiresAt: DateTime.now().plus({
      minutes: 5
    }).toJSDate().valueOf()
  });
  let browser;
  const browserlessUrl = env("NEXT_PRIVATE_BROWSERLESS_URL");
  if (browserlessUrl) {
    browser = await chromium.connectOverCDP(browserlessUrl);
  } else {
    browser = await chromium.launch({
      executablePath: env("PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH") || void 0
    });
  }
  if (!browser) {
    throw new Error("Failed to establish a browser, please ensure you have either a Browserless.io url or chromium browser installed");
  }
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  const lang = isValidLanguageCode(language) ? language : "en";
  await page.context().addCookies([{
    name: "lang",
    value: lang,
    url: USE_INTERNAL_URL_BROWSERLESS() ? NEXT_PUBLIC_WEBAPP_URL() : NEXT_PRIVATE_INTERNAL_WEBAPP_URL()
  }]);
  await page.goto(`${USE_INTERNAL_URL_BROWSERLESS() ? NEXT_PUBLIC_WEBAPP_URL() : NEXT_PRIVATE_INTERNAL_WEBAPP_URL()}/__htmltopdf/certificate?d=${encryptedId}`, {
    waitUntil: "networkidle",
    timeout: 1e4
  });
  await page.reload({
    waitUntil: "networkidle",
    timeout: 1e4
  });
  await page.waitForSelector("h1", {
    state: "visible",
    timeout: 1e4
  });
  const result = await page.pdf({
    format: "A4",
    printBackground: true
  });
  await browserContext.close();
  void browser.close();
  return result;
};
const insertFieldInPDFV1 = async (pdf, field) => {
  const [fontCaveat, fontNoto] = await Promise.all([fetch(`${NEXT_PRIVATE_INTERNAL_WEBAPP_URL()}/fonts/caveat.ttf`).then(async (res) => res.arrayBuffer()), fetch(`${NEXT_PRIVATE_INTERNAL_WEBAPP_URL()}/fonts/noto-sans.ttf`).then(async (res) => res.arrayBuffer())]);
  const isSignatureField = isSignatureFieldType(field.type);
  const isDebugMode = (
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.DEBUG_PDF_INSERT === "1" || process.env.DEBUG_PDF_INSERT === "true"
  );
  pdf.registerFontkit(fontkit);
  const pages = pdf.getPages();
  const minFontSize = isSignatureField ? MIN_HANDWRITING_FONT_SIZE : MIN_STANDARD_FONT_SIZE;
  const maxFontSize = isSignatureField ? DEFAULT_HANDWRITING_FONT_SIZE : DEFAULT_STANDARD_FONT_SIZE;
  const page = pages.at(field.page - 1);
  if (!page) {
    throw new Error(`Page ${field.page} does not exist`);
  }
  const pageRotation = page.getRotation();
  let pageRotationInDegrees = match(pageRotation.type).with(RotationTypes.Degrees, () => pageRotation.angle).with(RotationTypes.Radians, () => radiansToDegrees(pageRotation.angle)).exhaustive();
  pageRotationInDegrees = Math.round(pageRotationInDegrees / 90) * 90;
  const isPageRotatedToLandscape = pageRotationInDegrees === 90 || pageRotationInDegrees === 270;
  let {
    width: pageWidth,
    height: pageHeight
  } = getPageSize(page);
  if (isPageRotatedToLandscape) {
    [pageWidth, pageHeight] = [pageHeight, pageWidth];
  }
  const fieldWidth = pageWidth * (Number(field.width) / 100);
  const fieldHeight = pageHeight * (Number(field.height) / 100);
  const fieldX = pageWidth * (Number(field.positionX) / 100);
  const fieldY = pageHeight * (Number(field.positionY) / 100);
  if (isDebugMode) {
    let debugX = fieldX;
    let debugY = pageHeight - fieldY - fieldHeight;
    if (pageRotationInDegrees !== 0) {
      const adjustedPosition = adjustPositionForRotation$1(pageWidth, pageHeight, debugX, debugY, pageRotationInDegrees);
      debugX = adjustedPosition.xPos;
      debugY = adjustedPosition.yPos;
    }
    page.drawRectangle({
      x: debugX,
      y: debugY,
      width: fieldWidth,
      height: fieldHeight,
      borderColor: rgb$1(1, 0, 0),
      // Red
      borderWidth: 1,
      rotate: degrees(pageRotationInDegrees)
    });
  }
  const font = await pdf.embedFont(isSignatureField ? fontCaveat : fontNoto, isSignatureField ? {
    features: {
      calt: false
    }
  } : void 0);
  if (field.type === FieldType.SIGNATURE || field.type === FieldType.FREE_SIGNATURE) {
    await pdf.embedFont(fontCaveat);
  }
  await match(field).with({
    type: P.union(FieldType.SIGNATURE, FieldType.FREE_SIGNATURE)
  }, async (field2) => {
    if (field2.signature?.signatureImageAsBase64) {
      const image = await pdf.embedPng(field2.signature?.signatureImageAsBase64 ?? "");
      let imageWidth = image.width;
      let imageHeight = image.height;
      const scalingFactor = Math.min(fieldWidth / imageWidth, fieldHeight / imageHeight, 1);
      imageWidth = imageWidth * scalingFactor;
      imageHeight = imageHeight * scalingFactor;
      let imageX = fieldX + (fieldWidth - imageWidth) / 2;
      let imageY = fieldY + (fieldHeight - imageHeight) / 2;
      imageY = pageHeight - imageY - imageHeight;
      if (pageRotationInDegrees !== 0) {
        const adjustedPosition = adjustPositionForRotation$1(pageWidth, pageHeight, imageX, imageY, pageRotationInDegrees);
        imageX = adjustedPosition.xPos;
        imageY = adjustedPosition.yPos;
      }
      page.drawImage(image, {
        x: imageX,
        y: imageY,
        width: imageWidth,
        height: imageHeight,
        rotate: degrees(pageRotationInDegrees)
      });
    } else {
      const signatureText = field2.signature?.typedSignature ?? "";
      const longestLineInTextForWidth = signatureText.split("\n").sort((a, b) => b.length - a.length)[0];
      let fontSize = maxFontSize;
      let textWidth = font.widthOfTextAtSize(longestLineInTextForWidth, fontSize);
      let textHeight = font.heightAtSize(fontSize);
      const scalingFactor = Math.min(fieldWidth / textWidth, fieldHeight / textHeight, 1);
      fontSize = Math.max(Math.min(fontSize * scalingFactor, maxFontSize), minFontSize);
      textWidth = font.widthOfTextAtSize(longestLineInTextForWidth, fontSize);
      textHeight = font.heightAtSize(fontSize);
      let textX = fieldX + (fieldWidth - textWidth) / 2;
      let textY = fieldY + (fieldHeight - textHeight) / 2;
      textY = pageHeight - textY - textHeight;
      if (pageRotationInDegrees !== 0) {
        const adjustedPosition = adjustPositionForRotation$1(pageWidth, pageHeight, textX, textY, pageRotationInDegrees);
        textX = adjustedPosition.xPos;
        textY = adjustedPosition.yPos;
      }
      page.drawText(signatureText, {
        x: textX,
        y: textY,
        size: fontSize,
        font,
        rotate: degrees(pageRotationInDegrees)
      });
    }
  }).with({
    type: FieldType.CHECKBOX
  }, (field2) => {
    const meta = ZCheckboxFieldMeta.safeParse(field2.fieldMeta);
    if (!meta.success) {
      console.error(meta.error);
      throw new Error("Invalid checkbox field meta");
    }
    const values = meta.data.values?.map((item) => ({
      ...item,
      value: item.value.length > 0 ? item.value : `empty-value-${item.id}`
    }));
    const selected = fromCheckboxValue(field2.customText);
    const direction = meta.data.direction ?? "vertical";
    const topPadding = 12;
    const leftCheckboxPadding = 8;
    const leftCheckboxLabelPadding = 12;
    const checkboxSpaceY = 13;
    if (direction === "horizontal") {
      let currentX = leftCheckboxPadding;
      let currentY = topPadding;
      const maxWidth = pageWidth - fieldX - leftCheckboxPadding * 2;
      for (const [index, item] of (values ?? []).entries()) {
        const checkbox = pdf.getForm().createCheckBox(`checkbox.${field2.secondaryId}.${index}`);
        if (selected.includes(item.value)) {
          checkbox.check();
        }
        const labelText = item.value.includes("empty-value-") ? "" : item.value;
        const labelWidth = font.widthOfTextAtSize(labelText, 12);
        const itemWidth = leftCheckboxLabelPadding + labelWidth + 16;
        if (currentX + itemWidth > maxWidth && index > 0) {
          currentX = leftCheckboxPadding;
          currentY += checkboxSpaceY;
        }
        page.drawText(labelText, {
          x: fieldX + currentX + leftCheckboxLabelPadding,
          y: pageHeight - (fieldY + currentY),
          size: 12,
          font,
          rotate: degrees(pageRotationInDegrees)
        });
        checkbox.addToPage(page, {
          x: fieldX + currentX,
          y: pageHeight - (fieldY + currentY),
          height: 8,
          width: 8
        });
        currentX += itemWidth;
      }
    } else {
      for (const [index, item] of (values ?? []).entries()) {
        const offsetY = index * checkboxSpaceY + topPadding;
        const checkbox = pdf.getForm().createCheckBox(`checkbox.${field2.secondaryId}.${index}`);
        if (selected.includes(item.value)) {
          checkbox.check();
        }
        page.drawText(item.value.includes("empty-value-") ? "" : item.value, {
          x: fieldX + leftCheckboxPadding + leftCheckboxLabelPadding,
          y: pageHeight - (fieldY + offsetY),
          size: 12,
          font,
          rotate: degrees(pageRotationInDegrees)
        });
        checkbox.addToPage(page, {
          x: fieldX + leftCheckboxPadding,
          y: pageHeight - (fieldY + offsetY),
          height: 8,
          width: 8
        });
      }
    }
  }).with({
    type: FieldType.RADIO
  }, (field2) => {
    const meta = ZRadioFieldMeta.safeParse(field2.fieldMeta);
    if (!meta.success) {
      console.error(meta.error);
      throw new Error("Invalid radio field meta");
    }
    const values = meta?.data.values?.map((item) => ({
      ...item,
      value: item.value.length > 0 ? item.value : `empty-value-${item.id}`
    }));
    const selected = field2.customText.split(",");
    const topPadding = 12;
    const leftRadioPadding = 8;
    const leftRadioLabelPadding = 12;
    const radioSpaceY = 13;
    for (const [index, item] of (values ?? []).entries()) {
      const offsetY = index * radioSpaceY + topPadding;
      const radio = pdf.getForm().createRadioGroup(`radio.${field2.secondaryId}.${index}`);
      page.drawText(item.value.includes("empty-value-") ? "" : item.value, {
        x: fieldX + leftRadioPadding + leftRadioLabelPadding,
        y: pageHeight - (fieldY + offsetY),
        size: 12,
        font,
        rotate: degrees(pageRotationInDegrees)
      });
      radio.addOptionToPage(item.value, page, {
        x: fieldX + leftRadioPadding,
        y: pageHeight - (fieldY + offsetY),
        height: 8,
        width: 8
      });
      if (selected.includes(item.value)) {
        radio.select(item.value);
      }
    }
  }).otherwise((field2) => {
    const fieldMetaParsers = {
      [FieldType.TEXT]: ZTextFieldMeta,
      [FieldType.NUMBER]: ZNumberFieldMeta,
      [FieldType.DATE]: ZDateFieldMeta,
      [FieldType.EMAIL]: ZEmailFieldMeta,
      [FieldType.NAME]: ZNameFieldMeta,
      [FieldType.INITIALS]: ZInitialsFieldMeta
    };
    const fieldMetaParser = fieldMetaParsers[field2.type];
    const meta = fieldMetaParser ? fieldMetaParser.safeParse(field2.fieldMeta) : null;
    const customFontSize = meta?.success && meta.data.fontSize ? meta.data.fontSize : null;
    const textAlign = meta?.success && meta.data.textAlign ? meta.data.textAlign : "left";
    let fontSize = customFontSize || maxFontSize;
    const textWidth = font.widthOfTextAtSize(field2.customText, fontSize);
    const textHeight = font.heightAtSize(fontSize);
    if (!customFontSize) {
      const scalingFactor = Math.min(fieldHeight / textHeight, 1);
      fontSize = Math.max(Math.min(fontSize * scalingFactor, maxFontSize), minFontSize);
    }
    const isMultiline = field2.type === FieldType.TEXT && (textWidth > fieldWidth || field2.customText.includes("\n"));
    const padding = 8;
    const textAlignmentOptions = getTextAlignmentOptions(textAlign, fieldX, isMultiline, padding);
    let textFieldBoxY = pageHeight - fieldY - fieldHeight;
    const textFieldBoxX = textAlignmentOptions.xPos;
    const textField = pdf.getForm().createTextField(`text.${field2.secondaryId}`);
    textField.setAlignment(textAlignmentOptions.textAlignment);
    let adjustedFieldWidth = fieldWidth - padding * 2;
    let adjustedFieldHeight = fieldHeight;
    let adjustedFieldX = textFieldBoxX;
    let adjustedFieldY = textFieldBoxY;
    let textToInsert = field2.customText;
    const pagePadding = 4;
    if (isMultiline) {
      textToInsert = breakLongString(textToInsert, adjustedFieldWidth, font, fontSize);
      textField.enableMultiline();
      textField.disableCombing();
      textField.disableScrolling();
      textFieldBoxY = pageHeight - fieldY - fieldHeight;
      const fieldYOffset = pageHeight - (fieldY + fieldHeight) - pagePadding;
      adjustedFieldHeight = fieldHeight + fieldYOffset;
      adjustedFieldY = adjustedFieldY - fieldYOffset;
    }
    if (!isMultiline) {
      if (textAlignmentOptions.textAlignment === TextAlignment.Left) {
        adjustedFieldWidth = pageWidth - textFieldBoxX - pagePadding;
      }
      if (textAlignmentOptions.textAlignment === TextAlignment.Right) {
        adjustedFieldWidth = textFieldBoxX + fieldWidth - pagePadding;
        adjustedFieldX = adjustedFieldX - adjustedFieldWidth + fieldWidth;
      }
      if (textAlignmentOptions.textAlignment === TextAlignment.Center) {
        const fieldMidpoint = textFieldBoxX + fieldWidth / 2;
        const isCloserToLeftEdge = fieldMidpoint < pageWidth / 2;
        if (isCloserToLeftEdge) {
          adjustedFieldWidth = (textFieldBoxX - pagePadding) * 2 + fieldWidth;
          adjustedFieldX = pagePadding;
        }
        if (!isCloserToLeftEdge) {
          adjustedFieldWidth = (pageWidth - textFieldBoxX - pagePadding - fieldWidth / 2) * 2;
          adjustedFieldX = pageWidth - adjustedFieldWidth - pagePadding;
        }
      }
    }
    if (pageRotationInDegrees !== 0) {
      const adjustedPosition = adjustPositionForRotation$1(pageWidth, pageHeight, adjustedFieldX, adjustedFieldY, pageRotationInDegrees);
      adjustedFieldX = adjustedPosition.xPos;
      adjustedFieldY = adjustedPosition.yPos;
    }
    setTextFieldFontSize(textField, font, fontSize);
    textField.setText(textToInsert);
    textField.addToPage(page, {
      x: adjustedFieldX,
      y: adjustedFieldY,
      width: adjustedFieldWidth,
      height: adjustedFieldHeight,
      rotate: degrees(pageRotationInDegrees),
      font,
      // Hide borders.
      borderWidth: 0,
      borderColor: void 0,
      backgroundColor: void 0,
      ...isDebugMode ? {
        borderWidth: 1,
        borderColor: rgb$1(0, 0, 1)
      } : {}
    });
  });
  return pdf;
};
const adjustPositionForRotation$1 = (pageWidth, pageHeight, xPos, yPos, pageRotationInDegrees) => {
  if (pageRotationInDegrees === 270) {
    xPos = pageWidth - xPos;
    [xPos, yPos] = [yPos, xPos];
  }
  if (pageRotationInDegrees === 90) {
    yPos = pageHeight - yPos;
    [xPos, yPos] = [yPos, xPos];
  }
  if (pageRotationInDegrees === 180) {
    xPos = pageWidth - xPos;
    yPos = pageHeight - yPos;
  }
  return {
    xPos,
    yPos
  };
};
const textAlignmentMap = {
  left: TextAlignment.Left,
  center: TextAlignment.Center,
  right: TextAlignment.Right
};
const getTextAlignmentOptions = (textAlign, fieldX, isMultiline, padding = 8) => {
  const textAlignment = textAlignmentMap[textAlign];
  if (isMultiline) {
    return {
      xPos: fieldX + padding,
      textAlignment
    };
  }
  return match(textAlign).with("left", () => ({
    xPos: fieldX + padding,
    textAlignment
  })).with("center", () => ({
    xPos: fieldX,
    textAlignment
  })).with("right", () => ({
    xPos: fieldX - padding,
    textAlignment
  })).exhaustive();
};
function breakLongString(text, maxWidth, font, fontSize) {
  if (!text) {
    return "";
  }
  const lines = [];
  for (const paragraph of text.split("\n")) {
    if (paragraph === "" || font.widthOfTextAtSize(paragraph, fontSize) <= maxWidth) {
      lines.push(paragraph);
      continue;
    }
    const words = paragraph.split(" ");
    let currentLine = "";
    for (const word of words) {
      const lineWithWord = currentLine.length === 0 ? word : `${currentLine} ${word}`;
      if (font.widthOfTextAtSize(lineWithWord, fontSize) <= maxWidth) {
        currentLine = lineWithWord;
      } else {
        if (currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = "";
        }
        if (font.widthOfTextAtSize(word, fontSize) <= maxWidth) {
          currentLine = word;
        } else {
          let charLine = "";
          for (const char of word) {
            const nextCharLine = charLine + char;
            if (font.widthOfTextAtSize(nextCharLine, fontSize) <= maxWidth) {
              charLine = nextCharLine;
            } else {
              lines.push(charLine);
              charLine = char;
            }
          }
          currentLine = charLine;
        }
      }
    }
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
  }
  return lines.join("\n");
}
const setTextFieldFontSize = (textField, font, fontSize) => {
  textField.defaultUpdateAppearances(font);
  textField.updateAppearances(font);
  try {
    textField.setFontSize(fontSize);
  } catch (err) {
    let da = textField.acroField.getDefaultAppearance() ?? "";
    da += `
 ${setFontAndSize(font.name, fontSize)}`;
    textField.acroField.setDefaultAppearance(da);
  }
  textField.defaultUpdateAppearances(font);
  textField.updateAppearances(font);
};
global.DOMMatrix = DOMMatrix;
global.Path2D = Path2D;
Path2D.prototype.toString = () => "[object Path2D]";
Konva$1.Util["createCanvasElement"] = () => {
  const node = new Canvas(300, 300);
  node.gpu = false;
  if (!("style" in node) || !node["style"]) {
    Object.assign(node, {
      style: {}
    });
  }
  node.toString = () => "[object HTMLCanvasElement]";
  const ctx = node.getContext("2d");
  Object.defineProperty(ctx, "canvas", {
    get: () => node
  });
  return node;
};
Konva$1.Util.createImageElement = () => {
  const node = new Image();
  node.toString = () => "[object HTMLImageElement]";
  return node;
};
Konva$1._renderBackend = "skia-canvas";
const insertFieldInPDFV2 = async ({
  pageWidth,
  pageHeight,
  fields
}) => {
  ensureFontLibrary();
  let stage = new Konva.Stage({
    width: pageWidth,
    height: pageHeight
  });
  let layer = new Konva.Layer();
  for (const field of fields) {
    renderField({
      scale: 1,
      field: {
        renderId: field.id.toString(),
        ...field,
        width: Number(field.width),
        height: Number(field.height),
        positionX: Number(field.positionX),
        positionY: Number(field.positionY)
      },
      translations: null,
      pageLayer: layer,
      pageWidth,
      pageHeight,
      mode: "export"
    });
  }
  stage.add(layer);
  const canvas = layer.canvas._canvas;
  const pdf = await canvas.toBuffer("pdf");
  stage.destroy();
  layer.destroy();
  stage = null;
  layer = null;
  return pdf;
};
const legacy_insertFieldInPDF = async (pdf, field) => {
  const [fontCaveat, fontNoto] = await Promise.all([fetch(`${NEXT_PRIVATE_INTERNAL_WEBAPP_URL()}/fonts/caveat.ttf`).then(async (res) => res.arrayBuffer()), fetch(`${NEXT_PRIVATE_INTERNAL_WEBAPP_URL()}/fonts/noto-sans.ttf`).then(async (res) => res.arrayBuffer())]);
  const isSignatureField = isSignatureFieldType(field.type);
  const isDebugMode = (
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.DEBUG_PDF_INSERT === "1" || process.env.DEBUG_PDF_INSERT === "true"
  );
  pdf.registerFontkit(fontkit);
  const pages = pdf.getPages();
  const minFontSize = isSignatureField ? MIN_HANDWRITING_FONT_SIZE : MIN_STANDARD_FONT_SIZE;
  const maxFontSize = isSignatureField ? DEFAULT_HANDWRITING_FONT_SIZE : DEFAULT_STANDARD_FONT_SIZE;
  const page = pages.at(field.page - 1);
  if (!page) {
    throw new Error(`Page ${field.page} does not exist`);
  }
  const pageRotation = page.getRotation();
  let pageRotationInDegrees = match(pageRotation.type).with(RotationTypes.Degrees, () => pageRotation.angle).with(RotationTypes.Radians, () => radiansToDegrees(pageRotation.angle)).exhaustive();
  pageRotationInDegrees = Math.round(pageRotationInDegrees / 90) * 90;
  const isPageRotatedToLandscape = pageRotationInDegrees === 90 || pageRotationInDegrees === 270;
  let {
    width: pageWidth,
    height: pageHeight
  } = getPageSize(page);
  if (isPageRotatedToLandscape) {
    [pageWidth, pageHeight] = [pageHeight, pageWidth];
  }
  const fieldWidth = pageWidth * (Number(field.width) / 100);
  const fieldHeight = pageHeight * (Number(field.height) / 100);
  const fieldX = pageWidth * (Number(field.positionX) / 100);
  const fieldY = pageHeight * (Number(field.positionY) / 100);
  if (isDebugMode) {
    let debugX = fieldX;
    let debugY = pageHeight - fieldY - fieldHeight;
    if (pageRotationInDegrees !== 0) {
      const adjustedPosition = adjustPositionForRotation(pageWidth, pageHeight, debugX, debugY, pageRotationInDegrees);
      debugX = adjustedPosition.xPos;
      debugY = adjustedPosition.yPos;
    }
    page.drawRectangle({
      x: debugX,
      y: debugY,
      width: fieldWidth,
      height: fieldHeight,
      borderColor: rgb$1(1, 0, 0),
      // Red
      borderWidth: 1,
      rotate: degrees(pageRotationInDegrees)
    });
  }
  const font = await pdf.embedFont(isSignatureField ? fontCaveat : fontNoto, isSignatureField ? {
    features: {
      calt: false
    }
  } : void 0);
  if (field.type === FieldType.SIGNATURE || field.type === FieldType.FREE_SIGNATURE) {
    await pdf.embedFont(fontCaveat);
  }
  await match(field).with({
    type: P.union(FieldType.SIGNATURE, FieldType.FREE_SIGNATURE)
  }, async (field2) => {
    if (field2.signature?.signatureImageAsBase64) {
      const image = await pdf.embedPng(field2.signature?.signatureImageAsBase64 ?? "");
      let imageWidth = image.width;
      let imageHeight = image.height;
      const scalingFactor = Math.min(fieldWidth / imageWidth, fieldHeight / imageHeight, 1);
      imageWidth = imageWidth * scalingFactor;
      imageHeight = imageHeight * scalingFactor;
      let imageX = fieldX + (fieldWidth - imageWidth) / 2;
      let imageY = fieldY + (fieldHeight - imageHeight) / 2;
      imageY = pageHeight - imageY - imageHeight;
      if (pageRotationInDegrees !== 0) {
        const adjustedPosition = adjustPositionForRotation(pageWidth, pageHeight, imageX, imageY, pageRotationInDegrees);
        imageX = adjustedPosition.xPos;
        imageY = adjustedPosition.yPos;
      }
      page.drawImage(image, {
        x: imageX,
        y: imageY,
        width: imageWidth,
        height: imageHeight,
        rotate: degrees(pageRotationInDegrees)
      });
    } else {
      const signatureText = field2.signature?.typedSignature ?? "";
      const longestLineInTextForWidth = signatureText.split("\n").sort((a, b) => b.length - a.length)[0];
      let fontSize = maxFontSize;
      let textWidth = font.widthOfTextAtSize(longestLineInTextForWidth, fontSize);
      let textHeight = font.heightAtSize(fontSize);
      const scalingFactor = Math.min(fieldWidth / textWidth, fieldHeight / textHeight, 1);
      fontSize = Math.max(Math.min(fontSize * scalingFactor, maxFontSize), minFontSize);
      textWidth = font.widthOfTextAtSize(longestLineInTextForWidth, fontSize);
      textHeight = font.heightAtSize(fontSize);
      let textX = fieldX + (fieldWidth - textWidth) / 2;
      let textY = fieldY + (fieldHeight - textHeight) / 2;
      textY = pageHeight - textY - textHeight;
      if (pageRotationInDegrees !== 0) {
        const adjustedPosition = adjustPositionForRotation(pageWidth, pageHeight, textX, textY, pageRotationInDegrees);
        textX = adjustedPosition.xPos;
        textY = adjustedPosition.yPos;
      }
      page.drawText(signatureText, {
        x: textX,
        y: textY,
        size: fontSize,
        font,
        rotate: degrees(pageRotationInDegrees)
      });
    }
  }).with({
    type: FieldType.CHECKBOX
  }, (field2) => {
    const meta = ZCheckboxFieldMeta.safeParse(field2.fieldMeta);
    if (!meta.success) {
      console.error(meta.error);
      throw new Error("Invalid checkbox field meta");
    }
    const values = meta.data.values?.map((item) => ({
      ...item,
      value: item.value.length > 0 ? item.value : `empty-value-${item.id}`
    }));
    const selected = fromCheckboxValue(field2.customText);
    for (const [index, item] of (values ?? []).entries()) {
      const offsetY = index * 16;
      const checkbox = pdf.getForm().createCheckBox(`checkbox.${field2.secondaryId}.${index}`);
      if (selected.includes(item.value)) {
        checkbox.check();
      }
      page.drawText(item.value.includes("empty-value-") ? "" : item.value, {
        x: fieldX + 16,
        y: pageHeight - (fieldY + offsetY),
        size: 12,
        font,
        rotate: degrees(pageRotationInDegrees)
      });
      checkbox.addToPage(page, {
        x: fieldX,
        y: pageHeight - (fieldY + offsetY),
        height: 8,
        width: 8
      });
    }
  }).with({
    type: FieldType.RADIO
  }, (field2) => {
    const meta = ZRadioFieldMeta.safeParse(field2.fieldMeta);
    if (!meta.success) {
      console.error(meta.error);
      throw new Error("Invalid radio field meta");
    }
    const values = meta?.data.values?.map((item) => ({
      ...item,
      value: item.value.length > 0 ? item.value : `empty-value-${item.id}`
    }));
    const selected = field2.customText.split(",");
    for (const [index, item] of (values ?? []).entries()) {
      const offsetY = index * 16;
      const radio = pdf.getForm().createRadioGroup(`radio.${field2.secondaryId}.${index}`);
      page.drawText(item.value.includes("empty-value-") ? "" : item.value, {
        x: fieldX + 16,
        y: pageHeight - (fieldY + offsetY),
        size: 12,
        font,
        rotate: degrees(pageRotationInDegrees)
      });
      radio.addOptionToPage(item.value, page, {
        x: fieldX,
        y: pageHeight - (fieldY + offsetY),
        height: 8,
        width: 8
      });
      if (selected.includes(item.value)) {
        radio.select(item.value);
      }
    }
  }).otherwise((field2) => {
    const fieldMetaParsers = {
      [FieldType.TEXT]: ZTextFieldMeta,
      [FieldType.NUMBER]: ZNumberFieldMeta,
      [FieldType.DATE]: ZDateFieldMeta,
      [FieldType.EMAIL]: ZEmailFieldMeta,
      [FieldType.NAME]: ZNameFieldMeta,
      [FieldType.INITIALS]: ZInitialsFieldMeta
    };
    const Parser = fieldMetaParsers[field2.type];
    const meta = Parser ? Parser.safeParse(field2.fieldMeta) : null;
    const customFontSize = meta?.success && meta.data.fontSize ? meta.data.fontSize : null;
    const textAlign = meta?.success && meta.data.textAlign ? meta.data.textAlign : "center";
    const longestLineInTextForWidth = field2.customText.split("\n").sort((a, b) => b.length - a.length)[0];
    let fontSize = customFontSize || maxFontSize;
    let textWidth = font.widthOfTextAtSize(longestLineInTextForWidth, fontSize);
    const textHeight = font.heightAtSize(fontSize);
    if (!customFontSize) {
      const scalingFactor = Math.min(fieldWidth / textWidth, fieldHeight / textHeight, 1);
      fontSize = Math.max(Math.min(fontSize * scalingFactor, maxFontSize), minFontSize);
    }
    textWidth = font.widthOfTextAtSize(longestLineInTextForWidth, fontSize);
    const padding = 8;
    let textX = fieldX + padding;
    if (textAlign === "center") {
      textX = fieldX + (fieldWidth - textWidth) / 2;
    } else if (textAlign === "right") {
      textX = fieldX + fieldWidth - textWidth - padding;
    }
    let textY = fieldY + (fieldHeight - textHeight) / 2;
    textY = pageHeight - textY - textHeight;
    if (pageRotationInDegrees !== 0) {
      const adjustedPosition = adjustPositionForRotation(pageWidth, pageHeight, textX, textY, pageRotationInDegrees);
      textX = adjustedPosition.xPos;
      textY = adjustedPosition.yPos;
    }
    page.drawText(field2.customText, {
      x: textX,
      y: textY,
      size: fontSize,
      font,
      rotate: degrees(pageRotationInDegrees)
    });
  });
  return pdf;
};
const adjustPositionForRotation = (pageWidth, pageHeight, xPos, yPos, pageRotationInDegrees) => {
  if (pageRotationInDegrees === 270) {
    xPos = pageWidth - xPos;
    [xPos, yPos] = [yPos, xPos];
  }
  if (pageRotationInDegrees === 90) {
    yPos = pageHeight - yPos;
    [xPos, yPos] = [yPos, xPos];
  }
  if (pageRotationInDegrees === 180) {
    xPos = pageWidth - xPos;
    yPos = pageHeight - yPos;
  }
  return {
    xPos,
    yPos
  };
};
const run = async ({
  payload,
  io
}) => {
  const {
    documentId,
    sendEmail = true,
    isResealing = false,
    requestMetadata
  } = payload;
  const {
    envelopeId,
    envelopeStatus,
    isRejected
  } = await io.runTask("seal-document", async () => {
    const envelope = await prismaWithReplicas.envelope.findFirstOrThrow({
      where: {
        type: EnvelopeType.DOCUMENT,
        secondaryId: mapDocumentIdToSecondaryId(documentId)
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        documentMeta: true,
        recipients: true,
        fields: {
          include: {
            signature: true
          }
        },
        envelopeItems: {
          include: {
            documentData: true,
            field: {
              include: {
                signature: true
              }
            }
          }
        }
      }
    });
    if (envelope.envelopeItems.length === 0) {
      throw new Error("At least one envelope item required");
    }
    const settings = await getTeamSettings({
      userId: envelope.userId,
      teamId: envelope.teamId
    });
    await prismaWithReplicas.recipient.updateMany({
      where: {
        envelopeId: envelope.id,
        role: RecipientRole.CC
      },
      data: {
        signingStatus: SigningStatus.SIGNED
      }
    });
    const isComplete = envelope.recipients.some((recipient) => recipient.signingStatus === SigningStatus.REJECTED) || envelope.recipients.every((recipient) => recipient.signingStatus === SigningStatus.SIGNED || recipient.role === RecipientRole.CC);
    if (!isComplete) {
      throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
        message: "Document is not complete"
      });
    }
    let {
      envelopeItems
    } = envelope;
    const fields = envelope.fields;
    if (envelopeItems.length < 1) {
      throw new Error(`Document ${envelope.id} has no envelope items`);
    }
    const recipientsWithoutCCers = envelope.recipients.filter((recipient) => recipient.role !== RecipientRole.CC);
    const rejectedRecipient = recipientsWithoutCCers.find((recipient) => recipient.signingStatus === SigningStatus.REJECTED);
    const isRejected2 = Boolean(rejectedRecipient);
    const rejectionReason = rejectedRecipient?.rejectionReason ?? "";
    if (!isRejected2 && fieldsContainUnsignedRequiredField(fields)) {
      throw new Error(`Document ${envelope.id} has unsigned required fields`);
    }
    if (isResealing) {
      envelopeItems = envelopeItems.map((envelopeItem) => ({
        ...envelopeItem,
        documentData: {
          ...envelopeItem.documentData,
          data: envelopeItem.documentData.initialData
        }
      }));
    }
    if (!envelope.qrToken) {
      await prismaWithReplicas.envelope.update({
        where: {
          id: envelope.id
        },
        data: {
          qrToken: prefixedId("qr")
        }
      });
    }
    const envelopeCompletedAuditLog = createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_COMPLETED,
      envelopeId: envelope.id,
      requestMetadata,
      user: null,
      data: {
        transactionId: nanoid(),
        ...isRejected2 ? {
          isRejected: true,
          rejectionReason
        } : {}
      }
    });
    const finalEnvelopeStatus = isRejected2 ? DocumentStatus.REJECTED : DocumentStatus.COMPLETED;
    if (isTspEnvelope(envelope)) {
      if (isResealing) {
        throw new AppError(AppErrorCode.NOT_SETUP, {
          message: "Re-sealing TSP envelopes is not supported — recipient signatures cannot be regenerated externally."
        });
      }
      if (isRejected2) {
        throw new AppError(AppErrorCode.NOT_SETUP, {
          message: "TSP envelope rejection is not supported in V1 — rejection stamps would invalidate PAdES signatures."
        });
      }
      await finalizeTspEnvelopeCompletion({
        envelope,
        envelopeCompletedAuditLog
      });
      return {
        envelopeId: envelope.id,
        envelopeStatus: envelope.status,
        isRejected: isRejected2
      };
    }
    const prefetchedItems = await Promise.all(envelopeItems.map(async (envelopeItem) => {
      const pdfData = await getFileServerSide(envelopeItem.documentData);
      return {
        envelopeItem,
        pdfData
      };
    }));
    const usePlaywrightPdf = NEXT_PRIVATE_USE_PLAYWRIGHT_PDF();
    const needsCertificate = settings.includeSigningCertificate;
    const needsAuditLog = settings.includeAuditLog;
    const newDocumentData = [];
    for (const {
      envelopeItem,
      pdfData
    } of prefetchedItems) {
      const envelopeItemFields = envelope.envelopeItems.find((item) => item.id === envelopeItem.id)?.field;
      if (!envelopeItemFields) {
        throw new Error(`Envelope item fields not found for envelope item ${envelopeItem.id}`);
      }
      let certificateDoc = null;
      let auditLogDoc = null;
      if (needsCertificate || needsAuditLog) {
        const pdfDoc = await PDF.load(pdfData);
        const {
          width: pageWidth,
          height: pageHeight
        } = getLastPageDimensions(pdfDoc);
        const additionalAuditLogs = [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          {
            ...envelopeCompletedAuditLog,
            id: "",
            createdAt: /* @__PURE__ */ new Date()
          }
        ];
        const certificatePayload = {
          envelope: {
            ...envelope,
            status: finalEnvelopeStatus
          },
          recipients: envelope.recipients,
          fields,
          language: envelope.documentMeta.language,
          envelopeOwner: {
            email: envelope.user.email,
            name: envelope.user.name || ""
          },
          envelopeItems: envelopeItems.map((item) => item.title),
          pageWidth,
          pageHeight,
          additionalAuditLogs
        };
        const makeCertificatePdf = async () => usePlaywrightPdf ? getCertificatePdf({
          documentId,
          language: envelope.documentMeta.language
        }).then(async (buffer) => PDF.load(buffer)) : generateCertificatePdf(certificatePayload);
        const makeAuditLogPdf = async () => usePlaywrightPdf ? getAuditLogsPdf({
          documentId,
          language: envelope.documentMeta.language
        }).then(async (buffer) => PDF.load(buffer)) : generateAuditLogPdf(certificatePayload);
        [certificateDoc, auditLogDoc] = await Promise.all([needsCertificate ? makeCertificatePdf() : null, needsAuditLog ? makeAuditLogPdf() : null]);
      }
      const result = await decorateAndSignPdf({
        envelope,
        envelopeItem,
        envelopeItemFields,
        isRejected: isRejected2,
        rejectionReason,
        pdfData,
        certificateDoc,
        auditLogDoc
      });
      newDocumentData.push(result);
    }
    await prismaWithReplicas.$transaction(async (tx) => {
      for (const {
        oldDocumentDataId,
        newDocumentDataId
      } of newDocumentData) {
        await tx.envelopeItem.update({
          where: {
            envelopeId: envelope.id,
            documentDataId: oldDocumentDataId
          },
          data: {
            documentDataId: newDocumentDataId
          }
        });
      }
      await tx.envelope.update({
        where: {
          id: envelope.id
        },
        data: {
          status: finalEnvelopeStatus,
          completedAt: /* @__PURE__ */ new Date()
        }
      });
      await tx.documentAuditLog.create({
        data: envelopeCompletedAuditLog
      });
    });
    return {
      envelopeId: envelope.id,
      envelopeStatus: envelope.status,
      isRejected: isRejected2
    };
  });
  const updatedEnvelope = await prismaWithReplicas.envelope.findFirstOrThrow({
    where: {
      id: envelopeId
    },
    include: {
      documentMeta: true,
      recipients: true
    }
  });
  await triggerWebhook({
    event: isRejected ? WebhookTriggerEvents.DOCUMENT_REJECTED : WebhookTriggerEvents.DOCUMENT_COMPLETED,
    data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(updatedEnvelope)),
    userId: updatedEnvelope.userId,
    teamId: updatedEnvelope.teamId ?? void 0
  });
  let shouldSendCompletedEmail = sendEmail && !isResealing && !isRejected;
  if (isResealing && !isDocumentCompleted(envelopeStatus)) {
    shouldSendCompletedEmail = sendEmail;
  }
  if (shouldSendCompletedEmail) {
    await jobs.triggerJob({
      name: "send.document.completed.emails",
      payload: {
        envelopeId,
        requestMetadata
      }
    });
  }
};
const decorateAndSignPdf = async ({
  envelope,
  envelopeItem,
  envelopeItemFields,
  isRejected,
  rejectionReason,
  pdfData,
  certificateDoc,
  auditLogDoc
}) => {
  let pdfDoc = await PDF.load(pdfData);
  pdfDoc.flattenAll();
  pdfDoc.upgradeVersion("1.7");
  if (isRejected) {
    await addRejectionStampToPdf(pdfDoc);
  }
  if (certificateDoc) {
    await pdfDoc.copyPagesFrom(certificateDoc, Array.from({
      length: certificateDoc.getPageCount()
    }, (_, index) => index));
  }
  if (auditLogDoc) {
    await pdfDoc.copyPagesFrom(auditLogDoc, Array.from({
      length: auditLogDoc.getPageCount()
    }, (_, index) => index));
  }
  if (envelope.internalVersion === 1) {
    const legacy_pdfLibDoc = await PDFDocument.load(await pdfDoc.save({
      useXRefStream: true
    }));
    for (const field of envelopeItemFields) {
      if (field.inserted) {
        if (envelope.useLegacyFieldInsertion) {
          await legacy_insertFieldInPDF(legacy_pdfLibDoc, field);
        } else {
          await insertFieldInPDFV1(legacy_pdfLibDoc, field);
        }
      }
    }
    legacy_pdfLibDoc.getForm().flatten();
    await pdfDoc.reload(await legacy_pdfLibDoc.save());
  }
  if (envelope.internalVersion === 2) {
    const fieldsGroupedByPage = groupBy(envelopeItemFields, (field) => field.page);
    for (const [pageNumber, fields] of Object.entries(fieldsGroupedByPage)) {
      const page = pdfDoc.getPage(Number(pageNumber) - 1);
      if (!page) {
        throw new Error(`Page ${pageNumber} does not exist`);
      }
      const pageWidth = page.width;
      const pageHeight = page.height;
      const overlayBytes = await insertFieldInPDFV2({
        pageWidth,
        pageHeight,
        fields
      });
      const overlayPdf = await PDF.load(overlayBytes);
      const embeddedPage = await pdfDoc.embedPage(overlayPdf, 0);
      let translateX = 0;
      let translateY = 0;
      switch (page.rotation) {
        case 90:
          translateX = pageHeight;
          translateY = 0;
          break;
        case 180:
          translateX = pageWidth;
          translateY = pageHeight;
          break;
        case 270:
          translateX = 0;
          translateY = pageWidth;
          break;
      }
      page.drawPage(embeddedPage, {
        x: translateX,
        y: translateY,
        rotate: {
          angle: page.rotation
        }
      });
    }
  }
  pdfDoc.flattenAll();
  pdfDoc = await PDF.load(await pdfDoc.save({
    useXRefStream: true
  }));
  const pdfBytes = await signPdf({
    pdf: pdfDoc
  });
  const {
    name
  } = path.parse(envelopeItem.title);
  const suffix = isRejected ? "_rejected.pdf" : "_signed.pdf";
  const {
    documentData: newDocumentData
  } = await putPdfFileServerSide({
    name: `${name}${suffix}`,
    type: "application/pdf",
    arrayBuffer: async () => Promise.resolve(pdfBytes)
  }, envelopeItem.documentData.initialData);
  return {
    oldDocumentDataId: envelopeItem.documentData.id,
    newDocumentDataId: newDocumentData.id
  };
};
export {
  run
};
