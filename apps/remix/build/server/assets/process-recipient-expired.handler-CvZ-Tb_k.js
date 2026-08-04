import { SigningStatus, WebhookTriggerEvents } from '@prisma/client';
import {
  l as createDocumentAuditLogData,
  m as DOCUMENT_AUDIT_LOG_TYPE,
  L as jobs,
  af as mapEnvelopeToWebhookDocumentPayload,
  p as prismaWithReplicas,
  ad as triggerWebhook,
  ae as ZWebhookDocumentSchema,
} from './server-build-9dGanYtW.js';
import 'react/jsx-runtime';
import 'node:stream';
import 'zod';
import '@lingui/core';
import 'ts-pattern';
import '@lingui/react';
import '@react-router/node';
import 'isbot';
import 'react-dom/server';
import 'react-router';
import '@prisma/extension-read-replicas';
import 'kysely';
import 'prisma-extension-kysely';
import '@oslojs/crypto/sha2';
import '@oslojs/encoding';
import 'mailchecker';
import 'hono/cookie';
import 'hono/client';
import 'superjson';
import '@trpc/client';
import 'react';
import '@tanstack/react-query';
import '@trpc/react-query';
import '@vvo/tzdb';
import 'luxon';
import '@node-rs/bcrypt';
import 'crypto';
import 'node:module';
import 'node:path';
import '@bull-board/api';
import '@bull-board/api/bullMQAdapter';
import '@bull-board/hono';
import '@hono/node-server/serve-static';
import '@noble/hashes/sha2';
import 'bullmq';
import 'hono';
import 'ioredis';
import 'inngest';
import 'inngest/hono';
import 'cron-parser';
import '@noble/ciphers/chacha';
import '@noble/ciphers/utils';
import '@noble/ciphers/webcrypto';
import 'nanoid';
import 'pino';
import '@trpc/server';
import '@radix-ui/react-toast';
import 'class-variance-authority';
import 'lucide-react';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-tooltip';
import 'nuqs/adapters/react-router/v7';
import 'remix-themes';
import '@radix-ui/react-slot';
import 'framer-motion';
import 'cmdk';
import '@radix-ui/react-dialog';
import 'react-hotkeys-hook';
import '@radix-ui/react-avatar';
import '@radix-ui/react-dropdown-menu';
import 'node:fs/promises';
import '@radix-ui/react-checkbox';
import 'react-hook-form';
import '@radix-ui/react-label';
import '@radix-ui/react-select';
import '@hookform/resolvers/zod';
import '@tanstack/react-table';
import '@scure/base';
import '@radix-ui/react-popover';
import '@radix-ui/react-accordion';
import 'ua-parser-js';
import '@radix-ui/react-alert-dialog';
import '@radix-ui/react-radio-group';
import '@radix-ui/react-progress';
import '@radix-ui/react-switch';
import 'react-colorful';
import 'recharts';
import '@radix-ui/react-hover-card';
import '@radix-ui/react-scroll-area';
import 'react-icons/fa6';
import '@radix-ui/react-tabs';
import 'prop-types';
import 'file-selector';
import 'attr-accept';
import 'papaparse';
import 'zod-form-data';
import 'react-call';
import 'perfect-freehand';
import 'input-otp';
import 'react-dom';
import 'uqr';
import '@simplewebauthn/browser';
import 'remeda';
import 'colord';
import 'konva';
import '@radix-ui/react-separator';
import '@hello-pangea/dnd';
import 'react-rnd';
import 'nuqs';
import '@azure/storage-blob';
import '@sindresorhus/slugify';
import '@aws-sdk/client-s3';
import '@libpdf/core';
import '@noble/hashes/legacy';
import '@simplewebauthn/server';
import '@simplewebauthn/server/helpers';
import 'oslo/otp';
import 'hono/utils/cookie';
import 'hono/context-storage';
import '@marsidev/react-turnstile';
import 'react-icons/fc';
import 'sharp';
import 'satori';
import 'node:fs';
import 'stripe';
import 'jose';
const run = async ({ payload, io }) => {
  const { recipientId } = payload;
  const claimedCount = await io.runTask('claim-recipient', async () => {
    const result = await prismaWithReplicas.recipient.updateMany({
      where: {
        id: recipientId,
        expirationNotifiedAt: null,
        signingStatus: {
          notIn: [SigningStatus.SIGNED, SigningStatus.REJECTED],
        },
      },
      data: {
        expirationNotifiedAt: /* @__PURE__ */ new Date(),
      },
    });
    return result.count;
  });
  if (claimedCount === 0) {
    io.logger.info(`Recipient ${recipientId} already processed or no longer eligible, skipping`);
    return;
  }
  const recipient = await prismaWithReplicas.recipient.findUniqueOrThrow({
    where: {
      id: recipientId,
    },
    include: {
      envelope: {
        include: {
          recipients: true,
          documentMeta: true,
        },
      },
    },
  });
  const { envelope } = recipient;
  io.logger.info(`Recipient ${recipientId} (${recipient.email}) expired on envelope ${recipient.envelopeId}`);
  await io.runTask('create-audit-log', async () => {
    await prismaWithReplicas.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_EXPIRED,
        envelopeId: recipient.envelopeId,
        data: {
          recipientEmail: recipient.email,
          recipientName: recipient.name,
          recipientId: recipient.id,
        },
      }),
    });
  });
  await triggerWebhook({
    event: WebhookTriggerEvents.RECIPIENT_EXPIRED,
    data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(envelope)),
    userId: envelope.userId,
    teamId: envelope.teamId,
  });
  await jobs.triggerJob({
    name: 'send.owner.recipient.expired.email',
    payload: {
      recipientId: recipient.id,
      envelopeId: recipient.envelopeId,
    },
  });
};

export { run };
