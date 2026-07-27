import { DocumentStatus } from '@prisma/client';

const ExtendedDocumentStatus = {
  ...DocumentStatus,
  INBOX: 'INBOX',
  ALL: 'ALL'
};

export { ExtendedDocumentStatus };
//# sourceMappingURL=extended-document-status.js.map
