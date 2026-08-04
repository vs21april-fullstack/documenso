import { useLingui } from '@lingui/react';
import { DocumentStatus, EnvelopeType } from '@prisma/client';
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
import { g as getEmailContext } from './get-email-context-oWksu_oT.js';
import {
  g as getI18nInstance,
  m as mailer,
  r as renderEmailWithI18N,
  T as TemplateFooter,
} from './render-email-with-i18n-BUkhePvJ.js';
import {
  D as DOCUMENSO_INTERNAL_EMAIL,
  L as jobs,
  N as NEXT_PUBLIC_WEBAPP_URL,
  K as ORGANISATION_USER_ACCOUNT_TYPE,
  p as prismaWithReplicas,
} from './server-build-9HdnhtY2.js';
import { T as TemplateBrandingLogo } from './template-branding-logo-CraYDacf.js';
import { T as TemplateImage } from './template-image-BBICzxvn.js';
import 'node:stream';
import 'zod';
import '@lingui/core';
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
import '@documenso/nodemailer-resend';
import 'nodemailer';
import '@react-email/link';
import '@react-email/render';
import '@react-email/tailwind';
import '@react-email/img';
const LEGACY_DELETED_ACCOUNT_EMAIL = 'deleted-account@documenso.com';
const deletedServiceAccountEmail = () => {
  try {
    if (process.env.NEXT_PRIVATE_DELETED_SERVICE_ACCOUNT_EMAIL) {
      return process.env.NEXT_PRIVATE_DELETED_SERVICE_ACCOUNT_EMAIL;
    }
    const { hostname } = new URL(process.env.NEXT_PUBLIC_WEBAPP_URL || 'http://localhost:3000');
    return `deleted-account@${hostname}`;
  } catch (error) {
    return LEGACY_DELETED_ACCOUNT_EMAIL;
  }
};
const deletedAccountServiceAccount = async () => {
  const serviceAccount = await prismaWithReplicas.user.findFirst({
    where: {
      email: deletedServiceAccountEmail(),
    },
    select: {
      id: true,
      email: true,
      ownedOrganisations: {
        select: {
          id: true,
          teams: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
  if (!serviceAccount) {
    throw new Error('Deleted account service account not found, have you ran the appropriate migrations?');
  }
  return serviceAccount;
};
const orphanEnvelopes = async ({ teamId }) => {
  const serviceAccount = await deletedAccountServiceAccount();
  await prismaWithReplicas.envelope.updateMany({
    where: {
      teamId,
      type: EnvelopeType.DOCUMENT,
      status: {
        in: [DocumentStatus.PENDING, DocumentStatus.REJECTED, DocumentStatus.COMPLETED],
      },
      deletedAt: null,
    },
    data: {
      userId: serviceAccount.id,
      teamId: serviceAccount.ownedOrganisations[0].teams[0].id,
      deletedAt: /* @__PURE__ */ new Date(),
    },
  });
  await prismaWithReplicas.envelope.updateMany({
    where: {
      teamId,
      type: EnvelopeType.DOCUMENT,
      status: {
        in: [DocumentStatus.PENDING, DocumentStatus.REJECTED, DocumentStatus.COMPLETED],
      },
    },
    data: {
      userId: serviceAccount.id,
      teamId: serviceAccount.ownedOrganisations[0].teams[0].id,
    },
  });
  await prismaWithReplicas.envelope.deleteMany({
    where: {
      teamId,
    },
  });
};
const deleteOrganisation = async ({ organisation }) => {
  await Promise.all(
    organisation.teams.map(async (team) =>
      orphanEnvelopes({
        teamId: team.id,
      }),
    ),
  );
  await prismaWithReplicas.$transaction(async (tx) => {
    await tx.account.deleteMany({
      where: {
        type: ORGANISATION_USER_ACCOUNT_TYPE,
        provider: organisation.id,
      },
    });
    await tx.organisation.delete({
      where: {
        id: organisation.id,
      },
    });
  });
  if (organisation.subscription) {
    await jobs.triggerJob({
      name: 'internal.cancel-organisation-subscription',
      payload: {
        stripeSubscriptionId: organisation.subscription.planId,
        organisationId: organisation.id,
      },
    });
  }
};
const OrganisationDeleteEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  organisationName = 'Organisation Name Placeholder',
  deletedByAdmin = false,
}) => {
  const { _ } = useLingui();
  const previewText =
    /*i18n*/
    {
      id: 'qnoTHA',
    };
  const title =
    /*i18n*/
    {
      id: 'qnoTHA',
    };
  const description = deletedByAdmin
    ? /*i18n*/
      {
        id: 'RuzDjm',
      }
    : /*i18n*/
      {
        id: 'BCebJ+',
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
                      staticAsset: 'delete-team.png',
                    }),
                  }),
                  /* @__PURE__ */ jsxs(Section, {
                    className: 'p-2 text-muted-foreground',
                    children: [
                      /* @__PURE__ */ jsx(Text, {
                        className: 'text-center font-medium text-foreground text-lg',
                        children: _(title),
                      }),
                      /* @__PURE__ */ jsx(Text, { className: 'my-1 text-center text-base', children: _(description) }),
                      /* @__PURE__ */ jsx('div', {
                        className:
                          'mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground',
                        children: organisationName,
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
const sendOrganisationDeleteEmail = async ({ email, organisationName, deletedByAdmin = false, emailContext }) => {
  const template = createElement(OrganisationDeleteEmailTemplate, {
    assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
    organisationName,
    deletedByAdmin,
  });
  const { branding, emailLanguage } = emailContext;
  const [html, text] = await Promise.all([
    renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding,
    }),
    renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding,
      plainText: true,
    }),
  ]);
  const i18n = await getI18nInstance(emailLanguage);
  await mailer.sendMail({
    to: email,
    from: DOCUMENSO_INTERNAL_EMAIL,
    subject: i18n._(
      /*i18n*/
      {
        id: 'pZKLN4',
        values: {
          organisationName,
        },
      },
    ),
    html,
    text,
  });
};
const run = async ({ payload, io }) => {
  const { organisationId, sendEmailToOwner, requestedByUserId } = payload;
  const organisation = await io.runTask('get-organisation', async () => {
    io.logger.info(`User ${requestedByUserId} is deleting organisation ${organisationId}`);
    return await prismaWithReplicas.organisation.findUnique({
      where: {
        id: organisationId,
      },
      select: {
        id: true,
        name: true,
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        teams: {
          select: {
            id: true,
          },
        },
        subscription: {
          select: {
            planId: true,
          },
        },
      },
    });
  });
  if (!organisation) {
    return;
  }
  const ownerEmail = organisation.owner.email;
  const emailContext = await io.runTask('get-email-context', async () => {
    const { emailTransport: _emailTransport, ...serializableContext } = await getEmailContext({
      emailType: 'INTERNAL',
      source: {
        type: 'organisation',
        organisationId: organisation.id,
      },
    });
    return serializableContext;
  });
  await io.runTask('delete-organisation', async () => {
    await deleteOrganisation({
      organisation,
    });
  });
  if (sendEmailToOwner) {
    await io.runTask('send-organisation-deleted-email', async () => {
      await sendOrganisationDeleteEmail({
        email: ownerEmail,
        organisationName: organisation.name,
        deletedByAdmin: true,
        emailContext,
      });
    });
  }
};

export { run };
