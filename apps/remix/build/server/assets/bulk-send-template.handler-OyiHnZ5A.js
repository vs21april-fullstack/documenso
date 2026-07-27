import { jsxs, jsx } from "react/jsx-runtime";
import { useLingui, Trans } from "@lingui/react";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { T as TemplateFooter, g as getI18nInstance, r as renderEmailWithI18N } from "./render-email-with-i18n-BpYjTW2C.js";
import { p as prismaWithReplicas, K as mapDocumentIdToSecondaryId, L as IS_INSTANCE_CSC_MODE, M as CSC_INSTANCE_SIGNATURE_LEVEL, Q as SignatureLevel, v as AppError, w as AppErrorCode, T as getEnvelopeWhereInput, V as getOrganisationTemplateWhereInput, W as buildTeamWhereQuery, X as mapSecondaryIdToTemplateId, Y as getTeamSettings, $ as extractDocumentAuthMethods, a0 as ZDefaultRecipientsSchema, a1 as ZRecipientAuthOptionsSchema, a2 as createRecipientAuthOptions, h as getFileServerSide, a3 as insertFormValuesInPdf, a4 as putNormalizedPdfFileServerSide, a5 as prefixedId, g as assertOrganisationRatesAndLimits, a6 as ZSignatureLevelSchema, a7 as extractDerivedDocumentMeta, a8 as createDocumentAuthOptions, a9 as DEFAULT_DOCUMENT_DATE_FORMAT, aa as ZFieldMetaSchema, k as createDocumentAuditLogData, l as DOCUMENT_AUDIT_LOG_TYPE, ab as triggerWebhook, ac as ZWebhookDocumentSchema, ad as mapEnvelopeToWebhookDocumentPayload, ae as ZRadioFieldMeta, af as ZCheckboxFieldMeta, ag as ZDropdownFieldMeta, ah as getTemplateById, ai as sendDocument, N as NEXT_PUBLIC_WEBAPP_URL, aj as zEmail } from "./server-build-BNclrAgx.js";
import { EnvelopeType, FolderType, DocumentSource, SigningStatus, SendStatus, RecipientRole, WebhookTriggerEvents } from "@prisma/client";
import { DateTime } from "luxon";
import { match } from "ts-pattern";
import { nanoid } from "nanoid";
import { parse } from "csv-parse/sync";
import { createElement } from "react";
import { z } from "zod";
import { g as getEmailContext } from "./get-email-context-DtuzhfDZ.js";
import "@documenso/nodemailer-resend";
import "nodemailer";
import "@react-email/link";
import "colord";
import "@react-email/render";
import "@react-email/tailwind";
import "@lingui/core";
import "node:stream";
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
const BulkSendCompleteEmail = ({
  userName,
  templateName,
  totalProcessed,
  successCount,
  failedCount,
  errors
}) => {
  const {
    _
  } = useLingui();
  const previewText = (
    /*i18n*/
    {
      id: "MSFlwc",
      values: {
        templateName
      }
    }
  );
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsxs(Body, { className: "mx-auto my-auto bg-background font-sans", children: [
      /* @__PURE__ */ jsx(Preview, { children: _(previewText) }),
      /* @__PURE__ */ jsxs(Section, { children: [
        /* @__PURE__ */ jsx(Container, { className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(Section, { children: [
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
          {
            id: "Wu9nw4",
            values: {
              userName
            }
          } }) }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
          {
            id: "Gq2nhO",
            values: {
              templateName
            }
          } }) }),
          /* @__PURE__ */ jsx(Text, { className: "font-semibold text-lg", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
          {
            id: "ug4N1t"
          } }) }),
          /* @__PURE__ */ jsxs("ul", { className: "my-2 ml-4 list-inside list-disc", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
            {
              id: "5cDbgy",
              values: {
                totalProcessed
              }
            } }) }),
            /* @__PURE__ */ jsx("li", { className: "mt-1", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
            {
              id: "L06obu",
              values: {
                successCount
              }
            } }) }),
            /* @__PURE__ */ jsx("li", { className: "mt-1", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
            {
              id: "yekj0I",
              values: {
                failedCount
              }
            } }) })
          ] }),
          errors && errors.length > 0 && /* @__PURE__ */ jsxs(Section, { className: "mt-4", children: [
            /* @__PURE__ */ jsx(Text, { className: "font-semibold text-lg", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
            {
              id: "2+LtVY"
            } }) }),
            /* @__PURE__ */ jsx("ul", { className: "my-2 ml-4 list-inside list-disc", children: errors.map((error, index) => /* @__PURE__ */ jsx("li", { className: "mt-1 text-destructive text-sm", children: error }, index)) })
          ] }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
          {
            id: "Eg+VGn"
          } }) })
        ] }) }),
        /* @__PURE__ */ jsx(Container, { className: "mx-auto max-w-xl", children: /* @__PURE__ */ jsx(TemplateFooter, { isDocument: false }) })
      ] })
    ] })
  ] });
};
const incrementDocumentId = async () => {
  const documentIdCounter = await prismaWithReplicas.counter.update({
    where: {
      id: "document"
    },
    data: {
      value: {
        increment: 1
      }
    }
  });
  return {
    documentId: documentIdCounter.value,
    formattedDocumentId: mapDocumentIdToSecondaryId(documentIdCounter.value)
  };
};
const resolveSignatureLevel = ({
  requested,
  strict = false
} = {}) => {
  const isCscInstance = IS_INSTANCE_CSC_MODE();
  const instanceDefault = isCscInstance ? CSC_INSTANCE_SIGNATURE_LEVEL() : SignatureLevel.SES;
  if (requested === void 0) {
    return instanceDefault;
  }
  const isCompatible = isCscInstance ? requested !== SignatureLevel.SES : requested === SignatureLevel.SES;
  if (isCompatible) {
    return requested;
  }
  if (strict) {
    throw new AppError(AppErrorCode.CSC_INSTANCE_MODE_MISMATCH, {
      message: isCscInstance ? `signatureLevel '${requested}' is not supported on a CSC-mode instance — every recipient must sign through the configured Trust Service Provider.` : `signatureLevel '${requested}' is not supported on a non-CSC instance — only 'SES' is permitted unless the CSC signing transport is configured.`
    });
  }
  return instanceDefault;
};
const getUpdatedFieldMeta = (field, prefillField) => {
  if (!prefillField) {
    return field.fieldMeta;
  }
  const advancedField = ["NUMBER", "RADIO", "CHECKBOX", "DROPDOWN", "TEXT"].includes(field.type);
  if (!advancedField) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: `Field ${field.id} is not an advanced field and cannot have field meta information. Allowed types: NUMBER, RADIO, CHECKBOX, DROPDOWN, TEXT.`
    });
  }
  const existingMeta = field.fieldMeta || {};
  return match(prefillField).with({
    type: "text"
  }, (field2) => {
    if (typeof field2.value !== "string") {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid value for TEXT field ${field2.id}: expected string, got ${typeof field2.value}`
      });
    }
    const meta = {
      ...existingMeta,
      type: "text",
      label: field2.label,
      placeholder: field2.placeholder,
      text: field2.value
    };
    return meta;
  }).with({
    type: "number"
  }, (field2) => {
    if (typeof field2.value !== "string") {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid value for NUMBER field ${field2.id}: expected string, got ${typeof field2.value}`
      });
    }
    const meta = {
      ...existingMeta,
      type: "number",
      label: field2.label,
      placeholder: field2.placeholder,
      value: field2.value
    };
    return meta;
  }).with({
    type: "radio"
  }, (field2) => {
    if (typeof field2.value !== "string") {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid value for RADIO field ${field2.id}: expected string, got ${typeof field2.value}`
      });
    }
    const result = ZRadioFieldMeta.safeParse(existingMeta);
    if (!result.success) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid field meta for RADIO field ${field2.id}`
      });
    }
    const radioMeta = result.data;
    const valueExists = radioMeta.values?.some((option) => option.value === field2.value);
    if (!valueExists) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Value "${field2.value}" not found in options for RADIO field ${field2.id}`
      });
    }
    const newValues = radioMeta.values?.map((option) => ({
      ...option,
      checked: option.value === field2.value
    }));
    const meta = {
      ...existingMeta,
      type: "radio",
      label: field2.label,
      values: newValues,
      direction: radioMeta.direction ?? "vertical"
    };
    return meta;
  }).with({
    type: "checkbox"
  }, (field2) => {
    const result = ZCheckboxFieldMeta.safeParse(existingMeta);
    if (!result.success) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid field meta for CHECKBOX field ${field2.id}`
      });
    }
    const checkboxMeta = result.data;
    if (!field2.value) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Value is required for CHECKBOX field ${field2.id}`
      });
    }
    const fieldValue = field2.value;
    for (const value of fieldValue) {
      const valueExists = checkboxMeta.values?.some((option) => option.value === value);
      if (!valueExists) {
        throw new AppError(AppErrorCode.INVALID_BODY, {
          message: `Value "${value}" not found in options for CHECKBOX field ${field2.id}`
        });
      }
    }
    const newValues = checkboxMeta.values?.map((option) => ({
      ...option,
      checked: fieldValue.includes(option.value)
    }));
    const meta = {
      ...existingMeta,
      type: "checkbox",
      label: field2.label,
      values: newValues,
      direction: checkboxMeta.direction ?? "vertical"
    };
    return meta;
  }).with({
    type: "dropdown"
  }, (field2) => {
    const result = ZDropdownFieldMeta.safeParse(existingMeta);
    if (!result.success) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Invalid field meta for DROPDOWN field ${field2.id}`
      });
    }
    const dropdownMeta = result.data;
    const valueExists = dropdownMeta.values?.some((option) => option.value === field2.value);
    if (!valueExists) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Value "${field2.value}" not found in options for DROPDOWN field ${field2.id}`
      });
    }
    const meta = {
      ...existingMeta,
      type: "dropdown",
      label: field2.label,
      defaultValue: field2.value
    };
    return meta;
  }).otherwise(() => field.fieldMeta);
};
const createDocumentFromTemplate = async ({
  id,
  externalId,
  userId,
  teamId,
  recipients,
  customDocumentData = [],
  override,
  requestMetadata,
  folderId,
  prefillFields,
  attachments,
  formValues
}) => {
  const templateInclude = {
    recipients: {
      include: {
        fields: true
      }
    },
    envelopeItems: {
      include: {
        documentData: true
      }
    },
    documentMeta: true
  };
  const {
    envelopeWhereInput,
    team: callerTeam
  } = await getEnvelopeWhereInput({
    id,
    type: EnvelopeType.TEMPLATE,
    userId,
    teamId
  });
  const [teamTemplate, organisationTemplate] = await Promise.all([prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    include: templateInclude
  }), prismaWithReplicas.envelope.findFirst({
    where: getOrganisationTemplateWhereInput({
      id,
      organisationId: callerTeam.organisationId,
      teamRole: callerTeam.currentTeamRole
    }),
    include: templateInclude
  })]);
  const template = teamTemplate ?? organisationTemplate;
  if (!template) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: "Template not found"
    });
  }
  if (folderId) {
    const folder = await prismaWithReplicas.folder.findUnique({
      where: {
        id: folderId,
        type: FolderType.DOCUMENT,
        team: buildTeamWhereQuery({
          teamId,
          userId
        })
      }
    });
    if (!folder) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: "Folder not found"
      });
    }
  }
  const legacyTemplateId = mapSecondaryIdToTemplateId(template.secondaryId);
  const finalEnvelopeTitle = override?.title || template.title;
  if (template.envelopeItems.length < 1) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: "Template must have at least 1 envelope item"
    });
  }
  const settings = await getTeamSettings({
    userId,
    teamId
  });
  recipients.forEach((recipient) => {
    const foundRecipient = template.recipients.find((templateRecipient) => templateRecipient.id === recipient.id);
    if (!foundRecipient) {
      throw new AppError(AppErrorCode.INVALID_BODY, {
        message: `Recipient with ID ${recipient.id} not found in the template.`
      });
    }
  });
  const {
    documentAuthOption: templateAuthOptions
  } = extractDocumentAuthMethods({
    documentAuth: template.authOptions
  });
  const finalRecipients = template.recipients.map((templateRecipient) => {
    const foundRecipient = recipients.find((recipient) => recipient.id === templateRecipient.id);
    return {
      templateRecipientId: templateRecipient.id,
      fields: templateRecipient.fields,
      name: foundRecipient ? foundRecipient.name ?? "" : templateRecipient.name,
      email: foundRecipient ? foundRecipient.email : templateRecipient.email,
      role: templateRecipient.role,
      signingOrder: foundRecipient?.signingOrder ?? templateRecipient.signingOrder,
      authOptions: templateRecipient.authOptions,
      token: nanoid()
    };
  });
  const defaultRecipients = settings.defaultRecipients ? ZDefaultRecipientsSchema.parse(settings.defaultRecipients) : [];
  const defaultRecipientsFinal = defaultRecipients.map((recipient) => {
    const authOptions = ZRecipientAuthOptionsSchema.parse({});
    return {
      templateRecipientId: -1,
      fields: [],
      name: recipient.name || recipient.email,
      email: recipient.email,
      role: recipient.role,
      signingOrder: null,
      authOptions: createRecipientAuthOptions({
        accessAuth: authOptions.accessAuth,
        actionAuth: authOptions.actionAuth
      }),
      token: nanoid()
    };
  });
  const allFinalRecipients = [...finalRecipients, ...defaultRecipientsFinal];
  const oldEnvelopeItemToNewEnvelopeItemIdMap = {};
  const envelopeItemsToCreate = await Promise.all(template.envelopeItems.map(async (item, i) => {
    let documentDataIdToDuplicate = item.documentDataId;
    const foundCustomDocumentData = customDocumentData.find((customDocumentDataItem) => {
      if (customDocumentDataItem.documentDataId && !customDocumentDataItem.envelopeItemId) {
        return true;
      }
      return customDocumentDataItem.envelopeItemId === item.id;
    });
    if (foundCustomDocumentData) {
      documentDataIdToDuplicate = foundCustomDocumentData.documentDataId;
    }
    const documentDataToDuplicate = await prismaWithReplicas.documentData.findFirst({
      where: {
        id: documentDataIdToDuplicate
      }
    });
    if (!documentDataToDuplicate) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: "Document data not found"
      });
    }
    let buffer = await getFileServerSide(documentDataToDuplicate);
    const titleToUse = item.title || finalEnvelopeTitle;
    if (formValues) {
      buffer = await insertFormValuesInPdf({
        pdf: Buffer.from(buffer),
        formValues
      });
    }
    const duplicatedFile = await putNormalizedPdfFileServerSide({
      name: titleToUse,
      type: "application/pdf",
      arrayBuffer: async () => Promise.resolve(buffer)
    });
    const newDocumentData = await prismaWithReplicas.documentData.create({
      data: {
        type: duplicatedFile.type,
        data: duplicatedFile.data,
        initialData: documentDataToDuplicate.data
      }
    });
    const newEnvelopeItemId = prefixedId("envelope_item");
    oldEnvelopeItemToNewEnvelopeItemIdMap[item.id] = newEnvelopeItemId;
    return {
      id: newEnvelopeItemId,
      title: titleToUse.endsWith(".pdf") ? titleToUse.slice(0, -4) : titleToUse,
      documentDataId: newDocumentData.id,
      order: item.order !== void 0 ? item.order : i + 1
    };
  }));
  await assertOrganisationRatesAndLimits({
    organisationId: callerTeam.organisationId,
    type: "document",
    count: 1
  });
  const incrementedDocumentId = await incrementDocumentId();
  const signatureLevel = resolveSignatureLevel({
    requested: ZSignatureLevelSchema.parse(template.signatureLevel),
    strict: false
  });
  const documentMeta = await prismaWithReplicas.documentMeta.create({
    data: extractDerivedDocumentMeta(settings, {
      subject: override?.subject || template.documentMeta?.subject,
      message: override?.message || template.documentMeta?.message,
      timezone: override?.timezone || template.documentMeta?.timezone,
      dateFormat: override?.dateFormat || template.documentMeta?.dateFormat,
      redirectUrl: override?.redirectUrl || template.documentMeta?.redirectUrl,
      distributionMethod: override?.distributionMethod || template.documentMeta?.distributionMethod,
      emailSettings: override?.emailSettings || template.documentMeta?.emailSettings,
      signingOrder: override?.signingOrder || template.documentMeta?.signingOrder,
      language: override?.language || template.documentMeta?.language || settings.documentLanguage,
      typedSignatureEnabled: override?.typedSignatureEnabled ?? template.documentMeta?.typedSignatureEnabled,
      uploadSignatureEnabled: override?.uploadSignatureEnabled ?? template.documentMeta?.uploadSignatureEnabled,
      drawSignatureEnabled: override?.drawSignatureEnabled ?? template.documentMeta?.drawSignatureEnabled,
      allowDictateNextSigner: override?.allowDictateNextSigner ?? template.documentMeta?.allowDictateNextSigner,
      envelopeExpirationPeriod: override?.envelopeExpirationPeriod ?? template.documentMeta?.envelopeExpirationPeriod
    }, signatureLevel)
  });
  const {
    envelope,
    createdEnvelope
  } = await prismaWithReplicas.$transaction(async (tx) => {
    const envelope2 = await tx.envelope.create({
      data: {
        id: prefixedId("envelope"),
        secondaryId: incrementedDocumentId.formattedDocumentId,
        type: EnvelopeType.DOCUMENT,
        internalVersion: template.internalVersion,
        signatureLevel,
        qrToken: prefixedId("qr"),
        source: DocumentSource.TEMPLATE,
        externalId: externalId || template.externalId,
        templateId: legacyTemplateId,
        // The template this envelope was created from.
        userId,
        folderId,
        teamId,
        title: finalEnvelopeTitle,
        envelopeItems: {
          createMany: {
            data: envelopeItemsToCreate
          }
        },
        authOptions: createDocumentAuthOptions({
          globalAccessAuth: templateAuthOptions.globalAccessAuth,
          globalActionAuth: templateAuthOptions.globalActionAuth
        }),
        visibility: template.visibility || settings.documentVisibility,
        useLegacyFieldInsertion: template.useLegacyFieldInsertion ?? false,
        documentMetaId: documentMeta.id,
        formValues: formValues ?? void 0,
        recipients: {
          createMany: {
            data: allFinalRecipients.map((recipient) => {
              const authOptions = ZRecipientAuthOptionsSchema.parse(recipient?.authOptions);
              return {
                email: recipient.email,
                name: recipient.name,
                role: recipient.role,
                authOptions: createRecipientAuthOptions({
                  accessAuth: authOptions.accessAuth,
                  actionAuth: authOptions.actionAuth
                }),
                sendStatus: recipient.role === RecipientRole.CC ? SendStatus.SENT : SendStatus.NOT_SENT,
                signingStatus: recipient.role === RecipientRole.CC ? SigningStatus.SIGNED : SigningStatus.NOT_SIGNED,
                signingOrder: recipient.signingOrder,
                token: recipient.token
              };
            })
          }
        }
      },
      include: {
        recipients: {
          orderBy: {
            id: "asc"
          }
        },
        envelopeItems: {
          select: {
            id: true
          }
        }
      }
    });
    let fieldsToCreate = [];
    const allTemplateFieldIds = finalRecipients.flatMap((recipient) => recipient.fields.map((field) => field.id));
    if (prefillFields?.length) {
      const invalidFieldIds = prefillFields.map((prefillField) => prefillField.id).filter((id2) => !allTemplateFieldIds.includes(id2));
      if (invalidFieldIds.length > 0) {
        throw new AppError(AppErrorCode.INVALID_BODY, {
          message: `The following field IDs do not exist in the template: ${invalidFieldIds.join(", ")}`
        });
      }
      for (const prefillField of prefillFields) {
        const templateField = finalRecipients.flatMap((recipient) => recipient.fields).find((field) => field.id === prefillField.id);
        if (!templateField) {
          throw new AppError(AppErrorCode.INVALID_BODY, {
            message: `Field with ID ${prefillField.id} not found in the template`
          });
        }
        const expectedType = templateField.type.toLowerCase();
        const actualType = prefillField.type;
        if (expectedType !== actualType) {
          throw new AppError(AppErrorCode.INVALID_BODY, {
            message: `Field type mismatch for field ${prefillField.id}: expected ${expectedType}, got ${actualType}`
          });
        }
      }
    }
    Object.values(allFinalRecipients).forEach(({
      token,
      fields
    }) => {
      const recipient = envelope2.recipients.find((recipient2) => recipient2.token === token);
      if (!recipient) {
        throw new Error("Recipient not found.");
      }
      fieldsToCreate = fieldsToCreate.concat(fields.map((field) => {
        const prefillField = prefillFields?.find((value) => value.id === field.id);
        const payload = {
          envelopeItemId: oldEnvelopeItemToNewEnvelopeItemIdMap[field.envelopeItemId],
          envelopeId: envelope2.id,
          recipientId: recipient.id,
          type: field.type,
          page: field.page,
          positionX: field.positionX,
          positionY: field.positionY,
          width: field.width,
          height: field.height,
          customText: "",
          inserted: false,
          fieldMeta: field.fieldMeta
        };
        if (prefillField) {
          match(prefillField).with({
            type: "date"
          }, (selector) => {
            if (!selector.value) {
              throw new AppError(AppErrorCode.INVALID_BODY, {
                message: `Date value is required for field ${field.id}`
              });
            }
            const date = new Date(selector.value);
            if (isNaN(date.getTime())) {
              throw new AppError(AppErrorCode.INVALID_BODY, {
                message: `Invalid date value for field ${field.id}: ${selector.value}`
              });
            }
            payload.customText = DateTime.fromJSDate(date).toFormat(template.documentMeta?.dateFormat ?? DEFAULT_DOCUMENT_DATE_FORMAT);
            payload.inserted = true;
          }).otherwise((selector) => {
            payload.fieldMeta = getUpdatedFieldMeta(field, selector);
          });
        }
        return payload;
      }));
    });
    await tx.field.createMany({
      data: fieldsToCreate.map((field) => ({
        ...field,
        fieldMeta: field.fieldMeta ? ZFieldMetaSchema.parse(field.fieldMeta) : void 0
      }))
    });
    await tx.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_CREATED,
        envelopeId: envelope2.id,
        metadata: requestMetadata,
        data: {
          title: envelope2.title,
          source: {
            type: DocumentSource.TEMPLATE,
            templateId: legacyTemplateId
          }
        }
      })
    });
    const templateAttachments = await tx.envelopeAttachment.findMany({
      where: {
        envelopeId: template.id
      }
    });
    const attachmentsToCreate = [...templateAttachments.map((attachment) => ({
      envelopeId: envelope2.id,
      type: attachment.type,
      label: attachment.label,
      data: attachment.data
    })), ...(attachments || []).map((attachment) => ({
      envelopeId: envelope2.id,
      type: attachment.type || "link",
      label: attachment.label,
      data: attachment.data
    }))];
    if (attachmentsToCreate.length > 0) {
      await tx.envelopeAttachment.createMany({
        data: attachmentsToCreate
      });
    }
    const createdEnvelope2 = await tx.envelope.findFirst({
      where: {
        id: envelope2.id
      },
      include: {
        documentMeta: true,
        recipients: true
      }
    });
    if (!createdEnvelope2) {
      throw new Error("Document not found");
    }
    return {
      envelope: envelope2,
      createdEnvelope: createdEnvelope2
    };
  });
  await Promise.allSettled([triggerWebhook({
    event: WebhookTriggerEvents.DOCUMENT_CREATED,
    data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(createdEnvelope)),
    userId,
    teamId
  }), triggerWebhook({
    event: WebhookTriggerEvents.TEMPLATE_USED,
    data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(createdEnvelope)),
    userId,
    teamId
  })]);
  return envelope;
};
const ZRecipientRowSchema = z.object({
  name: z.string().optional(),
  email: z.union([zEmail("Value must be a valid email or empty string"), z.string().max(0, {
    message: "Value must be a valid email or empty string"
  })])
});
const run = async ({
  payload,
  io
}) => {
  const {
    userId,
    teamId,
    templateId,
    csvContent,
    sendImmediately,
    requestMetadata
  } = payload;
  const template = await getTemplateById({
    id: {
      type: "templateId",
      id: templateId
    },
    userId,
    teamId
  });
  if (!template) {
    throw new Error("Template not found");
  }
  const rows = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });
  if (rows.length > 100) {
    throw new Error("Maximum 100 rows allowed per upload");
  }
  const {
    recipients
  } = template;
  const csvHeaders = Object.keys(rows[0]);
  const requiredHeaders = recipients.map((_, index) => `recipient_${index + 1}_email`);
  for (const header of requiredHeaders) {
    if (!csvHeaders.includes(header)) {
      throw new Error(`Missing required column: ${header}`);
    }
  }
  const user = await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    },
    select: {
      email: true,
      name: true
    }
  });
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };
  for (const [rowIndex, row] of rows.entries()) {
    try {
      for (const [recipientIndex] of recipients.entries()) {
        const nameKey = `recipient_${recipientIndex + 1}_name`;
        const emailKey = `recipient_${recipientIndex + 1}_email`;
        const parsed = ZRecipientRowSchema.safeParse({
          name: row[nameKey],
          email: row[emailKey]
        });
        if (!parsed.success) {
          throw new Error(`Invalid recipient data provided for ${emailKey}, ${nameKey}: ${parsed.error.issues?.[0]?.message}`);
        }
      }
      const envelope = await io.runTask(`create-document-${rowIndex}`, async () => {
        return await createDocumentFromTemplate({
          id: {
            type: "templateId",
            id: template.id
          },
          userId,
          teamId,
          recipients: recipients.map((recipient, index) => {
            return {
              id: recipient.id,
              email: row[`recipient_${index + 1}_email`] || recipient.email,
              name: row[`recipient_${index + 1}_name`] || recipient.name,
              role: recipient.role,
              signingOrder: recipient.signingOrder
            };
          }),
          requestMetadata: {
            source: "app",
            auth: "session",
            requestMetadata: requestMetadata || {}
          }
        });
      });
      if (sendImmediately) {
        await io.runTask(`send-document-${rowIndex}`, async () => {
          await sendDocument({
            id: {
              type: "envelopeId",
              id: envelope.id
            },
            userId,
            teamId,
            requestMetadata: {
              source: "app",
              auth: "session",
              requestMetadata: requestMetadata || {}
            }
          }).catch((err) => {
            console.error(err);
            throw new AppError("DOCUMENT_SEND_FAILED");
          });
        });
      }
      results.success += 1;
    } catch (error) {
      results.failed += 1;
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      results.errors.push(`Row ${rowIndex + 1}: Was unable to be processed - ${errorMessage}`);
    }
  }
  await io.runTask("send-completion-email", async () => {
    const completionTemplate = createElement(BulkSendCompleteEmail, {
      userName: user.name || user.email,
      templateName: template.title,
      totalProcessed: rows.length,
      successCount: results.success,
      failedCount: results.failed,
      errors: results.errors,
      assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL()
    });
    const {
      branding,
      emailLanguage,
      senderEmail,
      emailTransport
    } = await getEmailContext({
      emailType: "INTERNAL",
      source: {
        type: "team",
        teamId
      }
    });
    const i18n = await getI18nInstance(emailLanguage);
    const [html, text] = await Promise.all([renderEmailWithI18N(completionTemplate, {
      lang: emailLanguage,
      branding
    }), renderEmailWithI18N(completionTemplate, {
      lang: emailLanguage,
      branding,
      plainText: true
    })]);
    await emailTransport.sendMail({
      to: {
        name: user.name || "",
        address: user.email
      },
      from: senderEmail,
      subject: i18n._(
        /*i18n*/
        {
          id: "vE7rCT",
          values: {
            0: template.title
          }
        }
      ),
      html,
      text
    });
  });
};
export {
  run
};
