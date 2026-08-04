import { Trans, useLingui } from '@lingui/react';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { createElement } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { g as getEmailContext } from './get-email-context-aAACCta1.js';
import {
  g as getI18nInstance,
  r as renderEmailWithI18N,
  T as TemplateFooter,
} from './render-email-with-i18n-D_TjxGVg.js';
import {
  N as NEXT_PUBLIC_WEBAPP_URL,
  B as ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP,
  p as prismaWithReplicas,
} from './server-build-BA7AMcCx.js';
import { T as TemplateBrandingLogo } from './template-branding-logo-DWE10FKA.js';
import { T as TemplateImage } from './template-image-BBICzxvn.js';
import '@react-email/img';
import '@react-email/link';
import '@documenso/nodemailer-resend';
import 'nodemailer';
import 'colord';
import '@react-email/render';
import '@react-email/tailwind';
import '@lingui/core';
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
const OrganisationJoinEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  memberName = 'John Doe',
  memberEmail = 'johndoe@documenso.com',
  organisationName = 'Organisation Name',
  organisationUrl = 'demo',
}) => {
  const { _ } = useLingui();
  const previewText =
    /*i18n*/
    {
      id: 'VjbXJY',
    };
  return /* @__PURE__ */ jsxs(Html, {
    children: [
      /* @__PURE__ */ jsx(Head, {}),
      /* @__PURE__ */ jsxs(Body, {
        className: 'mx-auto my-auto font-sans',
        children: [
          /* @__PURE__ */ jsx(Preview, { children: _(previewText) }),
          /* @__PURE__ */ jsxs(Section, {
            className: 'bg-background text-muted-foreground',
            children: [
              /* @__PURE__ */ jsxs(Container, {
                className:
                  'mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-2 backdrop-blur-sm',
                children: [
                  /* @__PURE__ */ jsx(TemplateBrandingLogo, { assetBaseUrl, className: 'mb-4 h-6 p-2' }),
                  /* @__PURE__ */ jsx(Section, {
                    children: /* @__PURE__ */ jsx(TemplateImage, {
                      className: 'mx-auto',
                      assetBaseUrl,
                      staticAsset: 'add-user.png',
                    }),
                  }),
                  /* @__PURE__ */ jsxs(Section, {
                    className: 'p-2 text-muted-foreground',
                    children: [
                      /* @__PURE__ */ jsx(Text, {
                        className: 'text-center font-medium text-foreground text-lg',
                        children: /* @__PURE__ */ jsx(Trans, {
                          .../*i18n*/
                          {
                            id: 'GFDsxI',
                            values: {
                              organisationName,
                            },
                          },
                        }),
                      }),
                      /* @__PURE__ */ jsx('div', {
                        className:
                          'mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground',
                        children: memberName || memberEmail,
                      }),
                    ],
                  }),
                ],
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
const run = async ({ payload, io }) => {
  const organisation = await prismaWithReplicas.organisation.findFirstOrThrow({
    where: {
      id: payload.organisationId,
    },
    include: {
      members: {
        where: {
          organisationGroupMembers: {
            some: {
              group: {
                organisationRole: {
                  in: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION'],
                },
              },
            },
          },
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      },
    },
  });
  const invitedMember = await prismaWithReplicas.organisationMember.findFirstOrThrow({
    where: {
      userId: payload.memberUserId,
      organisationId: payload.organisationId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
  const { branding, emailLanguage, senderEmail, emailTransport } = await getEmailContext({
    emailType: 'INTERNAL',
    source: {
      type: 'organisation',
      organisationId: organisation.id,
    },
  });
  for (const member of organisation.members) {
    if (member.id === invitedMember.id) {
      continue;
    }
    await io.runTask(`send-organisation-member-joined-email--${invitedMember.id}_${member.id}`, async () => {
      const emailContent = createElement(OrganisationJoinEmailTemplate, {
        assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
        baseUrl: NEXT_PUBLIC_WEBAPP_URL(),
        memberName: invitedMember.user.name || '',
        memberEmail: invitedMember.user.email,
        organisationName: organisation.name,
        organisationUrl: organisation.url,
      });
      const [html, text] = await Promise.all([
        renderEmailWithI18N(emailContent, {
          lang: emailLanguage,
          branding,
        }),
        renderEmailWithI18N(emailContent, {
          lang: emailLanguage,
          branding,
          plainText: true,
        }),
      ]);
      const i18n = await getI18nInstance(emailLanguage);
      await emailTransport.sendMail({
        to: member.user.email,
        from: senderEmail,
        subject: i18n._(
          /*i18n*/
          {
            id: 'TqYjhl',
          },
        ),
        html,
        text,
      });
    });
  }
};

export { run };
