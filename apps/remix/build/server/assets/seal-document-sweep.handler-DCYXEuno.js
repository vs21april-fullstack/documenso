import { p as prismaWithReplicas, aW as mapSecondaryIdToDocumentId, J as jobs } from "./server-build-Iwbpv6Jl.js";
import { EnvelopeType, DocumentStatus, SigningStatus, RecipientRole } from "@prisma/client";
import { DateTime } from "luxon";
import "react/jsx-runtime";
import "node:stream";
import "zod";
import "@lingui/core";
import "ts-pattern";
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
const run = async ({
  io
}) => {
  const now = DateTime.now();
  const fifteenMinutesAgo = now.minus({
    minutes: 15
  }).toJSDate();
  const sixHoursAgo = now.minus({
    hours: 6
  }).toJSDate();
  const candidates = await prismaWithReplicas.envelope.findMany({
    where: {
      status: DocumentStatus.PENDING,
      type: EnvelopeType.DOCUMENT,
      deletedAt: null,
      recipients: {
        some: {
          signedAt: {
            gt: sixHoursAgo
          }
        }
      }
    },
    select: {
      id: true,
      secondaryId: true,
      recipients: {
        select: {
          role: true,
          signedAt: true,
          signingStatus: true
        }
      }
    },
    take: 500
  });
  const unsealedEnvelopes = candidates.filter(({
    recipients
  }) => {
    const isReadyToSeal = recipients.every((recipient) => recipient.signingStatus === SigningStatus.SIGNED || recipient.role === RecipientRole.CC) || recipients.some((recipient) => recipient.signingStatus === SigningStatus.REJECTED);
    const hasRecentActivity = recipients.some((recipient) => recipient.signedAt !== null && recipient.signedAt > fifteenMinutesAgo);
    return isReadyToSeal && !hasRecentActivity;
  }).slice(0, 100);
  if (unsealedEnvelopes.length === 0) {
    io.logger.info("No unsealed documents found");
    return;
  }
  io.logger.info(`Found ${unsealedEnvelopes.length} unsealed documents`);
  await Promise.allSettled(unsealedEnvelopes.map(async (envelope) => {
    const documentId = mapSecondaryIdToDocumentId(envelope.secondaryId);
    io.logger.info(`Triggering seal for document ${documentId} (${envelope.id})`);
    await jobs.triggerJob({
      name: "internal.seal-document",
      payload: {
        documentId,
        isResealing: true
      }
    });
  }));
};
export {
  run
};
