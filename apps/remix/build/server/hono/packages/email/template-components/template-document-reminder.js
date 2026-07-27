import { RECIPIENT_ROLES_DESCRIPTION } from '../../lib/constants/recipient-roles.js';
import { useLingui, Trans } from '@lingui/react';
import { RecipientRole } from '@prisma/client';
import { match } from 'ts-pattern';
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

const TemplateDocumentReminder = ({
  recipientName,
  documentName,
  signDocumentLink,
  assetBaseUrl,
  role
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
        children: /*#__PURE__*/jsx(Trans, {
          id: "6b/1tS",
          values: {
            0: _(actionVerb).toLowerCase(),
            documentName: documentName
          },
          components: {
            0: /*#__PURE__*/jsx("br", {})
          }
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "my-1 text-center text-base text-muted-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "LU3Yvr",
          values: {
            recipientName: recipientName
          }
        })
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
          className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline",
          href: signDocumentLink,
          children: match(role).with(RecipientRole.SIGNER, () => /*#__PURE__*/jsx(Trans, {
            id: "4QSw6E"
          })).with(RecipientRole.VIEWER, () => /*#__PURE__*/jsx(Trans, {
            id: "SzshGx"
          })).with(RecipientRole.APPROVER, () => /*#__PURE__*/jsx(Trans, {
            id: "3WUY2f"
          })).with(RecipientRole.CC, () => '').with(RecipientRole.ASSISTANT, () => /*#__PURE__*/jsx(Trans, {
            id: "sPceSM"
          })).exhaustive()
        })
      })]
    })]
  });
};

export { TemplateDocumentReminder };
//# sourceMappingURL=template-document-reminder.js.map
