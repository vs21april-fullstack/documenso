import { SUPPORT_EMAIL } from '../../lib/constants/app.js';
import { useLingui, Trans } from '@lingui/react';
import { match } from 'ts-pattern';
import { Body } from '@react-email/body';
import '@react-email/button';
import '@react-email/column';
import { Container } from '@react-email/container';
import '@react-email/font';
import { Head } from '@react-email/head';
import '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import '@react-email/img';
import '@react-email/link';
import { Preview } from '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { TemplateBrandingLogo } from '../template-components/template-branding-logo.js';
import { TemplateFooter } from '../template-components/template-footer.js';
import { jsxs, jsx } from 'react/jsx-runtime';

const OrganisationLimitAlertEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  organisationName = 'Organisation Name',
  counter = 'email',
  kind = 'quota',
  period = '2026-05'
}) => {
  const {
    _
  } = useLingui();
  const previewText = kind === 'quotaNearing' ?
  /*i18n*/
  {
    id: "2RtWIH"
  } :
  /*i18n*/
  {
    id: "XRwX0n"
  };
  return /*#__PURE__*/jsxs(Html, {
    children: [/*#__PURE__*/jsx(Head, {}), /*#__PURE__*/jsxs(Body, {
      className: "mx-auto my-auto font-sans",
      children: [/*#__PURE__*/jsx(Preview, {
        children: _(previewText)
      }), /*#__PURE__*/jsxs(Section, {
        className: "bg-background text-muted-foreground",
        children: [/*#__PURE__*/jsxs(Container, {
          className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-2 backdrop-blur-sm",
          children: [/*#__PURE__*/jsx(TemplateBrandingLogo, {
            assetBaseUrl: assetBaseUrl,
            className: "mb-4 h-6 p-2"
          }), /*#__PURE__*/jsxs(Section, {
            className: "p-2 text-muted-foreground",
            children: [/*#__PURE__*/jsx(Text, {
              className: "text-center font-medium text-foreground text-lg",
              children: kind === 'quotaNearing' ? /*#__PURE__*/jsx(Trans, {
                id: "2RtWIH"
              }) : /*#__PURE__*/jsx(Trans, {
                id: "XRwX0n"
              })
            }), /*#__PURE__*/jsx("div", {
              className: "mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground",
              children: organisationName
            }), match(kind).with('quota', () => /*#__PURE__*/jsx(Text, {
              className: "text-center text-base",
              children: match(counter).with('document', () => /*#__PURE__*/jsx(Trans, {
                id: "ae1E1d"
              })).with('email', () => /*#__PURE__*/jsx(Trans, {
                id: "ocEsla"
              })).with('api', () => /*#__PURE__*/jsx(Trans, {
                id: "EdVPC8"
              })).exhaustive()
            })).with('rateLimit', () => /*#__PURE__*/jsx(Text, {
              className: "text-center text-base",
              children: match(counter).with('document', () => /*#__PURE__*/jsx(Trans, {
                id: "4AfIg0"
              })).with('email', () => /*#__PURE__*/jsx(Trans, {
                id: "1Wj/Zv"
              })).with('api', () => /*#__PURE__*/jsx(Trans, {
                id: "24Ci00"
              })).exhaustive()
            })).with('quotaNearing', () => /*#__PURE__*/jsx(Text, {
              className: "text-center text-base",
              children: match(counter).with('document', () => /*#__PURE__*/jsx(Trans, {
                id: "rhkxlS"
              })).with('email', () => /*#__PURE__*/jsx(Trans, {
                id: "6cBGAo"
              })).with('api', () => /*#__PURE__*/jsx(Trans, {
                id: "DZc59G"
              })).exhaustive()
            })).exhaustive(), /*#__PURE__*/jsx(Text, {
              className: "text-center text-base",
              children: kind === 'quotaNearing' ? /*#__PURE__*/jsx(Trans, {
                id: "0mb9Jt",
                values: {
                  SUPPORT_EMAIL: SUPPORT_EMAIL
                }
              }) : /*#__PURE__*/jsx(Trans, {
                id: "AYpO4m",
                values: {
                  SUPPORT_EMAIL: SUPPORT_EMAIL
                }
              })
            })]
          })]
        }), /*#__PURE__*/jsx(Hr, {
          className: "mx-auto mt-12 max-w-xl"
        }), /*#__PURE__*/jsx(Container, {
          className: "mx-auto max-w-xl",
          children: /*#__PURE__*/jsx(TemplateFooter, {
            isDocument: false
          })
        })]
      })]
    })]
  });
};

export { OrganisationLimitAlertEmailTemplate, OrganisationLimitAlertEmailTemplate as default };
//# sourceMappingURL=organisation-limit-alert.js.map
