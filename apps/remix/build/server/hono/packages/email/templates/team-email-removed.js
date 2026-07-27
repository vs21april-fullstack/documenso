import { formatTeamUrl } from '../../lib/utils/teams.js';
import { useLingui, Trans } from '@lingui/react';
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
import { TemplateImage } from '../template-components/template-image.js';
import { jsxs, jsx } from 'react/jsx-runtime';

const TeamEmailRemovedTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  teamEmail = 'example@documenso.com',
  teamName = 'Team Name',
  teamUrl = 'demo'
}) => {
  const {
    _
  } = useLingui();
  const previewText =
  /*i18n*/
  {
    id: "BqcTIZ",
    values: {
      teamName: teamName
    }
  };
  return /*#__PURE__*/jsxs(Html, {
    children: [/*#__PURE__*/jsx(Head, {}), /*#__PURE__*/jsxs(Body, {
      className: "mx-auto my-auto font-sans",
      children: [/*#__PURE__*/jsx(Preview, {
        children: _(previewText)
      }), /*#__PURE__*/jsxs(Section, {
        className: "bg-background text-muted-foreground",
        children: [/*#__PURE__*/jsxs(Container, {
          className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid px-2 pt-2 backdrop-blur-sm",
          children: [/*#__PURE__*/jsx(TemplateBrandingLogo, {
            assetBaseUrl: assetBaseUrl,
            className: "mb-4 h-6 p-2"
          }), /*#__PURE__*/jsx(Section, {
            children: /*#__PURE__*/jsx(TemplateImage, {
              className: "mx-auto",
              assetBaseUrl: assetBaseUrl,
              staticAsset: "mail-open-alert.png"
            })
          }), /*#__PURE__*/jsxs(Section, {
            className: "p-2 text-muted-foreground",
            children: [/*#__PURE__*/jsx(Text, {
              className: "text-center font-medium text-foreground text-lg",
              children: /*#__PURE__*/jsx(Trans, {
                id: "qRJvpA"
              })
            }), /*#__PURE__*/jsx(Text, {
              className: "my-1 text-center text-base",
              children: /*#__PURE__*/jsx(Trans, {
                id: "U2LI0R",
                values: {
                  teamEmail: teamEmail
                },
                components: {
                  0: /*#__PURE__*/jsx("span", {
                    className: "font-bold"
                  })
                }
              })
            }), /*#__PURE__*/jsx("div", {
              className: "mx-auto mt-2 mb-6 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground",
              children: formatTeamUrl(teamUrl, baseUrl)
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

export { TeamEmailRemovedTemplate };
//# sourceMappingURL=team-email-removed.js.map
