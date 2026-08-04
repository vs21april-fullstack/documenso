import { Trans, useLingui } from '@lingui/react';
import {
  DocumentSource,
  DocumentStatus,
  EnvelopeType,
  OrganisationType,
  RecipientRole,
  SendStatus,
} from '@prisma/client';
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
import { match, P } from 'ts-pattern';
import { g as getEmailContext } from './get-email-context-DMRyv-Ds.js';
import { r as renderCustomEmailTemplate } from './render-custom-email-template-CJQVxdQl.js';
import {
  g as getI18nInstance,
  r as renderEmailWithI18N,
  T as TemplateFooter,
} from './render-email-with-i18n-QRj_wsJh.js';
import {
  g as assertOrganisationRatesAndLimits,
  l as createDocumentAuditLogData,
  m as DOCUMENT_AUDIT_LOG_TYPE,
  E as EMAIL_ASSET_BASE_URL,
  f as extractDerivedDocumentEmailSettings,
  i as isRecipientEmailValidForSending,
  j as PUBLISHED_APP_URL,
  p as prismaWithReplicas,
  F as RECIPIENT_ROLE_TO_EMAIL_TYPE,
  R as RECIPIENT_ROLES_DESCRIPTION,
  e as unsafeBuildEnvelopeIdQuery,
} from './server-build-DH2uQubB.js';
import { T as TemplateBrandingLogo } from './template-branding-logo-xeoMZL8E.js';
import { T as TemplateDocumentImage } from './template-document-image-ClaHnWUr.js';
import {
  b as buildEnvelopeEmailHeaders,
  T as TemplateCustomMessageBody,
  u as updateRecipientNextReminder,
} from './update-recipient-next-reminder-BOT9Qso9.js';
import 'node:stream';
import 'zod';
import '@lingui/core';
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
import '@react-email/img';
import '@react-email/column';
import '@react-email/row';
import '@documenso/nodemailer-resend';
import 'nodemailer';
import '@react-email/render';
import '@react-email/tailwind';
const TemplateDocumentInvite = ({
  inviterName,
  documentName,
  signDocumentLink,
  assetBaseUrl,
  role,
  selfSigner,
  teamName,
  includeSenderDetails,
  organisationType,
}) => {
  const { _ } = useLingui();
  const { actionVerb } = RECIPIENT_ROLES_DESCRIPTION[role];
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx(TemplateDocumentImage, { className: 'mt-6', assetBaseUrl }),
      /* @__PURE__ */ jsxs(Section, {
        children: [
          /* @__PURE__ */ jsx(Text, {
            className: 'mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg',
            children: match({
              selfSigner,
              organisationType,
              includeSenderDetails,
              teamName,
            })
              .with(
                {
                  selfSigner: true,
                },
                () =>
                  /* @__PURE__ */ jsx(Trans, {
                    .../*i18n*/
                    {
                      id: 'KYkUeW',
                      values: {
                        0: _(actionVerb).toLowerCase(),
                        documentName,
                      },
                      components: {
                        0: /* @__PURE__ */ jsx('br', {}),
                      },
                    },
                  }),
              )
              .with(
                {
                  organisationType: OrganisationType.ORGANISATION,
                  includeSenderDetails: true,
                  teamName: P.string,
                },
                () =>
                  /* @__PURE__ */ jsx(Trans, {
                    .../*i18n*/
                    {
                      id: 'NpX//o',
                      values: {
                        0: _(actionVerb).toLowerCase(),
                        inviterName,
                        teamName,
                        documentName,
                      },
                      components: {
                        0: /* @__PURE__ */ jsx('br', {}),
                      },
                    },
                  }),
              )
              .with(
                {
                  organisationType: OrganisationType.ORGANISATION,
                  teamName: P.string,
                },
                () =>
                  /* @__PURE__ */ jsx(Trans, {
                    .../*i18n*/
                    {
                      id: 'cxzGFC',
                      values: {
                        0: _(actionVerb).toLowerCase(),
                        teamName,
                        documentName,
                      },
                      components: {
                        0: /* @__PURE__ */ jsx('br', {}),
                      },
                    },
                  }),
              )
              .otherwise(() =>
                /* @__PURE__ */ jsx(Trans, {
                  .../*i18n*/
                  {
                    id: 'uySqxV',
                    values: {
                      0: _(actionVerb).toLowerCase(),
                      inviterName,
                      documentName,
                    },
                    components: {
                      0: /* @__PURE__ */ jsx('br', {}),
                    },
                  },
                }),
              ),
          }),
          /* @__PURE__ */ jsx(Text, {
            className: 'my-1 text-center text-base text-muted-foreground',
            children: match(role)
              .with(RecipientRole.SIGNER, () =>
                /* @__PURE__ */ jsx(Trans, {
                  .../*i18n*/
                  {
                    id: 'uaLDnA',
                  },
                }),
              )
              .with(RecipientRole.VIEWER, () =>
                /* @__PURE__ */ jsx(Trans, {
                  .../*i18n*/
                  {
                    id: 'zgM2eX',
                  },
                }),
              )
              .with(RecipientRole.APPROVER, () =>
                /* @__PURE__ */ jsx(Trans, {
                  .../*i18n*/
                  {
                    id: '8PVsCY',
                  },
                }),
              )
              .with(RecipientRole.CC, () => '')
              .with(RecipientRole.ASSISTANT, () =>
                /* @__PURE__ */ jsx(Trans, {
                  .../*i18n*/
                  {
                    id: 'JWQdoT',
                  },
                }),
              )
              .exhaustive(),
          }),
          /* @__PURE__ */ jsx(Section, {
            className: 'mt-8 mb-6 text-center',
            children: /* @__PURE__ */ jsx(Button, {
              className:
                'inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-base text-primary-foreground no-underline',
              href: signDocumentLink,
              children: match(role)
                .with(RecipientRole.SIGNER, () =>
                  /* @__PURE__ */ jsx(Trans, {
                    .../*i18n*/
                    {
                      id: 't6PyGz',
                    },
                  }),
                )
                .with(RecipientRole.VIEWER, () =>
                  /* @__PURE__ */ jsx(Trans, {
                    .../*i18n*/
                    {
                      id: 'SzshGx',
                    },
                  }),
                )
                .with(RecipientRole.APPROVER, () =>
                  /* @__PURE__ */ jsx(Trans, {
                    .../*i18n*/
                    {
                      id: 'BA9BFl',
                    },
                  }),
                )
                .with(RecipientRole.CC, () => '')
                .with(RecipientRole.ASSISTANT, () =>
                  /* @__PURE__ */ jsx(Trans, {
                    .../*i18n*/
                    {
                      id: 'GjvUe0',
                    },
                  }),
                )
                .exhaustive(),
            }),
          }),
        ],
      }),
    ],
  });
};
const DocumentInviteEmailTemplate = ({
  inviterName = 'Lucas Smith',
  inviterEmail = 'lucas@documenso.com',
  documentName = 'Open Source Pledge.pdf',
  signDocumentLink = 'https://documenso.com',
  assetBaseUrl = 'http://localhost:3002',
  customBody,
  role,
  selfSigner = false,
  teamName = '',
  includeSenderDetails,
  organisationType,
  reportUrl,
}) => {
  const { _ } = useLingui();
  const action = _(RECIPIENT_ROLES_DESCRIPTION[role].actionVerb).toLowerCase();
  let previewText =
    /*i18n*/
    {
      id: 'gopu1O',
      values: {
        inviterName,
        action,
        documentName,
      },
    };
  if (organisationType === OrganisationType.ORGANISATION) {
    previewText = includeSenderDetails
      ? /*i18n*/
        {
          id: '2+Jmey',
          values: {
            inviterName,
            teamName,
            action,
            documentName,
          },
        }
      : /*i18n*/
        {
          id: 'q++KKo',
          values: {
            teamName,
            action,
            documentName,
          },
        };
  }
  if (selfSigner) {
    previewText =
      /*i18n*/
      {
        id: '3RwM9t',
        values: {
          action,
          documentName,
        },
      };
  }
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
                    /* @__PURE__ */ jsx(TemplateDocumentInvite, {
                      inviterName,
                      inviterEmail,
                      documentName,
                      signDocumentLink,
                      assetBaseUrl,
                      role,
                      selfSigner,
                      organisationType,
                      teamName,
                      includeSenderDetails,
                    }),
                  ],
                }),
              }),
              /* @__PURE__ */ jsx(Container, {
                className: 'mx-auto mt-12 max-w-xl',
                children: /* @__PURE__ */ jsxs(Section, {
                  children: [
                    organisationType === OrganisationType.PERSONAL &&
                      /* @__PURE__ */ jsx(Text, {
                        className: 'my-4 font-semibold text-base',
                        children: /* @__PURE__ */ jsx(Trans, {
                          .../*i18n*/
                          {
                            id: 'L/K/DO',
                            values: {
                              inviterName,
                              inviterEmail,
                            },
                            components: {
                              0: /* @__PURE__ */ jsx(Link, {
                                className: 'font-normal text-muted-foreground',
                                href: `mailto:${inviterEmail}`,
                              }),
                            },
                          },
                        }),
                      }),
                    /* @__PURE__ */ jsx(Text, {
                      className: 'mt-2 text-base text-muted-foreground',
                      children: customBody
                        ? /* @__PURE__ */ jsx(TemplateCustomMessageBody, { text: customBody })
                        : /* @__PURE__ */ jsx(Trans, {
                            .../*i18n*/
                            {
                              id: 'wj6GQb',
                              values: {
                                inviterName,
                                action,
                                documentName,
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
                children: /* @__PURE__ */ jsx(TemplateFooter, { reportUrl }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
const run = async ({ payload, io }) => {
  const { userId, documentId, recipientId, requestMetadata } = payload;
  const [user, envelope, recipient] = await Promise.all([
    prismaWithReplicas.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    }),
    prismaWithReplicas.envelope.findFirstOrThrow({
      where: {
        ...unsafeBuildEnvelopeIdQuery(
          {
            type: 'documentId',
            id: documentId,
          },
          EnvelopeType.DOCUMENT,
        ),
        status: DocumentStatus.PENDING,
      },
      include: {
        documentMeta: true,
        user: {
          select: {
            disabled: true,
          },
        },
        team: {
          select: {
            teamEmail: true,
            name: true,
          },
        },
      },
    }),
    prismaWithReplicas.recipient.findFirstOrThrow({
      where: {
        id: recipientId,
      },
    }),
  ]);
  const { documentMeta, team } = envelope;
  if (recipient.role === RecipientRole.CC) {
    return;
  }
  const isRecipientSigningRequestEmailEnabled = extractDerivedDocumentEmailSettings(
    envelope.documentMeta,
  ).recipientSigningRequest;
  if (!isRecipientSigningRequestEmailEnabled) {
    return;
  }
  const {
    branding,
    emailLanguage,
    settings,
    organisationType,
    senderEmail,
    replyToEmail,
    organisationId,
    claims,
    emailsDisabled,
    emailTransport,
  } = await getEmailContext({
    emailType: 'RECIPIENT',
    source: {
      type: 'team',
      teamId: envelope.teamId,
    },
    meta: envelope.documentMeta,
  });
  if (envelope.user.disabled || emailsDisabled) {
    return;
  }
  const customEmail = envelope?.documentMeta;
  const isDirectTemplate = envelope.source === DocumentSource.TEMPLATE_DIRECT_LINK;
  const recipientEmailType = RECIPIENT_ROLE_TO_EMAIL_TYPE[recipient.role];
  const { email, name } = recipient;
  const selfSigner = email === user.email;
  const i18n = await getI18nInstance(emailLanguage);
  const recipientActionVerb = i18n._(RECIPIENT_ROLES_DESCRIPTION[recipient.role].actionVerb).toLowerCase();
  let emailMessage = customEmail?.message || '';
  let emailSubject = i18n._(
    /*i18n*/
    {
      id: 'gkdan+',
      values: {
        recipientActionVerb,
      },
    },
  );
  if (selfSigner) {
    emailMessage = i18n._(
      /*i18n*/
      {
        id: 'gypFA5',
        values: {
          0: `"${envelope.title}"`,
          recipientActionVerb,
        },
      },
    );
    emailSubject = i18n._(
      /*i18n*/
      {
        id: 'F06Znj',
        values: {
          recipientActionVerb,
        },
      },
    );
  }
  if (isDirectTemplate) {
    emailMessage = i18n._(
      /*i18n*/
      {
        id: '8G9nE9',
        values: {
          recipientActionVerb,
        },
      },
    );
    emailSubject = i18n._(
      /*i18n*/
      {
        id: 'ex9NI+',
        values: {
          recipientActionVerb,
        },
      },
    );
  }
  if (organisationType === OrganisationType.ORGANISATION) {
    emailSubject = i18n._(
      /*i18n*/
      {
        id: 'RkToeZ',
        values: {
          0: team.name,
          recipientActionVerb,
        },
      },
    );
    emailMessage = customEmail?.message ?? '';
    if (!emailMessage) {
      const inviterName = user.name || '';
      emailMessage = i18n._(
        settings.includeSenderDetails
          ? /*i18n*/
            {
              id: 'ctjWgj',
              values: {
                0: team.name,
                1: envelope.title,
                inviterName,
                recipientActionVerb,
              },
            }
          : /*i18n*/
            {
              id: 'ZS7Lvr',
              values: {
                0: team.name,
                1: envelope.title,
                recipientActionVerb,
              },
            },
      );
    }
  }
  const customEmailTemplate = {
    'signer.name': name,
    'signer.email': email,
    'document.name': envelope.title,
  };
  const assetBaseUrl = EMAIL_ASSET_BASE_URL();
  const signDocumentLink = `${PUBLISHED_APP_URL()}sign/${recipient.token}`;
  const reportUrl = `${PUBLISHED_APP_URL()}report/${recipient.token}`;
  const template = createElement(DocumentInviteEmailTemplate, {
    documentName: envelope.title,
    inviterName: user.name || void 0,
    inviterEmail:
      organisationType === OrganisationType.ORGANISATION ? team?.teamEmail?.email || user.email : user.email,
    assetBaseUrl,
    signDocumentLink,
    customBody: renderCustomEmailTemplate(emailMessage, customEmailTemplate),
    role: recipient.role,
    selfSigner,
    organisationType,
    teamName: team?.name,
    teamEmail: team?.teamEmail?.email,
    includeSenderDetails: settings.includeSenderDetails,
    reportUrl,
  });
  if (isRecipientEmailValidForSending(recipient)) {
    try {
      await assertOrganisationRatesAndLimits({
        organisationId,
        organisationClaim: claims,
        type: 'email',
        count: 1,
      });
    } catch (_err) {
      io.logger.warn({
        msg: 'Recipient signing email dropped: org rate limit exceeded',
        organisationId,
        recipientId: recipient.id,
        envelopeId: envelope.id,
      });
      return;
    }
    await io.runTask('send-signing-email', async () => {
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
      await emailTransport.sendMail({
        to: {
          name: recipient.name,
          address: recipient.email,
        },
        from: senderEmail,
        replyTo: replyToEmail,
        subject: renderCustomEmailTemplate(documentMeta?.subject || emailSubject, customEmailTemplate),
        html,
        text,
        headers: buildEnvelopeEmailHeaders({
          userId,
          envelopeId: envelope.id,
          teamId: envelope.teamId,
        }),
      });
    });
  }
  const sentAt = /* @__PURE__ */ new Date();
  await io.runTask('update-recipient', async () => {
    await prismaWithReplicas.recipient.update({
      where: {
        id: recipient.id,
      },
      data: {
        sendStatus: SendStatus.SENT,
        sentAt,
      },
    });
  });
  await updateRecipientNextReminder({
    recipientId: recipient.id,
    envelopeId: envelope.id,
    sentAt,
    lastReminderSentAt: null,
  });
  await prismaWithReplicas.documentAuditLog.create({
    data: createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT,
      envelopeId: envelope.id,
      user,
      requestMetadata,
      data: {
        emailType: recipientEmailType,
        recipientId: recipient.id,
        recipientName: recipient.name,
        recipientEmail: recipient.email,
        recipientRole: recipient.role,
        isResending: false,
      },
    }),
  });
};

export { run };
