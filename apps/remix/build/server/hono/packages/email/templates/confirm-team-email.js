import { formatTeamUrl } from '../../lib/utils/teams.js';
import { useLingui, Trans } from '@lingui/react';
import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import '@react-email/column';
import { Container } from '@react-email/container';
import '@react-email/font';
import { Head } from '@react-email/head';
import '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import '@react-email/img';
import { Link } from '@react-email/link';
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

const ConfirmTeamEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  teamName = 'Team Name',
  teamUrl = 'demo',
  token = ''
}) => {
  const {
    _
  } = useLingui();
  const previewText =
  /*i18n*/
  {
    id: "3YyK2l",
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
        className: "bg-background",
        children: [/*#__PURE__*/jsxs(Container, {
          className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid px-2 pt-2 backdrop-blur-sm",
          children: [/*#__PURE__*/jsx(TemplateBrandingLogo, {
            assetBaseUrl: assetBaseUrl,
            className: "mb-4 h-6 p-2"
          }), /*#__PURE__*/jsx(Section, {
            children: /*#__PURE__*/jsx(TemplateImage, {
              className: "mx-auto",
              assetBaseUrl: assetBaseUrl,
              staticAsset: "mail-open.png"
            })
          }), /*#__PURE__*/jsxs(Section, {
            className: "p-2 text-muted-foreground",
            children: [/*#__PURE__*/jsx(Text, {
              className: "text-center font-medium text-foreground text-lg",
              children: /*#__PURE__*/jsx(Trans, {
                id: "8Jr0yN"
              })
            }), /*#__PURE__*/jsx(Text, {
              className: "text-center text-base",
              children: /*#__PURE__*/jsx(Trans, {
                id: "trWZzS",
                values: {
                  teamName: teamName
                },
                components: {
                  0: /*#__PURE__*/jsx("span", {
                    className: "font-bold"
                  })
                }
              })
            }), /*#__PURE__*/jsx("div", {
              className: "mx-auto mt-6 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground",
              children: formatTeamUrl(teamUrl, baseUrl)
            }), /*#__PURE__*/jsxs(Section, {
              className: "mt-6",
              children: [/*#__PURE__*/jsx(Text, {
                className: "my-0 text-sm",
                children: /*#__PURE__*/jsx(Trans, {
                  id: "W9s3Fi",
                  values: {
                    teamName: teamName
                  },
                  components: {
                    0: /*#__PURE__*/jsx("strong", {})
                  }
                })
              }), /*#__PURE__*/jsxs("ul", {
                className: "mt-2 mb-0",
                children: [/*#__PURE__*/jsx("li", {
                  className: "text-sm",
                  children: /*#__PURE__*/jsx(Trans, {
                    id: "2waZT+"
                  })
                }), /*#__PURE__*/jsx("li", {
                  className: "mt-1 text-sm",
                  children: /*#__PURE__*/jsx(Trans, {
                    id: "sj1/4f"
                  })
                }), /*#__PURE__*/jsx("li", {
                  className: "mt-1 text-sm",
                  children: /*#__PURE__*/jsx(Trans, {
                    id: "DXKvlr"
                  })
                })]
              }), /*#__PURE__*/jsx(Text, {
                className: "mt-2 text-sm",
                children: /*#__PURE__*/jsx(Trans, {
                  id: "jRQJTw",
                  components: {
                    0: /*#__PURE__*/jsx(Link, {
                      href: `${baseUrl}/settings/teams`
                    })
                  }
                })
              })]
            }), /*#__PURE__*/jsx(Section, {
              className: "mt-8 mb-6 text-center",
              children: /*#__PURE__*/jsx(Button, {
                className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline",
                href: `${baseUrl}/team/verify/email/${token}`,
                children: /*#__PURE__*/jsx(Trans, {
                  id: "g3UF2V"
                })
              })
            })]
          }), /*#__PURE__*/jsx(Text, {
            className: "text-center text-muted-foreground text-xs",
            children: /*#__PURE__*/jsx(Trans, {
              id: "3fVAu/"
            })
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

export { ConfirmTeamEmailTemplate };
//# sourceMappingURL=confirm-team-email.js.map
