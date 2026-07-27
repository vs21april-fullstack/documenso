import { router } from '../trpc.js';
import { accessAuthRequest2FAEmailRoute } from './access-auth-request-2fa-email.js';
import { createAttachmentRoute } from './attachment/create-attachment.js';
import { deleteAttachmentRoute } from './attachment/delete-attachment.js';
import { findAttachmentsRoute } from './attachment/find-attachments.js';
import { updateAttachmentRoute } from './attachment/update-attachment.js';
import { createDocumentRoute } from './create-document.js';
import { createDocumentTemporaryRoute } from './create-document-temporary.js';
import { deleteDocumentRoute } from './delete-document.js';
import { distributeDocumentRoute } from './distribute-document.js';
import { downloadDocumentRoute } from './download-document.js';
import { downloadDocumentAuditLogsRoute } from './download-document-audit-logs.js';
import { downloadDocumentBetaRoute } from './download-document-beta.js';
import { downloadDocumentCertificateRoute } from './download-document-certificate.js';
import { duplicateDocumentRoute } from './duplicate-document.js';
import { findDocumentAuditLogsRoute } from './find-document-audit-logs.js';
import { findDocumentsRoute } from './find-documents.js';
import { findDocumentsInternalRoute } from './find-documents-internal.js';
import { findInboxRoute } from './find-inbox.js';
import { getDocumentRoute } from './get-document.js';
import { getDocumentByTokenRoute } from './get-document-by-token.js';
import { getDocumentsByIdsRoute } from './get-documents-by-ids.js';
import { getInboxCountRoute } from './get-inbox-count.js';
import { redistributeDocumentRoute } from './redistribute-document.js';
import { searchDocumentRoute } from './search-document.js';
import { shareDocumentRoute } from './share-document.js';
import { updateDocumentRoute } from './update-document.js';

const documentRouter = router({
  get: getDocumentRoute,
  getMany: getDocumentsByIdsRoute,
  find: findDocumentsRoute,
  create: createDocumentRoute,
  update: updateDocumentRoute,
  delete: deleteDocumentRoute,
  duplicate: duplicateDocumentRoute,
  downloadCertificate: downloadDocumentCertificateRoute,
  distribute: distributeDocumentRoute,
  redistribute: redistributeDocumentRoute,
  search: searchDocumentRoute,
  share: shareDocumentRoute,
  download: downloadDocumentRoute,
  // Deprecated endpoints which need to be removed in the future.
  downloadBeta: downloadDocumentBetaRoute,
  createDocumentTemporary: createDocumentTemporaryRoute,
  // Internal document routes for custom frontend requests.
  getDocumentByToken: getDocumentByTokenRoute,
  findDocumentsInternal: findDocumentsInternalRoute,
  accessAuth: router({
    request2FAEmail: accessAuthRequest2FAEmailRoute
  }),
  auditLog: {
    find: findDocumentAuditLogsRoute,
    download: downloadDocumentAuditLogsRoute
  },
  inbox: router({
    find: findInboxRoute,
    getCount: getInboxCountRoute
  }),
  attachment: {
    create: createAttachmentRoute,
    update: updateAttachmentRoute,
    delete: deleteAttachmentRoute,
    find: findAttachmentsRoute
  }
});

export { documentRouter };
//# sourceMappingURL=router.js.map
