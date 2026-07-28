import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Trans, useLingui } from "@lingui/react";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { T as TemplateBrandingLogo } from "./template-branding-logo-7_RaUFaC.js";
import { Text } from "@react-email/text";
import { T as TemplateDocumentImage } from "./template-document-image-d_zk9qBW.js";
import { T as TemplateFooter } from "./render-email-with-i18n-BHx5-qXF.js";
const TemplateDocumentCancel = ({
  inviterName,
  documentName,
  assetBaseUrl,
  cancellationReason
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TemplateDocumentImage, { className: "mt-6", assetBaseUrl }),
    /* @__PURE__ */ jsxs(Section, { children: [
      /* @__PURE__ */ jsx(Text, { className: "mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "l0X6r3",
        values: {
          inviterName,
          documentName
        },
        components: {
          0: /* @__PURE__ */ jsx("br", {})
        }
      } }) }),
      /* @__PURE__ */ jsx(Text, { className: "my-1 text-center text-base text-muted-foreground", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "vStjYt"
      } }) }),
      /* @__PURE__ */ jsx(Text, { className: "my-1 text-center text-base text-muted-foreground", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "8CzYKa"
      } }) }),
      cancellationReason && /* @__PURE__ */ jsx(Text, { className: "mt-4 text-center text-base", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "qXSCvM",
        values: {
          cancellationReason
        }
      } }) })
    ] })
  ] });
};
const DocumentCancelTemplate = ({
  inviterName = "Lucas Smith",
  inviterEmail = "lucas@documenso.com",
  documentName = "Open Source Pledge.pdf",
  assetBaseUrl = "http://localhost:3002",
  cancellationReason
}) => {
  const {
    _
  } = useLingui();
  const previewText = (
    /*i18n*/
    {
      id: "wbJyQT",
      values: {
        inviterName,
        documentName
      }
    }
  );
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsxs(Body, { className: "mx-auto my-auto bg-background font-sans", children: [
      /* @__PURE__ */ jsx(Preview, { children: _(previewText) }),
      /* @__PURE__ */ jsxs(Section, { children: [
        /* @__PURE__ */ jsx(Container, { className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(Section, { children: [
          /* @__PURE__ */ jsx(TemplateBrandingLogo, { assetBaseUrl, className: "mb-4 h-6" }),
          /* @__PURE__ */ jsx(TemplateDocumentCancel, { inviterName, inviterEmail, documentName, assetBaseUrl, cancellationReason })
        ] }) }),
        /* @__PURE__ */ jsx(Hr, { className: "mx-auto mt-12 max-w-xl" }),
        /* @__PURE__ */ jsx(Container, { className: "mx-auto max-w-xl", children: /* @__PURE__ */ jsx(TemplateFooter, {}) })
      ] })
    ] })
  ] });
};
export {
  DocumentCancelTemplate as D
};
