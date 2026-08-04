import { Trans, useLingui } from '@lingui/react';
import { EnvelopeType, SendStatus, SigningStatus } from '@prisma/client';
import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Html } from '@react-email/html';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { createElement } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { g as getEmailContext } from './get-email-context-Bmef7f7I.js';
import {
  g as getI18nInstance,
  m as mailer,
  r as renderEmailWithI18N,
  T as TemplateFooter,
} from './render-email-with-i18n-hJlZB03t.js';
import {
  D as DOCUMENSO_INTERNAL_EMAIL,
  f as extractDerivedDocumentEmailSettings,
  k as formatDocumentsPath,
  i as isRecipientEmailValidForSending,
  N as NEXT_PUBLIC_WEBAPP_URL,
  p as prismaWithReplicas,
  e as unsafeBuildEnvelopeIdQuery,
} from './server-build-Cc4Fq8d1.js';
import { T as TemplateBrandingLogo } from './template-branding-logo-CaSnDk1U.js';
import '@documenso/nodemailer-resend';
import 'nodemailer';
import '@react-email/link';
import 'colord';
import '@react-email/render';
import '@react-email/tailwind';
import '@lingui/core';
import '@react-email/img';
import 'node:stream';
import 'zod';
import 'ts-pattern';
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
function TemplateDocumentRejected({ documentName, recipientName: signerName, rejectionReason, documentUrl }) {
  return /* @__PURE__ */ jsxs('div', {
    className: 'mt-4',
    children: [
      /* @__PURE__ */ jsx(Heading, {
        className: 'mb-4 text-center font-semibold text-2xl text-foreground',
        children: /* @__PURE__ */ jsx(Trans, {
          .../*i18n*/
          {
            id: '0aBbNe',
          },
        }),
      }),
      /* @__PURE__ */ jsx(Text, {
        className: 'mb-4 text-base',
        children: /* @__PURE__ */ jsx(Trans, {
          .../*i18n*/
          {
            id: 'A/uN4T',
            values: {
              signerName,
              documentName,
            },
          },
        }),
      }),
      rejectionReason &&
        /* @__PURE__ */ jsx(Text, {
          className: 'mb-4 text-base text-muted-foreground',
          children: /* @__PURE__ */ jsx(Trans, {
            .../*i18n*/
            {
              id: '/ts7bl',
              values: {
                rejectionReason,
              },
            },
          }),
        }),
      /* @__PURE__ */ jsx(Text, {
        className: 'mb-6 text-base',
        children: /* @__PURE__ */ jsx(Trans, {
          .../*i18n*/
          {
            id: 'Y32cFr',
          },
        }),
      }),
      /* @__PURE__ */ jsx(Button, {
        href: documentUrl,
        className:
          'inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline',
        children: /* @__PURE__ */ jsx(Trans, {
          .../*i18n*/
          {
            id: 'SzshGx',
          },
        }),
      }),
    ],
  });
}
function DocumentRejectedEmail({
  recipientName,
  documentName,
  documentUrl,
  rejectionReason,
  assetBaseUrl = 'http://localhost:3002',
}) {
  const { _ } = useLingui();
  const previewText = _(
    /*i18n*/
    {
      id: '3Vk53q',
      values: {
        recipientName,
        documentName,
      },
    },
  );
  return /* @__PURE__ */ jsxs(Html, {
    children: [
      /* @__PURE__ */ jsx(Head, {}),
      /* @__PURE__ */ jsxs(Body, {
        className: 'mx-auto my-auto bg-background font-sans',
        children: [
          /* @__PURE__ */ jsx(Preview, { children: previewText }),
          /* @__PURE__ */ jsxs(Section, {
            children: [
              /* @__PURE__ */ jsx(Container, {
                className:
                  'mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-4 backdrop-blur-sm',
                children: /* @__PURE__ */ jsxs(Section, {
                  children: [
                    /* @__PURE__ */ jsx(TemplateBrandingLogo, { assetBaseUrl, className: 'mb-4 h-6' }),
                    /* @__PURE__ */ jsx(TemplateDocumentRejected, {
                      recipientName,
                      documentName,
                      documentUrl,
                      rejectionReason,
                    }),
                  ],
                }),
              }),
              /* @__PURE__ */ jsx(Container, {
                className: 'mx-auto max-w-xl',
                children: /* @__PURE__ */ jsx(TemplateFooter, {}),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function TemplateDocumentRejectionConfirmed({ recipientName, documentName, documentOwnerName, reason }) {
  return /* @__PURE__ */ jsx(Container, {
    children: /* @__PURE__ */ jsxs(Section, {
      children: [
        /* @__PURE__ */ jsx(Heading, {
          className: 'font-semibold text-2xl',
          children: /* @__PURE__ */ jsx(Trans, {
            .../*i18n*/
            {
              id: 'j4Qqya',
            },
          }),
        }),
        /* @__PURE__ */ jsx(Text, {
          className: 'text-base text-foreground',
          children: /* @__PURE__ */ jsx(Trans, {
            .../*i18n*/
            {
              id: 'RzMPvz',
              values: {
                documentName,
                documentOwnerName,
              },
              components: {
                0: /* @__PURE__ */ jsx('strong', { className: 'font-bold' }),
              },
            },
          }),
        }),
        reason &&
          /* @__PURE__ */ jsx(Text, {
            className: 'font-medium text-base text-muted-foreground',
            children: /* @__PURE__ */ jsx(Trans, {
              .../*i18n*/
              {
                id: 'Vb19fD',
                values: {
                  reason,
                },
              },
            }),
          }),
        /* @__PURE__ */ jsx(Text, {
          className: 'text-base',
          children: /* @__PURE__ */ jsx(Trans, {
            .../*i18n*/
            {
              id: 'jOxq1z',
            },
          }),
        }),
      ],
    }),
  });
}
function DocumentRejectionConfirmedEmail({
  recipientName,
  documentName,
  documentOwnerName,
  reason,
  assetBaseUrl = 'http://localhost:3002',
}) {
  const { _ } = useLingui();
  const previewText = _(
    /*i18n*/
    {
      id: '4FqTiY',
      values: {
        documentName,
      },
    },
  );
  return /* @__PURE__ */ jsxs(Html, {
    children: [
      /* @__PURE__ */ jsx(Head, {}),
      /* @__PURE__ */ jsxs(Body, {
        className: 'mx-auto my-auto bg-background font-sans',
        children: [
          /* @__PURE__ */ jsx(Preview, { children: previewText }),
          /* @__PURE__ */ jsxs(Section, {
            children: [
              /* @__PURE__ */ jsx(Container, {
                className:
                  'mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-4 backdrop-blur-sm',
                children: /* @__PURE__ */ jsxs(Section, {
                  children: [
                    /* @__PURE__ */ jsx(TemplateBrandingLogo, { assetBaseUrl, className: 'mb-4 h-6' }),
                    /* @__PURE__ */ jsx(TemplateDocumentRejectionConfirmed, {
                      recipientName,
                      documentName,
                      documentOwnerName,
                      reason,
                    }),
                  ],
                }),
              }),
              /* @__PURE__ */ jsx(Container, {
                className: 'mx-auto max-w-xl',
                children: /* @__PURE__ */ jsx(TemplateFooter, {}),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const run = async ({ payload, io }) => {
  const { documentId, recipientId } = payload;
  const [envelope, recipient] = await Promise.all([
    prismaWithReplicas.envelope.findFirstOrThrow({
      where: unsafeBuildEnvelopeIdQuery(
        {
          type: 'documentId',
          id: documentId,
        },
        EnvelopeType.DOCUMENT,
      ),
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        documentMeta: true,
        team: {
          select: {
            teamEmail: true,
            name: true,
            url: true,
          },
        },
      },
    }),
    prismaWithReplicas.recipient.findFirstOrThrow({
      where: {
        id: recipientId,
        signingStatus: SigningStatus.REJECTED,
      },
    }),
  ]);
  const { user: documentOwner } = envelope;
  const isEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).recipientSigningRequest;
  if (!isEmailEnabled) {
    return;
  }
  const { branding, emailLanguage, senderEmail, replyToEmail, emailsDisabled, emailTransport } = await getEmailContext({
    emailType: 'RECIPIENT',
    source: {
      type: 'team',
      teamId: envelope.teamId,
    },
    meta: envelope.documentMeta,
  });
  const i18n = await getI18nInstance(emailLanguage);
  if (!emailsDisabled && isRecipientEmailValidForSending(recipient)) {
    await io.runTask('send-rejection-confirmation-email', async () => {
      const recipientTemplate = createElement(DocumentRejectionConfirmedEmail, {
        recipientName: recipient.name,
        documentName: envelope.title,
        documentOwnerName: envelope.user.name || envelope.user.email,
        reason: recipient.rejectionReason || '',
        assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
      });
      const [html, text] = await Promise.all([
        renderEmailWithI18N(recipientTemplate, {
          lang: emailLanguage,
          branding,
        }),
        renderEmailWithI18N(recipientTemplate, {
          lang: emailLanguage,
          branding,
          plainText: true,
        }),
      ]);
      await emailTransport.sendMail({
        to: {
          name: recipient.name,
          address: recipient.email,
        },
        from: senderEmail,
        replyTo: replyToEmail,
        subject: i18n._(
          /*i18n*/
          {
            id: 'vTQuO6',
            values: {
              0: envelope.title,
            },
          },
        ),
        html,
        text,
      });
    });
  }
  await io.runTask('send-owner-notification-email', async () => {
    const ownerTemplate = createElement(DocumentRejectedEmail, {
      recipientName: recipient.name,
      documentName: envelope.title,
      documentUrl: `${NEXT_PUBLIC_WEBAPP_URL()}${formatDocumentsPath(envelope.team?.url)}/${envelope.id}`,
      rejectionReason: recipient.rejectionReason || '',
      assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
    });
    const [html, text] = await Promise.all([
      renderEmailWithI18N(ownerTemplate, {
        lang: emailLanguage,
        branding,
      }),
      renderEmailWithI18N(ownerTemplate, {
        lang: emailLanguage,
        branding,
        plainText: true,
      }),
    ]);
    await mailer.sendMail({
      to: {
        name: documentOwner.name || '',
        address: documentOwner.email,
      },
      from: DOCUMENSO_INTERNAL_EMAIL,
      // Purposefully using internal email here.
      subject: i18n._(
        /*i18n*/
        {
          id: 'BVlCwe',
          values: {
            0: envelope.title,
            1: recipient.name,
          },
        },
      ),
      html,
      text,
    });
  });
  await io.runTask('update-recipient', async () => {
    await prismaWithReplicas.recipient.update({
      where: {
        id: recipient.id,
      },
      data: {
        sendStatus: SendStatus.SENT,
      },
    });
  });
};

export { run };
