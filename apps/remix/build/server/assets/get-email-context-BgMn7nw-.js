import { b as resolveEmailBrandingColors, M as MailChannelsTransport, m as mailer } from "./render-email-with-i18n-DfpWuZW_.js";
import { Z as ZCssVarsSchema, N as NEXT_PUBLIC_WEBAPP_URL, r as DOCUMENSO_ENCRYPTION_SECONDARY_KEY, s as symmetricDecrypt, p as prismaWithReplicas, t as logger, D as DOCUMENSO_INTERNAL_EMAIL, v as AppError, w as AppErrorCode, I as IS_BILLING_ENABLED, x as extractDerivedTeamSettings } from "./server-build-Iwbpv6Jl.js";
import { EmailDomainStatus } from "@prisma/client";
import { match, P } from "ts-pattern";
import { ResendTransport } from "@documenso/nodemailer-resend";
import { createTransport } from "nodemailer";
import { z } from "zod";
const teamGlobalSettingsToBranding = (settings, teamId, hidePoweredBy) => {
  const parsedColors = settings.brandingColors ? ZCssVarsSchema.safeParse(settings.brandingColors) : null;
  const resolvedBrandingColors = resolveEmailBrandingColors(parsedColors?.success ? parsedColors.data : null);
  return {
    ...settings,
    brandingLogo: settings.brandingEnabled && settings.brandingLogo ? `${NEXT_PUBLIC_WEBAPP_URL()}/api/branding/logo/team/${teamId}` : "",
    brandingHidePoweredBy: hidePoweredBy,
    brandingColors: resolvedBrandingColors ?? void 0
  };
};
const organisationGlobalSettingsToBranding = (settings, organisationId, hidePoweredBy) => {
  const parsedColors = settings.brandingColors ? ZCssVarsSchema.safeParse(settings.brandingColors) : null;
  const resolvedBrandingColors = resolveEmailBrandingColors(parsedColors?.success ? parsedColors.data : null);
  return {
    ...settings,
    brandingLogo: settings.brandingEnabled && settings.brandingLogo ? `${NEXT_PUBLIC_WEBAPP_URL()}/api/branding/logo/organisation/${organisationId}` : "",
    brandingHidePoweredBy: hidePoweredBy,
    brandingColors: resolvedBrandingColors ?? void 0
  };
};
const buildTransport = (config) => {
  switch (config.type) {
    case "MAILCHANNELS":
      return createTransport(MailChannelsTransport.makeTransport({
        apiKey: config.apiKey,
        endpoint: config.endpoint
      }));
    case "RESEND":
      return createTransport(ResendTransport.makeTransport({
        apiKey: config.apiKey
      }));
    case "SMTP_API":
      return createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: config.apiKeyUser ?? "apikey",
          pass: config.apiKey
        }
      });
    case "SMTP_AUTH":
      return createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        ignoreTLS: config.ignoreTLS,
        auth: config.username ? {
          user: config.username,
          pass: config.password ?? ""
        } : void 0,
        ...config.service ? {
          service: config.service
        } : {}
      });
  }
};
const ZSmtpAuthConfigSchema = z.object({
  type: z.literal("SMTP_AUTH"),
  host: z.string().min(1),
  port: z.number().int().positive(),
  secure: z.boolean().default(false),
  ignoreTLS: z.boolean().default(false),
  username: z.string().optional(),
  password: z.string().optional(),
  // Secret — keep in sync with EMAIL_TRANSPORT_SECRET_KEYS.
  service: z.string().optional()
});
const ZSmtpApiConfigSchema = z.object({
  type: z.literal("SMTP_API"),
  host: z.string().min(1),
  port: z.number().int().positive(),
  secure: z.boolean().default(false),
  apiKey: z.string().min(1),
  // Secret — keep in sync with EMAIL_TRANSPORT_SECRET_KEYS.
  apiKeyUser: z.string().optional()
});
const ZResendConfigSchema = z.object({
  type: z.literal("RESEND"),
  apiKey: z.string().min(1)
  // Secret — keep in sync with EMAIL_TRANSPORT_SECRET_KEYS.
});
const ZMailChannelsConfigSchema = z.object({
  type: z.literal("MAILCHANNELS"),
  apiKey: z.string().min(1),
  // Secret — keep in sync with EMAIL_TRANSPORT_SECRET_KEYS.
  endpoint: z.string().optional()
});
const ZEmailTransportConfigSchema = z.discriminatedUnion("type", [ZSmtpAuthConfigSchema, ZSmtpApiConfigSchema, ZResendConfigSchema, ZMailChannelsConfigSchema]);
z.discriminatedUnion("type", [ZSmtpAuthConfigSchema.omit({
  password: true
}), ZSmtpApiConfigSchema.omit({
  apiKey: true
}), ZResendConfigSchema.omit({
  apiKey: true
}), ZMailChannelsConfigSchema.omit({
  apiKey: true
})]);
const decryptEmailTransportConfig = (encrypted) => {
  if (!DOCUMENSO_ENCRYPTION_SECONDARY_KEY) {
    throw new Error("Missing encryption key");
  }
  const decrypted = Buffer.from(symmetricDecrypt({
    key: DOCUMENSO_ENCRYPTION_SECONDARY_KEY,
    data: encrypted
  })).toString("utf-8");
  return ZEmailTransportConfigSchema.parse(JSON.parse(decrypted));
};
const resolveEmailTransport = async (emailTransportId) => {
  const row = await prismaWithReplicas.emailTransport.findUnique({
    where: {
      id: emailTransportId
    }
  });
  if (!row) {
    return null;
  }
  try {
    const config = decryptEmailTransportConfig(row.config);
    const transporter = buildTransport(config);
    return {
      row,
      transporter
    };
  } catch (err) {
    logger.error({
      msg: "Failed to decrypt or build the configured email transport",
      err,
      emailTransportId
    });
    return null;
  }
};
const getEmailContext = async (options) => {
  const {
    source,
    meta
  } = options;
  let emailContext;
  if (source.type === "organisation") {
    emailContext = await handleOrganisationEmailContext(source.organisationId);
  } else {
    emailContext = await handleTeamEmailContext(source.teamId);
  }
  const emailLanguage = meta?.language || emailContext.settings.documentLanguage;
  const transportResolution = emailContext.claims.emailTransportId ? await resolveEmailTransport(emailContext.claims.emailTransportId) : null;
  if (emailContext.claims.emailTransportId && !transportResolution) {
    logger.error({
      msg: "Configured email transport could not be resolved; falling back to the system mailer",
      emailTransportId: emailContext.claims.emailTransportId,
      organisationId: emailContext.organisationId
    });
  }
  const resolvedTransportData = transportResolution ? {
    name: transportResolution.row.fromName,
    address: transportResolution.row.fromAddress,
    transport: transportResolution.transporter
  } : {
    name: DOCUMENSO_INTERNAL_EMAIL.name,
    address: DOCUMENSO_INTERNAL_EMAIL.address,
    transport: mailer
  };
  if (options.emailType === "INTERNAL") {
    return {
      ...emailContext,
      emailTransport: resolvedTransportData.transport,
      senderEmail: {
        name: resolvedTransportData.name,
        address: resolvedTransportData.address
      },
      replyToEmail: void 0,
      emailLanguage
    };
  }
  const replyToEmail = meta?.emailReplyTo || emailContext.settings.emailReplyTo || void 0;
  const senderEmailId = match(meta?.emailId).with(P.string, (emailId) => emailId).with(void 0, () => emailContext.settings.emailId).with(null, () => null).exhaustive();
  const foundSenderEmail = emailContext.allowedEmails.find((email) => email.id === senderEmailId);
  if (!foundSenderEmail) {
    emailContext.settings.emailId = null;
  }
  if (foundSenderEmail) {
    return {
      ...emailContext,
      emailTransport: mailer,
      senderEmail: {
        name: foundSenderEmail.emailName,
        address: foundSenderEmail.email
      },
      replyToEmail,
      emailLanguage
    };
  }
  return {
    ...emailContext,
    emailTransport: resolvedTransportData.transport,
    senderEmail: {
      name: resolvedTransportData.name,
      address: resolvedTransportData.address
    },
    replyToEmail,
    emailLanguage
  };
};
const handleOrganisationEmailContext = async (organisationId) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: {
      id: organisationId
    },
    include: {
      owner: {
        select: {
          disabled: true
        }
      },
      organisationClaim: true,
      organisationGlobalSettings: true,
      emailDomains: {
        omit: {
          privateKey: true
        },
        include: {
          emails: true
        }
      }
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  const claims = organisation.organisationClaim;
  const allowedEmails = getAllowedEmails(organisation);
  const branding = organisationGlobalSettingsToBranding(organisation.organisationGlobalSettings, organisation.id, claims.flags.hidePoweredBy ?? false);
  const allowBrandedEmailColors = !IS_BILLING_ENABLED() || claims.flags.embedSigningWhiteLabel === true;
  if (!allowBrandedEmailColors) {
    branding.brandingColors = void 0;
  }
  return {
    allowedEmails,
    branding,
    settings: organisation.organisationGlobalSettings,
    claims,
    emailsDisabled: organisation.owner.disabled || claims.flags.disableEmails === true,
    organisationId: organisation.id,
    organisationType: organisation.type
  };
};
const handleTeamEmailContext = async (teamId) => {
  const team = await prismaWithReplicas.team.findFirst({
    where: {
      id: teamId
    },
    include: {
      teamGlobalSettings: true,
      organisation: {
        include: {
          owner: {
            select: {
              id: true,
              disabled: true
            }
          },
          organisationClaim: true,
          organisationGlobalSettings: true,
          emailDomains: {
            omit: {
              privateKey: true
            },
            include: {
              emails: true
            }
          }
        }
      }
    }
  });
  if (!team) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  const organisation = team.organisation;
  const claims = organisation.organisationClaim;
  const allowedEmails = getAllowedEmails(organisation);
  const teamSettings = extractDerivedTeamSettings(organisation.organisationGlobalSettings, team.teamGlobalSettings);
  const branding = teamGlobalSettingsToBranding(teamSettings, teamId, claims.flags.hidePoweredBy ?? false);
  const allowBrandedEmailColors = !IS_BILLING_ENABLED() || claims.flags.embedSigningWhiteLabel === true;
  if (!allowBrandedEmailColors) {
    branding.brandingColors = void 0;
  }
  return {
    allowedEmails,
    branding,
    settings: teamSettings,
    claims,
    emailsDisabled: organisation.owner.disabled || claims.flags.disableEmails === true,
    organisationId: organisation.id,
    organisationType: organisation.type
  };
};
const getAllowedEmails = (organisation) => {
  if (!organisation.organisationClaim.flags.emailDomains) {
    return [];
  }
  return organisation.emailDomains.filter((emailDomain) => emailDomain.status === EmailDomainStatus.ACTIVE).flatMap((emailDomain) => emailDomain.emails);
};
export {
  getEmailContext as g
};
