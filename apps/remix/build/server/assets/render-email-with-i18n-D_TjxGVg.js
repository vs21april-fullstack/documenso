import { ResendTransport } from '@documenso/nodemailer-resend';
import { setupI18n } from '@lingui/core';
import { I18nProvider, Trans } from '@lingui/react';
import { Link } from '@react-email/link';
import * as ReactEmail from '@react-email/render';
import { Section } from '@react-email/section';
import { Tailwind } from '@react-email/tailwind';
import { Text } from '@react-email/text';
import { colord } from 'colord';
import { createTransport } from 'nodemailer';
import { createContext, Fragment, useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import {
  _ as __variableDynamicImportRuntimeHelper,
  A as APP_I18N_OPTIONS,
  r as DEFAULT_BRAND_COLORS,
  n as env,
  o as isValidLanguageCode,
  q as SUPPORTED_LANGUAGE_CODES,
} from './server-build-BA7AMcCx.js';

const normalizeMailHeaders = (headers) => {
  if (!headers) {
    return void 0;
  }
  const normalized = {};
  const appendHeader = (key, value) => {
    if (value === null || value === void 0) {
      return;
    }
    const stringValue = String(value);
    normalized[key] = normalized[key] ? `${normalized[key]}, ${stringValue}` : stringValue;
  };
  if (Array.isArray(headers)) {
    for (const { key, value } of headers) {
      appendHeader(key, value);
    }
  } else {
    for (const [key, value] of Object.entries(headers)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          appendHeader(key, item);
        }
        continue;
      }
      if (typeof value === 'object' && value !== null) {
        appendHeader(key, value.value);
        continue;
      }
      appendHeader(key, value);
    }
  }
  if (Object.keys(normalized).length === 0) {
    return void 0;
  }
  return normalized;
};
const VERSION = '1.0.0';
class MailChannelsTransport {
  constructor(options) {
    this.name = 'CloudflareMailTransport';
    this.version = VERSION;
    const { apiKey = '', endpoint = 'https://api.mailchannels.net/tx/v1/send' } = options;
    this._options = {
      apiKey,
      endpoint,
    };
  }
  static makeTransport(options) {
    return new MailChannelsTransport(options);
  }
  send(mail, callback) {
    if (!mail.data.to || !mail.data.from) {
      return callback(new Error('Missing required fields "to" or "from"'), null);
    }
    const mailTo = this.toMailChannelsAddresses(mail.data.to);
    const mailCc = this.toMailChannelsAddresses(mail.data.cc);
    const mailBcc = this.toMailChannelsAddresses(mail.data.bcc);
    const [from] = this.toMailChannelsAddresses(mail.data.from);
    const [replyTo] = this.toMailChannelsAddresses(mail.data.replyTo);
    if (!from) {
      return callback(new Error('Missing required field "from"'), null);
    }
    const requestHeaders = {
      'Content-Type': 'application/json',
    };
    if (this._options.apiKey) {
      requestHeaders['X-Auth-Token'] = this._options.apiKey;
    }
    fetch(this._options.endpoint, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
        from,
        reply_to: replyTo,
        headers: normalizeMailHeaders(mail.data.headers),
        subject: mail.data.subject,
        personalizations: [
          {
            to: mailTo,
            cc: mailCc.length > 0 ? mailCc : void 0,
            bcc: mailBcc.length > 0 ? mailBcc : void 0,
            dkim_domain: env('NEXT_PRIVATE_MAILCHANNELS_DKIM_DOMAIN') || void 0,
            dkim_selector: env('NEXT_PRIVATE_MAILCHANNELS_DKIM_SELECTOR') || void 0,
            dkim_private_key: env('NEXT_PRIVATE_MAILCHANNELS_DKIM_PRIVATE_KEY') || void 0,
          },
        ],
        content: [
          {
            type: 'text/plain',
            value: mail.data.text?.toString('utf-8') ?? '',
          },
          {
            type: 'text/html',
            value: mail.data.html?.toString('utf-8') ?? '',
          },
        ],
      }),
    })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return callback(null, {
            messageId: '',
            envelope: {
              from: mail.data.from,
              to: mail.data.to,
            },
            accepted: mail.data.to,
            rejected: [],
            pending: [],
          });
        }
        res
          .json()
          .then((data) => callback(new Error(`MailChannels error: ${data.message}`), null))
          .catch((err) => callback(err, null));
      })
      .catch((err) => {
        return callback(err, null);
      });
  }
  /**
   * Converts a nodemailer address(s) to an array of MailChannel compatible address.
   */
  toMailChannelsAddresses(address) {
    if (!address) {
      return [];
    }
    if (typeof address === 'string') {
      return [
        {
          email: address,
        },
      ];
    }
    if (Array.isArray(address)) {
      return address.map((address2) => {
        if (typeof address2 === 'string') {
          return {
            email: address2,
          };
        }
        return {
          email: address2.address,
          name: address2.name,
        };
      });
    }
    return [
      {
        email: address.address,
        name: address.name,
      },
    ];
  }
}
const getTransport = () => {
  const transport = env('NEXT_PRIVATE_SMTP_TRANSPORT') ?? 'smtp-auth';
  if (transport === 'mailchannels') {
    return createTransport(
      MailChannelsTransport.makeTransport({
        apiKey: env('NEXT_PRIVATE_MAILCHANNELS_API_KEY'),
        endpoint: env('NEXT_PRIVATE_MAILCHANNELS_ENDPOINT'),
      }),
    );
  }
  if (transport === 'resend') {
    if (!env('NEXT_PRIVATE_RESEND_API_KEY')) {
      throw new Error('Resend transport requires NEXT_PRIVATE_RESEND_API_KEY');
    }
    return createTransport(
      ResendTransport.makeTransport({
        apiKey: env('NEXT_PRIVATE_RESEND_API_KEY'),
      }),
    );
  }
  if (transport === 'smtp-api') {
    if (!env('NEXT_PRIVATE_SMTP_HOST') || !env('NEXT_PRIVATE_SMTP_APIKEY')) {
      throw new Error('SMTP API transport requires NEXT_PRIVATE_SMTP_HOST and NEXT_PRIVATE_SMTP_APIKEY');
    }
    return createTransport({
      host: env('NEXT_PRIVATE_SMTP_HOST'),
      port: Number(env('NEXT_PRIVATE_SMTP_PORT')) || 587,
      secure: env('NEXT_PRIVATE_SMTP_SECURE') === 'true',
      auth: {
        user: env('NEXT_PRIVATE_SMTP_APIKEY_USER') ?? 'apikey',
        pass: env('NEXT_PRIVATE_SMTP_APIKEY') ?? '',
      },
    });
  }
  return createTransport({
    host: env('NEXT_PRIVATE_SMTP_HOST') ?? '127.0.0.1:2500',
    port: Number(env('NEXT_PRIVATE_SMTP_PORT')) || 587,
    secure: env('NEXT_PRIVATE_SMTP_SECURE') === 'true',
    ignoreTLS: env('NEXT_PRIVATE_SMTP_UNSAFE_IGNORE_TLS') === 'true',
    auth: env('NEXT_PRIVATE_SMTP_USERNAME')
      ? {
          user: env('NEXT_PRIVATE_SMTP_USERNAME'),
          pass: env('NEXT_PRIVATE_SMTP_PASSWORD') ?? '',
        }
      : void 0,
    ...(env('NEXT_PRIVATE_SMTP_SERVICE')
      ? {
          service: env('NEXT_PRIVATE_SMTP_SERVICE'),
        }
      : {}),
  });
};
const mailer = getTransport();
const BrandingContext = createContext(void 0);
const defaultBrandingContextValue = {
  brandingEnabled: false,
  brandingUrl: '',
  brandingLogo: '',
  brandingCompanyDetails: '',
  brandingHidePoweredBy: false,
};
const BrandingProvider = (props) => {
  return /* @__PURE__ */ jsx(BrandingContext.Provider, {
    value: props.branding ?? defaultBrandingContextValue,
    children: props.children,
  });
};
const useBranding = () => {
  const ctx = useContext(BrandingContext);
  if (!ctx) {
    throw new Error('Branding context not found');
  }
  return ctx;
};
const getSafeBrandingUrl = (brandingUrl) => {
  if (!brandingUrl) {
    return null;
  }
  const parsed = URL.parse(brandingUrl);
  if (parsed?.protocol !== 'http:' && parsed?.protocol !== 'https:') {
    return null;
  }
  return parsed.href;
};
const TemplateFooter = ({ isDocument = true, reportUrl }) => {
  const branding = useBranding();
  const safeBrandingUrl = branding.brandingEnabled ? getSafeBrandingUrl(branding.brandingUrl) : null;
  return /* @__PURE__ */ jsxs(Section, {
    children: [
      reportUrl &&
        /* @__PURE__ */ jsx(Text, {
          className: 'my-4 text-base text-muted-foreground',
          children: /* @__PURE__ */ jsx(Trans, {
            .../*i18n*/
            {
              id: 'E4ee24',
              components: {
                0: /* @__PURE__ */ jsx(Link, { className: 'text-primary', href: reportUrl }),
              },
            },
          }),
        }),
      isDocument &&
        !branding.brandingHidePoweredBy &&
        /* @__PURE__ */ jsx(Text, {
          className: 'my-4 text-base text-muted-foreground',
          children: /* @__PURE__ */ jsx(Trans, {
            .../*i18n*/
            {
              id: 'yYJVSP',
              components: {
                0: /* @__PURE__ */ jsx(Link, {
                  className: 'text-primary',
                  href: 'https://api.omni00.com/published-apps/17/160/',
                }),
              },
            },
          }),
        }),
      branding.brandingEnabled &&
        branding.brandingCompanyDetails &&
        /* @__PURE__ */ jsx(Text, {
          className: 'my-8 text-muted-foreground text-sm',
          children: branding.brandingCompanyDetails.split('\n').map((line, idx) => {
            return /* @__PURE__ */ jsxs(Fragment, { children: [idx > 0 && /* @__PURE__ */ jsx('br', {}), line] }, idx);
          }),
        }),
      branding.brandingEnabled &&
        safeBrandingUrl &&
        /* @__PURE__ */ jsx(Text, {
          className: 'my-8 text-muted-foreground text-sm',
          children: /* @__PURE__ */ jsx(Link, { href: safeBrandingUrl, target: '_blank', children: safeBrandingUrl }),
        }),
      !branding.brandingEnabled &&
        /* @__PURE__ */ jsxs(Text, {
          className: 'my-8 text-muted-foreground text-sm',
          children: [
            'Omni Sign',
            /* @__PURE__ */ jsx('br', {}),
            '2261 Market Street, #5211, San Francisco, CA 94114, USA',
          ],
        }),
    ],
  });
};
function remember(name, getValue) {
  const thusly = globalThis;
  if (!thusly.__documenso_util_remember) {
    thusly.__documenso_util_remember = /* @__PURE__ */ new Map();
  }
  if (!thusly.__documenso_util_remember.has(name)) {
    thusly.__documenso_util_remember.set(name, getValue());
  }
  return thusly.__documenso_util_remember.get(name);
}
async function loadCatalog(lang) {
  const extension = env('NODE_ENV') === 'development' ? 'po' : 'mjs';
  const { messages } = await __variableDynamicImportRuntimeHelper(
    /* @__PURE__ */ Object.assign({
      '../../translations/de/web.mjs': () => import('./web-C73fugKU.js'),
      '../../translations/de/web.po': () => import('./web-DYdvybBP.js'),
      '../../translations/en/web.mjs': () => import('./web-pdPgVIjw.js'),
      '../../translations/en/web.po': () => import('./web-BlEOuJ8A.js'),
      '../../translations/es/web.mjs': () => import('./web-AZW9eRzx.js'),
      '../../translations/es/web.po': () => import('./web-DOEyksdF.js'),
      '../../translations/fr/web.mjs': () => import('./web-c2Le3ab0.js'),
      '../../translations/fr/web.po': () => import('./web-CV6aXMz9.js'),
      '../../translations/it/web.mjs': () => import('./web-Dm5K7Fx1.js'),
      '../../translations/it/web.po': () => import('./web-Bi24mbe_.js'),
      '../../translations/ja/web.mjs': () => import('./web-D5lI3ZJX.js'),
      '../../translations/ja/web.po': () => import('./web-B6GxLHYV.js'),
      '../../translations/ko/web.mjs': () => import('./web-C-A4xt1Y.js'),
      '../../translations/ko/web.po': () => import('./web-CmWBZm87.js'),
      '../../translations/nl/web.mjs': () => import('./web-CqcDgASG.js'),
      '../../translations/nl/web.po': () => import('./web-0mRi3fHW.js'),
      '../../translations/pl/web.mjs': () => import('./web-DU9WsmMj.js'),
      '../../translations/pl/web.po': () => import('./web-YBa_XKPK.js'),
      '../../translations/pt-BR/web.mjs': () => import('./web-BjfRJJ-H.js'),
      '../../translations/pt-BR/web.po': () => import('./web-DTQPFL3X.js'),
      '../../translations/sq/web.po': () => import('./web-Dl4x2Vr6.js'),
      '../../translations/zh/web.mjs': () => import('./web-yKACsJOJ.js'),
      '../../translations/zh/web.po': () => import('./web-6CKPViTr.js'),
    }),
    `../../translations/${lang}/web.${extension}`,
    5,
  );
  return {
    [lang]: messages,
  };
}
const catalogs = Promise.all(SUPPORTED_LANGUAGE_CODES.map(loadCatalog));
const allMessages = async () => {
  return await catalogs.then((catalogs2) =>
    catalogs2.reduce((acc, oneCatalog) => {
      return {
        ...acc,
        ...oneCatalog,
      };
    }, {}),
  );
};
const allI18nInstances = remember('i18n.allI18nInstances', async () => {
  const loadedMessages = await allMessages();
  return SUPPORTED_LANGUAGE_CODES.reduce((acc, lang) => {
    const messages = loadedMessages[lang] ?? {};
    const i18n = setupI18n({
      locale: lang,
      messages: {
        [lang]: messages,
      },
    });
    return {
      ...acc,
      [lang]: i18n,
    };
  }, {});
});
const getI18nInstance = async (lang) => {
  const instances = await allI18nInstances;
  if (!isValidLanguageCode(lang)) {
    return instances[APP_I18N_OPTIONS.sourceLang];
  }
  return instances[lang] ?? instances[APP_I18N_OPTIONS.sourceLang];
};
const normalizeColorToHex = (value) => {
  if (!value) {
    return null;
  }
  const parsed = colord(value);
  if (!parsed.isValid()) {
    return null;
  }
  return parsed.toHex();
};
const resolveEmailBrandingColors = (brandingColors) => {
  if (!brandingColors) {
    return null;
  }
  const resolve = (value, fallback) => normalizeColorToHex(value) ?? fallback;
  return {
    background: resolve(brandingColors.background, DEFAULT_BRAND_COLORS.background),
    foreground: resolve(brandingColors.foreground, DEFAULT_BRAND_COLORS.foreground),
    muted: resolve(brandingColors.muted, DEFAULT_BRAND_COLORS.muted),
    mutedForeground: resolve(brandingColors.mutedForeground, DEFAULT_BRAND_COLORS.mutedForeground),
    primary: resolve(brandingColors.primary, DEFAULT_BRAND_COLORS.primary),
    primaryForeground: resolve(brandingColors.primaryForeground, DEFAULT_BRAND_COLORS.primaryForeground),
    secondary: resolve(brandingColors.secondary, DEFAULT_BRAND_COLORS.secondary),
    secondaryForeground: resolve(brandingColors.secondaryForeground, DEFAULT_BRAND_COLORS.secondaryForeground),
    accent: resolve(brandingColors.accent, DEFAULT_BRAND_COLORS.accent),
    accentForeground: resolve(brandingColors.accentForeground, DEFAULT_BRAND_COLORS.accentForeground),
    destructive: resolve(brandingColors.destructive, DEFAULT_BRAND_COLORS.destructive),
    destructiveForeground: resolve(brandingColors.destructiveForeground, DEFAULT_BRAND_COLORS.destructiveForeground),
    warning: resolve(brandingColors.warning, DEFAULT_BRAND_COLORS.warning),
    border: resolve(brandingColors.border, DEFAULT_BRAND_COLORS.border),
  };
};
const DEFAULT_EMAIL_BRANDING_COLORS = resolveEmailBrandingColors(DEFAULT_BRAND_COLORS) ?? DEFAULT_BRAND_COLORS;
const buildEmailColors = (brandingColors) => {
  const c = brandingColors ?? DEFAULT_EMAIL_BRANDING_COLORS;
  return {
    background: c.background,
    foreground: c.foreground,
    muted: c.muted,
    'muted-foreground': c.mutedForeground,
    primary: c.primary,
    'primary-foreground': c.primaryForeground,
    secondary: c.secondary,
    'secondary-foreground': c.secondaryForeground,
    accent: c.accent,
    'accent-foreground': c.accentForeground,
    destructive: c.destructive,
    'destructive-foreground': c.destructiveForeground,
    warning: c.warning,
    border: c.border,
  };
};
const renderWithI18N = async (element, options) => {
  const { branding, i18n, ...otherOptions } = options ?? {};
  if (!i18n) {
    throw new Error('i18n is required');
  }
  const tailwindColors = buildEmailColors(branding?.brandingColors);
  return ReactEmail.render(
    /* @__PURE__ */ jsx(I18nProvider, {
      i18n,
      children: /* @__PURE__ */ jsx(BrandingProvider, {
        branding,
        children: /* @__PURE__ */ jsx(Tailwind, {
          config: {
            theme: {
              extend: {
                colors: tailwindColors,
              },
            },
          },
          children: element,
        }),
      }),
    }),
    otherOptions,
  );
};
const renderEmailWithI18N = async (component, options) => {
  try {
    const { lang: providedLang, ...otherOptions } = options ?? {};
    const lang = isValidLanguageCode(providedLang) ? providedLang : APP_I18N_OPTIONS.sourceLang;
    const i18n = await getI18nInstance(lang);
    i18n.activate(lang);
    return renderWithI18N(component, {
      i18n,
      ...otherOptions,
    });
  } catch (err) {
    console.error(err);
    throw new Error('Failed to render email');
  }
};

export {
  getI18nInstance as g,
  getSafeBrandingUrl as a,
  MailChannelsTransport as M,
  mailer as m,
  renderEmailWithI18N as r,
  resolveEmailBrandingColors as b,
  TemplateFooter as T,
  useBranding as u,
};
