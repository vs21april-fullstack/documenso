import { DocumentSignatureType } from '../utils/teams.js';
import { DocumentStatus, DocumentDistributionMethod } from '@prisma/client';

/**
 * Workaround for E2E tests to not import `msg`.
 */
/**
 * Maximum count returned per status bucket in document stats. The server clamps
 * each count to this value; the UI should display "10,000+" when it sees it.
 */
const STATS_COUNT_CAP = 10_000;
const DOCUMENT_STATUS = {
  [DocumentStatus.COMPLETED]: {
    description:
    /*i18n*/
    {
      id: "qqWcBV"
    }
  },
  [DocumentStatus.REJECTED]: {
    description:
    /*i18n*/
    {
      id: "ekCRTP"
    }
  },
  [DocumentStatus.CANCELLED]: {
    description:
    /*i18n*/
    {
      id: "vv7kpg"
    }
  },
  [DocumentStatus.DRAFT]: {
    description:
    /*i18n*/
    {
      id: "eneWvv"
    }
  },
  [DocumentStatus.PENDING]: {
    description:
    /*i18n*/
    {
      id: "UbRKMZ"
    }
  }
};
({
  [DocumentDistributionMethod.EMAIL]: {
    value: DocumentDistributionMethod.EMAIL},
  [DocumentDistributionMethod.NONE]: {
    value: DocumentDistributionMethod.NONE}
});
({
  [DocumentSignatureType.DRAW]: {
    value: DocumentSignatureType.DRAW
  },
  [DocumentSignatureType.TYPE]: {
    value: DocumentSignatureType.TYPE
  },
  [DocumentSignatureType.UPLOAD]: {
    value: DocumentSignatureType.UPLOAD
  }
});

export { DOCUMENT_STATUS, DocumentSignatureType, STATS_COUNT_CAP };
//# sourceMappingURL=document.js.map
