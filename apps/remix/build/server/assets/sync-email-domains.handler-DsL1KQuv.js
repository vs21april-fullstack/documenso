import {
  CreateEmailIdentityCommand,
  DeleteEmailIdentityCommand,
  GetEmailIdentityCommand,
  SESv2Client,
} from '@aws-sdk/client-sesv2';
import { EmailDomainStatus } from '@prisma/client';
import { DateTime } from 'luxon';
import {
  x as AppError,
  y as AppErrorCode,
  a$ as DOCUMENSO_ENCRYPTION_KEY,
  n as env,
  p as prismaWithReplicas,
  v as symmetricDecrypt,
} from './server-build-Cc4Fq8d1.js';
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
const getSesClient = () => {
  const accessKeyId = env('NEXT_PRIVATE_SES_ACCESS_KEY_ID');
  const secretAccessKey = env('NEXT_PRIVATE_SES_SECRET_ACCESS_KEY');
  const region = env('NEXT_PRIVATE_SES_REGION');
  if (!accessKeyId || !secretAccessKey || !region) {
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Missing AWS SES credentials',
    });
  }
  return new SESv2Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};
async function verifyDomainWithDKIM(domain, selector, privateKey) {
  const command = new CreateEmailIdentityCommand({
    EmailIdentity: domain,
    DkimSigningAttributes: {
      DomainSigningSelector: selector,
      DomainSigningPrivateKey: privateKey,
    },
  });
  return await getSesClient().send(command);
}
const reregisterEmailDomain = async ({ emailDomainId }) => {
  const encryptionKey = DOCUMENSO_ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error('Missing DOCUMENSO_ENCRYPTION_KEY');
  }
  const emailDomain = await prismaWithReplicas.emailDomain.findUnique({
    where: {
      id: emailDomainId,
    },
  });
  if (!emailDomain) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Email domain not found',
    });
  }
  const sesClient = getSesClient();
  await sesClient
    .send(
      new DeleteEmailIdentityCommand({
        EmailIdentity: emailDomain.domain,
      }),
    )
    .catch((err) => {
      if (err.name === 'NotFoundException') {
        return;
      }
      throw err;
    });
  const decryptedPrivateKeyBytes = symmetricDecrypt({
    key: encryptionKey,
    data: emailDomain.privateKey,
  });
  const decryptedPrivateKey = new TextDecoder().decode(decryptedPrivateKeyBytes);
  const selectorParts = emailDomain.selector.split('._domainkey.');
  const selector = selectorParts[0];
  if (!selector) {
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Could not extract selector from email domain record',
    });
  }
  await verifyDomainWithDKIM(emailDomain.domain, selector, decryptedPrivateKey);
  const updatedEmailDomain = await prismaWithReplicas.emailDomain.update({
    where: {
      id: emailDomainId,
    },
    data: {
      status: EmailDomainStatus.PENDING,
      lastVerifiedAt: /* @__PURE__ */ new Date(),
    },
  });
  return updatedEmailDomain;
};
const verifyEmailDomain = async (emailDomainId) => {
  const emailDomain = await prismaWithReplicas.emailDomain.findUnique({
    where: {
      id: emailDomainId,
    },
  });
  if (!emailDomain) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Email domain not found',
    });
  }
  const sesClient = getSesClient();
  const response = await sesClient.send(
    new GetEmailIdentityCommand({
      EmailIdentity: emailDomain.domain,
    }),
  );
  const isVerified = response.VerificationStatus === 'SUCCESS';
  const updatedEmailDomain = await prismaWithReplicas.emailDomain.update({
    where: {
      id: emailDomainId,
    },
    data: {
      status: isVerified ? EmailDomainStatus.ACTIVE : EmailDomainStatus.PENDING,
      lastVerifiedAt: /* @__PURE__ */ new Date(),
    },
  });
  return {
    emailDomain: updatedEmailDomain,
    isVerified,
  };
};
const BATCH_SIZE = 10;
const AUTO_REREGISTER_AFTER_HOURS = 48;
const run = async ({ io }) => {
  const pendingDomains = await prismaWithReplicas.emailDomain.findMany({
    where: {
      status: 'PENDING',
    },
    select: {
      id: true,
      domain: true,
      createdAt: true,
      lastVerifiedAt: true,
    },
    orderBy: {
      lastVerifiedAt: {
        sort: 'asc',
        nulls: 'first',
      },
    },
  });
  if (pendingDomains.length === 0) {
    io.logger.info('No pending email domains to sync');
    return;
  }
  io.logger.info(`Found ${pendingDomains.length} pending email domains to sync`);
  let verifiedCount = 0;
  let reregisteredCount = 0;
  let errorCount = 0;
  const reregisterCutoff = DateTime.now()
    .minus({
      hours: AUTO_REREGISTER_AFTER_HOURS,
    })
    .toJSDate();
  for (let i = 0; i < pendingDomains.length; i += BATCH_SIZE) {
    const batch = pendingDomains.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(async (domain) => {
        const shouldReregister = domain.createdAt < reregisterCutoff;
        const { isVerified } = await verifyEmailDomain(domain.id);
        if (isVerified) {
          io.logger.info(`Domain "${domain.domain}" is verified`);
          return 'verified';
        }
        if (shouldReregister) {
          io.logger.info(
            `Domain "${domain.domain}" has been pending since ${domain.createdAt.toISOString()}, attempting re-registration`,
          );
          await reregisterEmailDomain({
            emailDomainId: domain.id,
          });
          return 'reregistered';
        }
        return 'pending';
      }),
    );
    for (const result of results) {
      if (result.status === 'rejected') {
        errorCount++;
        io.logger.error(`Failed to process email domain: ${String(result.reason)}`);
      } else if (result.value === 'verified') {
        verifiedCount++;
      } else if (result.value === 'reregistered') {
        reregisteredCount++;
      }
    }
    if (i + BATCH_SIZE < pendingDomains.length) {
      await new Promise((resolve) => {
        setTimeout(resolve, 1e3);
      });
    }
  }
  io.logger.info(
    `Sync complete: ${verifiedCount} verified, ${reregisteredCount} re-registered, ${errorCount} errors out of ${pendingDomains.length} pending domains`,
  );
};

export { run };
