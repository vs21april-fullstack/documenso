import { lookup } from "node:dns/promises";
import { z } from "zod";
import { al as isPrivateUrl, v as AppError, w as AppErrorCode, p as prismaWithReplicas } from "./server-build-Mh3_cFus.js";
import { WebhookCallStatus } from "@prisma/client";
import "react/jsx-runtime";
import "node:stream";
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
const withTimeout = async (promise, timeoutMs) => await Promise.race([promise, new Promise((resolve) => {
  setTimeout(() => resolve(null), timeoutMs);
})]);
const fetchWithTimeout = async (input, init) => {
  const {
    timeoutMs,
    ...fetchInit
  } = init;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, {
      ...fetchInit,
      signal: controller.signal
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};
const ZIpSchema = z.string().ip();
const WEBHOOK_DNS_LOOKUP_TIMEOUT_MS = 250;
const normalizeHostname = (hostname) => hostname.toLowerCase().replace(/\.+$/, "");
const toAddressUrl = (address) => address.includes(":") ? `http://[${address}]` : `http://${address}`;
const webhookSSRFBypassHosts = () => {
  const raw = process.env["NEXT_PRIVATE_WEBHOOK_SSRF_BYPASS_HOSTS"] ?? "";
  const hosts = /* @__PURE__ */ new Set();
  for (const entry of raw.split(",")) {
    const trimmed = entry.trim().toLowerCase();
    if (trimmed.length > 0) {
      hosts.add(trimmed);
    }
  }
  return hosts;
};
const WEBHOOK_SSRF_BYPASS_HOSTS = webhookSSRFBypassHosts();
const isBypassedHost = (url) => {
  if (WEBHOOK_SSRF_BYPASS_HOSTS.size === 0) {
    return false;
  }
  try {
    const hostname = normalizeHostname(new URL(url).hostname);
    return WEBHOOK_SSRF_BYPASS_HOSTS.has(hostname);
  } catch {
    return false;
  }
};
const assertNotPrivateUrl = async (url, options) => {
  if (isBypassedHost(url)) {
    return;
  }
  if (isPrivateUrl(url)) {
    throw new AppError(AppErrorCode.WEBHOOK_INVALID_REQUEST, {
      message: "Webhook URL resolves to a private or loopback address"
    });
  }
  try {
    const hostname = normalizeHostname(new URL(url).hostname);
    if (hostname.length === 0 || ZIpSchema.safeParse(hostname).success) {
      return;
    }
    const resolveHostname = options?.lookup ?? lookup;
    const lookupResult = await withTimeout(resolveHostname(hostname, {
      all: true,
      verbatim: true
    }), WEBHOOK_DNS_LOOKUP_TIMEOUT_MS);
    if (!lookupResult) {
      return;
    }
    const addresses = Array.isArray(lookupResult) ? lookupResult : [lookupResult];
    if (addresses.some(({
      address
    }) => isPrivateUrl(toAddressUrl(address)))) {
      throw new AppError(AppErrorCode.WEBHOOK_INVALID_REQUEST, {
        message: "Webhook URL resolves to a private or loopback address"
      });
    }
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    return;
  }
};
const WEBHOOK_TIMEOUT_MS = 1e4;
const parseBody = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};
const executeWebhookCall = async (options) => {
  const {
    url,
    body,
    secret
  } = options;
  try {
    await assertNotPrivateUrl(url);
    const response = await fetchWithTimeout(url, {
      method: "POST",
      body: JSON.stringify(body),
      redirect: "manual",
      timeoutMs: WEBHOOK_TIMEOUT_MS,
      headers: {
        "Content-Type": "application/json",
        "X-Documenso-Secret": secret ?? ""
      }
    });
    const text = await response.text();
    return {
      success: response.ok,
      responseCode: response.status,
      responseBody: parseBody(text),
      responseHeaders: Object.fromEntries(response.headers.entries())
    };
  } catch (err) {
    return {
      success: false,
      responseCode: 0,
      responseBody: err instanceof Error ? err.message : "Unknown error",
      responseHeaders: {}
    };
  }
};
const run = async ({
  payload,
  io: _io
}) => {
  const {
    event,
    webhookId,
    data
  } = payload;
  const webhook = await prismaWithReplicas.webhook.findUniqueOrThrow({
    where: {
      id: webhookId
    }
  });
  const {
    webhookUrl: url,
    secret
  } = webhook;
  const payloadData = {
    event,
    payload: data,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    webhookEndpoint: url
  };
  const result = await executeWebhookCall({
    url,
    body: payloadData,
    secret
  });
  await prismaWithReplicas.webhookCall.create({
    data: {
      url,
      event,
      status: result.success ? WebhookCallStatus.SUCCESS : WebhookCallStatus.FAILED,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      requestBody: payloadData,
      responseCode: result.responseCode,
      responseBody: result.responseBody,
      responseHeaders: result.responseHeaders,
      webhookId: webhook.id
    }
  });
  if (!result.success) {
    throw new Error(`Webhook execution failed with status ${result.responseCode}`);
  }
  return {
    success: true,
    status: result.responseCode
  };
};
export {
  run
};
