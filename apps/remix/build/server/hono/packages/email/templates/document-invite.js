import { RECIPIENT_ROLES_DESCRIPTION } from '../../lib/constants/recipient-roles.js';
import { useLingui, Trans } from '@lingui/react';
import { OrganisationType } from '@prisma/client';
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
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { TemplateBrandingLogo } from '../template-components/template-branding-logo.js';
import { TemplateCustomMessageBody } from '../template-components/template-custom-message-body.js';
import { TemplateDocumentInvite } from '../template-components/template-document-invite.js';
import { TemplateFooter } from '../template-components/template-footer.js';
import { jsxs, jsx } from 'react/jsx-runtime';

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
  reportUrl
}) => {
  const {
    _
  } = useLingui();
  const action = _(RECIPIENT_ROLES_DESCRIPTION[role].actionVerb).toLowerCase();
  let previewText =
  /*i18n*/
  {
    id: "gopu1O",
    values: {
      inviterName: inviterName,
      action: action,
      documentName: documentName
    }
  };
  if (organisationType === OrganisationType.ORGANISATION) {
    previewText = includeSenderDetails ?
    /*i18n*/
    {
      id: "2+Jmey",
      values: {
        inviterName: inviterName,
        teamName: teamName,
        action: action,
        documentName: documentName
      }
    } :
    /*i18n*/
    {
      id: "q++KKo",
      values: {
        teamName: teamName,
        action: action,
        documentName: documentName
      }
    };
  }
  if (selfSigner) {
    previewText =
    /*i18n*/
    {
      id: "3RwM9t",
      values: {
        action: action,
        documentName: documentName
      }
    };
  }
  return /*#__PURE__*/jsxs(Html, {
    children: [/*#__PURE__*/jsx(Head, {}), /*#__PURE__*/jsxs(Body, {
      className: "mx-auto my-auto bg-background font-sans",
      children: [/*#__PURE__*/jsx(Preview, {
        children: _(previewText)
      }), /*#__PURE__*/jsxs(Section, {
        children: [/*#__PURE__*/jsx(Container, {
          className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-4 backdrop-blur-sm",
          children: /*#__PURE__*/jsxs(Section, {
            children: [/*#__PURE__*/jsx(TemplateBrandingLogo, {
              assetBaseUrl: assetBaseUrl,
              className: "mb-4 h-6"
            }), /*#__PURE__*/jsx(TemplateDocumentInvite, {
              inviterName: inviterName,
              inviterEmail: inviterEmail,
              documentName: documentName,
              signDocumentLink: signDocumentLink,
              assetBaseUrl: assetBaseUrl,
              role: role,
              selfSigner: selfSigner,
              organisationType: organisationType,
              teamName: teamName,
              includeSenderDetails: includeSenderDetails
            })]
          })
        }), /*#__PURE__*/jsx(Container, {
          className: "mx-auto mt-12 max-w-xl",
          children: /*#__PURE__*/jsxs(Section, {
            children: [organisationType === OrganisationType.PERSONAL && /*#__PURE__*/jsx(Text, {
              className: "my-4 font-semibold text-base",
              children: /*#__PURE__*/jsx(Trans, {
                id: "L/K/DO",
                values: {
                  inviterName: inviterName,
                  inviterEmail: inviterEmail
                },
                components: {
                  0: /*#__PURE__*/jsx(Link, {
                    className: "font-normal text-muted-foreground",
                    href: `mailto:${inviterEmail}`
                  })
                }
              })
            }), /*#__PURE__*/jsx(Text, {
              className: "mt-2 text-base text-muted-foreground",
              children: customBody ? /*#__PURE__*/jsx(TemplateCustomMessageBody, {
                text: customBody
              }) : /*#__PURE__*/jsx(Trans, {
                id: "wj6GQb",
                values: {
                  inviterName: inviterName,
                  action: action,
                  documentName: documentName
                }
              })
            })]
          })
        }), /*#__PURE__*/jsx(Hr, {
          className: "mx-auto mt-12 max-w-xl"
        }), /*#__PURE__*/jsx(Container, {
          className: "mx-auto max-w-xl",
          children: /*#__PURE__*/jsx(TemplateFooter, {
            reportUrl: reportUrl
          })
        })]
      })]
    })]
  });
};

export { DocumentInviteEmailTemplate, DocumentInviteEmailTemplate as default };
//# sourceMappingURL=document-invite.js.map
