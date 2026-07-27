import { getFileServerSide } from '../../../../lib/universal/upload/get-file.server.js';
import { putPdfFileServerSide } from '../../../../lib/universal/upload/put-file.server.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { PDF, HttpTimestampAuthority } from '@libpdf/core';
import { DocumentStatus } from '@prisma/client';
import { resolveCscSealTimeTsa } from './tsa-resolver.js';

const finalizeTspEnvelopeCompletion = async opts => {
  const {
    envelope,
    envelopeCompletedAuditLog
  } = opts;
  // Resolve the TSA up-front — fail fast if the instance is mis-configured
  // before we start round-tripping PDF bytes through storage.
  const tsa = resolveCscSealTimeTsa();
  const timestampAuthority = buildLibpdfTsa(tsa);
  const archivedItems = [];
  for (const envelopeItem of envelope.envelopeItems) {
    const pdfBytes = await getFileServerSide(envelopeItem.documentData);
    const pdfDoc = await PDF.load(pdfBytes);
    // PAdES B-LTA in one call. Internally:
    //   1. Gather LTV (certs/OCSP/CRL) for every existing signed field and
    //      write a single DSS incremental update.
    //   2. Add an archival `/DocTimeStamp` over the result.
    //   3. Gather LTV for the new timestamp's own certificate chain.
    // All three are append-only incremental updates — every prior recipient
    // signature's `/ByteRange` stays valid.
    const archived = await pdfDoc.addArchivalData({
      timestampAuthority
    });
    const {
      documentData: uploaded
    } = await putPdfFileServerSide({
      name: envelopeItem.title.endsWith('.pdf') ? envelopeItem.title : `${envelopeItem.title}.pdf`,
      type: 'application/pdf',
      arrayBuffer: async () => Promise.resolve(archived.bytes)
    }, envelopeItem.documentData.initialData);
    archivedItems.push({
      envelopeItemDataId: envelopeItem.documentData.id,
      uploadedType: uploaded.type,
      uploadedData: uploaded.data
    });
  }
  // Single tx: per-item in-place data updates + envelope status flip +
  // completion audit log. `envelopeItem.documentDataId` is preserved; the
  // freshly-uploaded `DocumentData` rows orbit as orphans.
  await prismaWithReplicas.$transaction(async tx => {
    for (const {
      envelopeItemDataId,
      uploadedType,
      uploadedData
    } of archivedItems) {
      await tx.documentData.update({
        where: {
          id: envelopeItemDataId
        },
        data: {
          type: uploadedType,
          data: uploadedData
        }
      });
    }
    await tx.envelope.update({
      where: {
        id: envelope.id
      },
      data: {
        status: DocumentStatus.COMPLETED,
        completedAt: new Date()
      }
    });
    await tx.documentAuditLog.create({
      data: envelopeCompletedAuditLog
    });
  });
};
/**
 * Wrap a resolved seal-time TSA config into a libpdf `TimestampAuthority`.
 *
 * Env only at seal time — the archival `/DocTimeStamp` is the operator's
 * long-term trust anchor and SHOULD point at a dedicated qualified archival
 * TSA (e.g. DigiCert) that's independent of the per-recipient TSP. We
 * deliberately don't fall back to the TSP here: doing so would couple the
 * archive's longevity to a TSP that may revoke or rotate without notice,
 * and would require keeping a live service-scope bearer around at the
 * seal-document job which has no recipient context anyway.
 *
 * First URL only — multi-URL fallback can layer on later via a composite
 * wrapper if operators need it.
 */
const buildLibpdfTsa = tsa => {
  return new HttpTimestampAuthority(tsa.urls[0]);
};

export { finalizeTspEnvelopeCompletion };
//# sourceMappingURL=finalize-tsp-completion.js.map
