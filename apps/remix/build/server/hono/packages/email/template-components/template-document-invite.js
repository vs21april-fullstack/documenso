import { RECIPIENT_ROLES_DESCRIPTION } from '../../lib/constants/recipient-roles.js';
import { useLingui, Trans } from '@lingui/react';
import { OrganisationType, RecipientRole } from '@prisma/client';
import { match, P } from 'ts-pattern';
import '@react-email/body';
import { Button } from '@react-email/button';
import '@react-email/column';
import '@react-email/container';
import '@react-email/font';
import '@react-email/head';
import '@react-email/heading';
import '@react-email/hr';
import '@react-email/html';
import '@react-email/img';
import '@react-email/link';
import '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { TemplateDocumentImage } from './template-document-image.js';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

const TemplateDocumentInvite = ({
  inviterName,
  documentName,
  signDocumentLink,
  assetBaseUrl,
  role,
  selfSigner,
  teamName,
  includeSenderDetails,
  organisationType
}) => {
  const {
    _
  } = useLingui();
  const {
    actionVerb
  } = RECIPIENT_ROLES_DESCRIPTION[role];
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(TemplateDocumentImage, {
      className: "mt-6",
      assetBaseUrl: assetBaseUrl
    }), /*#__PURE__*/jsxs(Section, {
      children: [/*#__PURE__*/jsx(Text, {
        className: "mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg",
        children: match({
          selfSigner,
          organisationType,
          includeSenderDetails,
          teamName
        }).with({
          selfSigner: true
        }, () => /*#__PURE__*/jsx(Trans, {
          id: "KYkUeW",
          values: {
            0: _(actionVerb).toLowerCase(),
            documentName: documentName
          },
          components: {
            0: /*#__PURE__*/jsx("br", {})
          }
        })).with({
          organisationType: OrganisationType.ORGANISATION,
          includeSenderDetails: true,
          teamName: P.string
        }, () => /*#__PURE__*/jsx(Trans, {
          id: "NpX//o",
          values: {
            0: _(actionVerb).toLowerCase(),
            inviterName: inviterName,
            teamName: teamName,
            documentName: documentName
          },
          components: {
            0: /*#__PURE__*/jsx("br", {})
          }
        })).with({
          organisationType: OrganisationType.ORGANISATION,
          teamName: P.string
        }, () => /*#__PURE__*/jsx(Trans, {
          id: "cxzGFC",
          values: {
            0: _(actionVerb).toLowerCase(),
            teamName: teamName,
            documentName: documentName
          },
          components: {
            0: /*#__PURE__*/jsx("br", {})
          }
        })).otherwise(() => /*#__PURE__*/jsx(Trans, {
          id: "uySqxV",
          values: {
            0: _(actionVerb).toLowerCase(),
            inviterName: inviterName,
            documentName: documentName
          },
          components: {
            0: /*#__PURE__*/jsx("br", {})
          }
        }))
      }), /*#__PURE__*/jsx(Text, {
        className: "my-1 text-center text-base text-muted-foreground",
        children: match(role).with(RecipientRole.SIGNER, () => /*#__PURE__*/jsx(Trans, {
          id: "uaLDnA"
        })).with(RecipientRole.VIEWER, () => /*#__PURE__*/jsx(Trans, {
          id: "zgM2eX"
        })).with(RecipientRole.APPROVER, () => /*#__PURE__*/jsx(Trans, {
          id: "8PVsCY"
        })).with(RecipientRole.CC, () => '').with(RecipientRole.ASSISTANT, () => /*#__PURE__*/jsx(Trans, {
          id: "JWQdoT"
        })).exhaustive()
      }), /*#__PURE__*/jsx(Section, {
        className: "mt-8 mb-6 text-center",
        children: /*#__PURE__*/jsx(Button, {
          className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-base text-primary-foreground no-underline",
          href: signDocumentLink,
          children: match(role).with(RecipientRole.SIGNER, () => /*#__PURE__*/jsx(Trans, {
            id: "t6PyGz"
          })).with(RecipientRole.VIEWER, () => /*#__PURE__*/jsx(Trans, {
            id: "SzshGx"
          })).with(RecipientRole.APPROVER, () => /*#__PURE__*/jsx(Trans, {
            id: "BA9BFl"
          })).with(RecipientRole.CC, () => '').with(RecipientRole.ASSISTANT, () => /*#__PURE__*/jsx(Trans, {
            id: "GjvUe0"
          })).exhaustive()
        })
      })]
    })]
  });
};

export { TemplateDocumentInvite };
//# sourceMappingURL=template-document-invite.js.map
