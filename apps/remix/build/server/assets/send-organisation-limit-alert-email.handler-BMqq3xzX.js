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
import { match } from 'ts-pattern';
import { g as getEmailContext } from './get-email-context-aAACCta1.js';
import {
  g as getI18nInstance,
  m as mailer,
  r as renderEmailWithI18N,
  T as TemplateFooter,
} from './render-email-with-i18n-D_TjxGVg.js';
import {
  D as DOCUMENSO_INTERNAL_EMAIL,
  C as INTERNAL_CLAIM_ID,
  N as NEXT_PUBLIC_WEBAPP_URL,
  B as ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP,
  p as prismaWithReplicas,
  z as SUPPORT_EMAIL,
} from './server-build-BA7AMcCx.js';
import { T as TemplateBrandingLogo } from './template-branding-logo-DWE10FKA.js';
import '@documenso/nodemailer-resend';
import 'nodemailer';
import '@react-email/link';
import 'colord';
import '@react-email/render';
import '@react-email/tailwind';
import '@lingui/core';
import 'node:stream';
import 'zod';
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
import '@react-email/img';
const OrganisationLimitAlertEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  organisationName = 'Organisation Name',
  counter = 'email',
  kind = 'quota',
  period = '2026-05',
}) => {
  const { _ } = useLingui();
  const previewText =
    kind === 'quotaNearing'
      ? /*i18n*/
        {
          id: '2RtWIH',
        }
      : /*i18n*/
        {
          id: 'XRwX0n',
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
                  /* @__PURE__ */ jsxs(Section, {
                    className: 'p-2 text-muted-foreground',
                    children: [
                      /* @__PURE__ */ jsx(Text, {
                        className: 'text-center font-medium text-foreground text-lg',
                        children:
                          kind === 'quotaNearing'
                            ? /* @__PURE__ */ jsx(Trans, {
                                .../*i18n*/
                                {
                                  id: '2RtWIH',
                                },
                              })
                            : /* @__PURE__ */ jsx(Trans, {
                                .../*i18n*/
                                {
                                  id: 'XRwX0n',
                                },
                              }),
                      }),
                      /* @__PURE__ */ jsx('div', {
                        className:
                          'mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground',
                        children: organisationName,
                      }),
                      match(kind)
                        .with('quota', () =>
                          /* @__PURE__ */ jsx(Text, {
                            className: 'text-center text-base',
                            children: match(counter)
                              .with('document', () =>
                                /* @__PURE__ */ jsx(Trans, {
                                  .../*i18n*/
                                  {
                                    id: 'ae1E1d',
                                  },
                                }),
                              )
                              .with('email', () =>
                                /* @__PURE__ */ jsx(Trans, {
                                  .../*i18n*/
                                  {
                                    id: 'ocEsla',
                                  },
                                }),
                              )
                              .with('api', () =>
                                /* @__PURE__ */ jsx(Trans, {
                                  .../*i18n*/
                                  {
                                    id: 'EdVPC8',
                                  },
                                }),
                              )
                              .exhaustive(),
                          }),
                        )
                        .with('rateLimit', () =>
                          /* @__PURE__ */ jsx(Text, {
                            className: 'text-center text-base',
                            children: match(counter)
                              .with('document', () =>
                                /* @__PURE__ */ jsx(Trans, {
                                  .../*i18n*/
                                  {
                                    id: '4AfIg0',
                                  },
                                }),
                              )
                              .with('email', () =>
                                /* @__PURE__ */ jsx(Trans, {
                                  .../*i18n*/
                                  {
                                    id: '1Wj/Zv',
                                  },
                                }),
                              )
                              .with('api', () =>
                                /* @__PURE__ */ jsx(Trans, {
                                  .../*i18n*/
                                  {
                                    id: '24Ci00',
                                  },
                                }),
                              )
                              .exhaustive(),
                          }),
                        )
                        .with('quotaNearing', () =>
                          /* @__PURE__ */ jsx(Text, {
                            className: 'text-center text-base',
                            children: match(counter)
                              .with('document', () =>
                                /* @__PURE__ */ jsx(Trans, {
                                  .../*i18n*/
                                  {
                                    id: 'rhkxlS',
                                  },
                                }),
                              )
                              .with('email', () =>
                                /* @__PURE__ */ jsx(Trans, {
                                  .../*i18n*/
                                  {
                                    id: '6cBGAo',
                                  },
                                }),
                              )
                              .with('api', () =>
                                /* @__PURE__ */ jsx(Trans, {
                                  .../*i18n*/
                                  {
                                    id: 'DZc59G',
                                  },
                                }),
                              )
                              .exhaustive(),
                          }),
                        )
                        .exhaustive(),
                      /* @__PURE__ */ jsx(Text, {
                        className: 'text-center text-base',
                        children:
                          kind === 'quotaNearing'
                            ? /* @__PURE__ */ jsx(Trans, {
                                .../*i18n*/
                                {
                                  id: '0mb9Jt',
                                  values: {
                                    SUPPORT_EMAIL,
                                  },
                                },
                              })
                            : /* @__PURE__ */ jsx(Trans, {
                                .../*i18n*/
                                {
                                  id: 'AYpO4m',
                                  values: {
                                    SUPPORT_EMAIL,
                                  },
                                },
                              }),
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
      organisationClaim: true,
      monthlyStats: {
        where: {
          period: payload.period,
        },
        select: {
          documentCount: true,
          emailCount: true,
          apiCount: true,
        },
      },
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
  const { branding, emailLanguage, senderEmail, emailTransport } = await getEmailContext({
    emailType: 'INTERNAL',
    source: {
      type: 'organisation',
      organisationId: organisation.id,
    },
  });
  if (organisation.organisationClaim.originalSubscriptionClaimId === INTERNAL_CLAIM_ID.FREE) {
    io.logger.info({
      msg: 'Skipping organisation limit alert email for "free" claim',
      organisationId: organisation.id,
    });
    return;
  }
  const memberSubject =
    payload.kind === 'quotaNearing'
      ? /*i18n*/
        {
          id: '2RtWIH',
        }
      : /*i18n*/
        {
          id: 'XRwX0n',
        };
  for (const member of organisation.members) {
    await io.runTask(`send-organisation-limit-alert-email-${member.id}`, async () => {
      const emailContent = createElement(OrganisationLimitAlertEmailTemplate, {
        assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
        organisationName: organisation.name,
        counter: payload.counter,
        kind: payload.kind,
        period: payload.period,
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
      const i18n2 = await getI18nInstance(emailLanguage);
      await emailTransport.sendMail({
        to: member.user.email,
        from: senderEmail,
        subject: i18n2._(memberSubject),
        html,
        text,
      });
    });
  }
  const i18n = await getI18nInstance('en');
  const supportSubject =
    payload.kind === 'quotaNearing'
      ? /*i18n*/
        {
          id: 'DX04fr',
        }
      : /*i18n*/
        {
          id: 'P2NJ8Q',
        };
  await io.runTask('send-organisation-limit-alert-support-email', async () => {
    await mailer.sendMail({
      to: SUPPORT_EMAIL,
      from: DOCUMENSO_INTERNAL_EMAIL,
      subject: i18n._(supportSubject),
      text: `
        Organisation: ${organisation.name}
        Organisation ID: ${organisation.id}
        Organisation Claim Original ID: ${organisation.organisationClaim.originalSubscriptionClaimId}
        Email Quota: ${organisation.monthlyStats[0]?.emailCount || 0}/${organisation.organisationClaim.emailQuota ?? 'Unlimited'}
        API Quota: ${organisation.monthlyStats[0]?.apiCount || 0}/${organisation.organisationClaim.apiQuota ?? 'Unlimited'}
        Document Quota: ${organisation.monthlyStats[0]?.documentCount || 0}/${organisation.organisationClaim.documentQuota ?? 'Unlimited'}
        Counter: ${payload.counter}
        Kind: ${payload.kind}
        Period: ${payload.period}
      `,
    });
  });
};

export { run };
