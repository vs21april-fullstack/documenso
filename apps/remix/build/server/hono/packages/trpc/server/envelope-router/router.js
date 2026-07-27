import { router } from '../trpc.js';
import { createAttachmentRoute } from './attachment/create-attachment.js';
import { deleteAttachmentRoute } from './attachment/delete-attachment.js';
import { findAttachmentsRoute } from './attachment/find-attachments.js';
import { updateAttachmentRoute } from './attachment/update-attachment.js';
import { bulkCancelEnvelopesRoute } from './bulk-cancel-envelopes.js';
import { bulkDeleteEnvelopesRoute } from './bulk-delete-envelopes.js';
import { bulkMoveEnvelopesRoute } from './bulk-move-envelopes.js';
import { cancelEnvelopeRoute } from './cancel-envelope.js';
import { createEnvelopeRoute } from './create-envelope.js';
import { createEnvelopeItemsRoute } from './create-envelope-items.js';
import { deleteEnvelopeRoute } from './delete-envelope.js';
import { deleteEnvelopeItemRoute } from './delete-envelope-item.js';
import { distributeEnvelopeRoute } from './distribute-envelope.js';
import { downloadEnvelopeAuditLogPdfRoute } from './download-envelope-audit-log-pdf.js';
import { downloadEnvelopeCertificatePdfRoute } from './download-envelope-certificate-pdf.js';
import { downloadEnvelopeItemRoute } from './download-envelope-item.js';
import { duplicateEnvelopeRoute } from './duplicate-envelope.js';
import { createEnvelopeFieldsRoute } from './envelope-fields/create-envelope-fields.js';
import { deleteEnvelopeFieldRoute } from './envelope-fields/delete-envelope-field.js';
import { getEnvelopeFieldRoute } from './envelope-fields/get-envelope-field.js';
import { getEnvelopeFieldSignaturesRoute } from './envelope-fields/get-envelope-field-signatures.js';
import { updateEnvelopeFieldsRoute } from './envelope-fields/update-envelope-fields.js';
import { createEnvelopeRecipientsRoute } from './envelope-recipients/create-envelope-recipients.js';
import { deleteEnvelopeRecipientRoute } from './envelope-recipients/delete-envelope-recipient.js';
import { getEnvelopeRecipientRoute } from './envelope-recipients/get-envelope-recipient.js';
import { rejectEnvelopeRecipientOnBehalfOfRoute } from './envelope-recipients/reject-envelope-recipient-on-behalf-of.js';
import { reportRecipientRoute } from './envelope-recipients/report-recipient.js';
import { updateEnvelopeRecipientsRoute } from './envelope-recipients/update-envelope-recipients.js';
import { findEnvelopeAuditLogsRoute } from './find-envelope-audit-logs.js';
import { findEnvelopesRoute } from './find-envelopes.js';
import { getEditorEnvelopeRoute } from './get-editor-envelope.js';
import { getEnvelopeRoute } from './get-envelope.js';
import { getEnvelopeItemsRoute } from './get-envelope-items.js';
import { getEnvelopeItemsByTokenRoute } from './get-envelope-items-by-token.js';
import { getEnvelopesByIdsRoute } from './get-envelopes-by-ids.js';
import { redistributeEnvelopeRoute } from './redistribute-envelope.js';
import { replaceEnvelopeItemPdfRoute } from './replace-envelope-item-pdf.js';
import { saveAsTemplateRoute } from './save-as-template.js';
import { setEnvelopeFieldsRoute } from './set-envelope-fields.js';
import { setEnvelopeRecipientsRoute } from './set-envelope-recipients.js';
import { signEnvelopeFieldRoute } from './sign-envelope-field.js';
import { signingStatusEnvelopeRoute } from './signing-status-envelope.js';
import { updateEnvelopeRoute } from './update-envelope.js';
import { updateEnvelopeItemsRoute } from './update-envelope-items.js';
import { useEnvelopeRoute } from './use-envelope.js';

/**
 * Note: The order of the routes is important for public API routes.
 *
 * Example: GET /envelope/attachment must appear before GET /envelope/:id
 */
const envelopeRouter = router({
  attachment: {
    find: findAttachmentsRoute,
    create: createAttachmentRoute,
    update: updateAttachmentRoute,
    delete: deleteAttachmentRoute
  },
  item: {
    getMany: getEnvelopeItemsRoute,
    getManyByToken: getEnvelopeItemsByTokenRoute,
    createMany: createEnvelopeItemsRoute,
    updateMany: updateEnvelopeItemsRoute,
    delete: deleteEnvelopeItemRoute,
    download: downloadEnvelopeItemRoute,
    replacePdf: replaceEnvelopeItemPdfRoute
  },
  recipient: {
    get: getEnvelopeRecipientRoute,
    createMany: createEnvelopeRecipientsRoute,
    updateMany: updateEnvelopeRecipientsRoute,
    delete: deleteEnvelopeRecipientRoute,
    set: setEnvelopeRecipientsRoute,
    report: reportRecipientRoute,
    rejectOnBehalfOf: rejectEnvelopeRecipientOnBehalfOfRoute
  },
  field: {
    get: getEnvelopeFieldRoute,
    getSignatures: getEnvelopeFieldSignaturesRoute,
    createMany: createEnvelopeFieldsRoute,
    updateMany: updateEnvelopeFieldsRoute,
    delete: deleteEnvelopeFieldRoute,
    set: setEnvelopeFieldsRoute,
    sign: signEnvelopeFieldRoute
  },
  find: findEnvelopesRoute,
  auditLog: {
    find: findEnvelopeAuditLogsRoute,
    downloadPdf: downloadEnvelopeAuditLogPdfRoute
  },
  certificate: {
    downloadPdf: downloadEnvelopeCertificatePdfRoute
  },
  bulk: {
    move: bulkMoveEnvelopesRoute,
    delete: bulkDeleteEnvelopesRoute,
    cancel: bulkCancelEnvelopesRoute
  },
  editor: {
    get: getEditorEnvelopeRoute
  },
  get: getEnvelopeRoute,
  getMany: getEnvelopesByIdsRoute,
  create: createEnvelopeRoute,
  use: useEnvelopeRoute,
  update: updateEnvelopeRoute,
  delete: deleteEnvelopeRoute,
  cancel: cancelEnvelopeRoute,
  duplicate: duplicateEnvelopeRoute,
  saveAsTemplate: saveAsTemplateRoute,
  distribute: distributeEnvelopeRoute,
  redistribute: redistributeEnvelopeRoute,
  signingStatus: signingStatusEnvelopeRoute
});

export { envelopeRouter };
//# sourceMappingURL=router.js.map
