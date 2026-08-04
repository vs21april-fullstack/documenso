import { Trans, useLingui } from '@lingui/react';
import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { createElement } from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { m as mailer, r as renderEmailWithI18N, T as TemplateFooter } from './render-email-with-i18n-D_TjxGVg.js';
import { n as env, N as NEXT_PUBLIC_WEBAPP_URL, p as prismaWithReplicas } from './server-build-BA7AMcCx.js';
import { T as TemplateBrandingLogo } from './template-branding-logo-DWE10FKA.js';
import { T as TemplateDocumentImage } from './template-document-image-ClaHnWUr.js';
import '@documenso/nodemailer-resend';
import 'nodemailer';
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
import '@prisma/client';
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
import '@react-email/column';
import '@react-email/row';
const TemplateResetPassword = ({ assetBaseUrl }) => {
  const NEXT_PUBLIC_WEBAPP_URL2 = env('NEXT_PUBLIC_WEBAPP_URL');
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx(TemplateDocumentImage, { className: 'mt-6', assetBaseUrl }),
      /* @__PURE__ */ jsxs(Section, {
        className: 'flex-row items-center justify-center',
        children: [
          /* @__PURE__ */ jsx(Text, {
            className: 'mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg',
            children: /* @__PURE__ */ jsx(Trans, {
              .../*i18n*/
              {
                id: 'DKeVgZ',
              },
            }),
          }),
          /* @__PURE__ */ jsx(Text, {
            className: 'my-1 text-center text-base text-muted-foreground',
            children: /* @__PURE__ */ jsx(Trans, {
              .../*i18n*/
              {
                id: 'dBUm7w',
              },
            }),
          }),
          /* @__PURE__ */ jsx(Section, {
            className: 'mt-8 mb-6 text-center',
            children: /* @__PURE__ */ jsx(Button, {
              className:
                'inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline',
              href: `${NEXT_PUBLIC_WEBAPP_URL2 ?? 'http://localhost:3000'}/signin`,
              children: /* @__PURE__ */ jsx(Trans, {
                .../*i18n*/
                {
                  id: 'n1ekoW',
                },
              }),
            }),
          }),
        ],
      }),
    ],
  });
};
const ResetPasswordTemplate = ({
  userName = 'Lucas Smith',
  userEmail = 'lucas@documenso.com',
  assetBaseUrl = 'http://localhost:3002',
}) => {
  const { _ } = useLingui();
  const previewText =
    /*i18n*/
    {
      id: '6cPmk1',
    };
  return /* @__PURE__ */ jsxs(Html, {
    children: [
      /* @__PURE__ */ jsx(Head, {}),
      /* @__PURE__ */ jsxs(Body, {
        className: 'mx-auto my-auto bg-background font-sans',
        children: [
          /* @__PURE__ */ jsx(Preview, { children: _(previewText) }),
          /* @__PURE__ */ jsxs(Section, {
            children: [
              /* @__PURE__ */ jsx(Container, {
                className:
                  'mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-4 backdrop-blur-sm',
                children: /* @__PURE__ */ jsxs(Section, {
                  children: [
                    /* @__PURE__ */ jsx(TemplateBrandingLogo, { assetBaseUrl, className: 'mb-4 h-6' }),
                    /* @__PURE__ */ jsx(TemplateResetPassword, { userName, userEmail, assetBaseUrl }),
                  ],
                }),
              }),
              /* @__PURE__ */ jsx(Container, {
                className: 'mx-auto mt-12 max-w-xl',
                children: /* @__PURE__ */ jsxs(Section, {
                  children: [
                    /* @__PURE__ */ jsx(Text, {
                      className: 'my-4 font-semibold text-base',
                      children: /* @__PURE__ */ jsx(Trans, {
                        .../*i18n*/
                        {
                          id: 'neKtDP',
                          values: {
                            userName,
                            userEmail,
                          },
                          components: {
                            0: /* @__PURE__ */ jsx(Link, {
                              className: 'font-normal text-muted-foreground',
                              href: `mailto:${userEmail}`,
                            }),
                          },
                        },
                      }),
                    }),
                    /* @__PURE__ */ jsx(Text, {
                      className: 'mt-2 text-base text-muted-foreground',
                      children: /* @__PURE__ */ jsx(Trans, {
                        .../*i18n*/
                        {
                          id: '6yoqQD',
                        },
                      }),
                    }),
                    /* @__PURE__ */ jsx(Text, {
                      className: 'mt-2 text-base text-muted-foreground',
                      children: /* @__PURE__ */ jsx(Trans, {
                        .../*i18n*/
                        {
                          id: '7wRHVd',
                          components: {
                            0: /* @__PURE__ */ jsx(Link, {
                              className: 'font-normal text-primary',
                              href: 'mailto:hi@documenso.com',
                            }),
                          },
                        },
                      }),
                    }),
                  ],
                }),
              }),
              /* @__PURE__ */ jsx(Hr, { className: 'mx-auto mt-12 max-w-xl' }),
              /* @__PURE__ */ jsx(Container, {
                className: 'mx-auto max-w-xl',
                children: /* @__PURE__ */ jsx(TemplateFooter, { isDocument: false }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
const sendResetPassword = async ({ userId }) => {
  const user = await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId,
    },
  });
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';
  const template = createElement(ResetPasswordTemplate, {
    assetBaseUrl,
    userEmail: user.email,
    userName: user.name || '',
  });
  const [html, text] = await Promise.all([
    renderEmailWithI18N(template),
    renderEmailWithI18N(template, {
      plainText: true,
    }),
  ]);
  return await mailer.sendMail({
    to: {
      address: user.email,
      name: user.name || '',
    },
    from: {
      name: env('NEXT_PRIVATE_SMTP_FROM_NAME') || 'Omni Sign',
      address: env('NEXT_PRIVATE_SMTP_FROM_ADDRESS') || 'noreply@documenso.com',
    },
    subject: 'Password Reset Success!',
    html,
    text,
  });
};
const run = async ({ payload }) => {
  await sendResetPassword({
    userId: payload.userId,
  });
};

export { run };
