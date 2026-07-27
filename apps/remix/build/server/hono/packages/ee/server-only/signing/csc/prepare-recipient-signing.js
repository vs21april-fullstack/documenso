import { NEXT_PUBLIC_WEBAPP_URL } from '../../../../lib/constants/app.js';
import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../../../lib/types/document-audit-logs.js';
import { isTspEnvelope } from '../../../../lib/types/signature-level.js';
import { getFileServerSide } from '../../../../lib/universal/upload/get-file.server.js';
import { putPdfFileServerSide } from '../../../../lib/universal/upload/put-file.server.js';
import { createDocumentAuditLogData } from '../../../../lib/utils/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { PDF } from '@libpdf/core';
import { policyToLibpdfSignerAlgo } from './algorithm-resolver.js';
import { decodeCscCertChain } from './cert-chain.js';
import { loadCscCredential } from './credential.js';
import { buildTspStampName, buildTspAnchorName } from './pdf-names.js';
import { renderRecipientOverlay } from './render-overlay.js';
import { upsertCscSession } from './sign-session.js';
import { CscCaptureSigner } from './signers/capture-signer.js';

const prepareCscRecipientSigning = async opts => {
  const {
    recipientToken,
    requestMetadata
  } = opts;
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      token: recipientToken
    },
    // `signature` must be eager-loaded — `renderRecipientOverlay` runs the
    // field renderer in `export` mode, which throws `MISSING_SIGNATURE` for
    // any inserted SIGNATURE field without signature data. Mirrors the
    // include pattern in `seal-document.handler.ts`.
    include: {
      fields: {
        include: {
          signature: true
        }
      }
    }
  }).catch(() => null);
  if (!recipient) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: `Recipient with token "${recipientToken}" not found.`
    });
  }
  const envelope = await prismaWithReplicas.envelope.findUniqueOrThrow({
    where: {
      id: recipient.envelopeId
    },
    include: {
      envelopeItems: {
        include: {
          documentData: true
        }
      },
      recipients: true
    }
  });
  if (!isTspEnvelope(envelope)) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'prepareCscRecipientSigning called for a non-TSP envelope.'
    });
  }
  const credential = await loadCscCredential(recipient.id);
  if (!credential) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'CSC credential missing — service-scope OAuth must complete first.'
    });
  }
  if (!credential.certCache) {
    throw new AppError(AppErrorCode.CSC_CERT_INVALID, {
      message: 'CSC credential has no persisted certificate chain.'
    });
  }
  if (credential.keyLenBits === null) {
    throw new AppError(AppErrorCode.CSC_ALGORITHM_REFUSED, {
      message: 'CSC credential omits persisted keyLenBits — service-scope OAuth must re-run.'
    });
  }
  const chain = decodeCscCertChain(credential.certCache);
  const algo = policyToLibpdfSignerAlgo({
    keyType: credential.keyType,
    digestAlgorithm: credential.digestAlgorithm,
    signAlgoOid: credential.signatureAlgorithm,
    keyLenBits: credential.keyLenBits});
  // Pin a single signingTime for every per-item capture so the embed pass
  // re-derives byte-identical signedAttrs digests.
  const signingTime = new Date();
  const items = [];
  for (const envelopeItem of envelope.envelopeItems) {
    const recipientFieldsOnItem = recipient.fields.filter(field => field.envelopeItemId === envelopeItem.id);
    const pagesWithFields = new Set();
    for (const field of recipientFieldsOnItem) {
      pagesWithFields.add(field.page);
    }
    const bytes = await getFileServerSide(envelopeItem.documentData);
    const pdfDoc = await PDF.load(bytes);
    for (const pageNumber of pagesWithFields) {
      const fieldsOnPage = recipientFieldsOnItem.filter(field => field.page === pageNumber);
      await renderRecipientOverlay({
        pdfDoc,
        stampName: buildTspStampName(recipient.id, envelopeItem.id, pageNumber),
        pageNumber,
        fields: fieldsOnPage
      });
    }
    // Persist the rendered PDF as an orphan `DocumentData` row before the
    // capture pass so sign-time can load byte-identical input — eliminates
    // the determinism risk of running Konva again after the OAuth round-trip.
    const renderedBytes = await pdfDoc.save({
      incremental: true
    });
    const fileName = envelope.title.endsWith('.pdf') ? envelope.title : `${envelope.title || 'envelope'}.pdf`;
    const renderedUpload = await putPdfFileServerSide({
      name: fileName,
      type: 'application/pdf',
      arrayBuffer: async () => Promise.resolve(renderedBytes)
    }, envelopeItem.documentData.initialData ?? undefined);
    // Reload from the persisted bytes so the capture pass operates on the
    // exact same bytes the sign pass will fetch from storage. Skipping the
    // reload would compute the digest over an in-memory incremental update
    // that diverges from what `PDF.load(renderedBytes)` produces.
    const capturePdfDoc = await PDF.load(renderedBytes);
    const captureSigner = new CscCaptureSigner({
      certificate: chain[0],
      certificateChain: chain.slice(1),
      algo
    });
    const anchorName = buildTspAnchorName(recipient.id, envelopeItem.id);
    // Capture at B-B even though the eventual embed pass is B-T. The B-T
    // signature timestamp is a CMS *unsigned* attribute, added by libpdf
    // after `signer.sign()` runs over the signed-attrs digest — so B-B and
    // B-T produce byte-identical signed-attrs for the same `(signer,
    // documentHash, digestAlgorithm, signingTime)` tuple. See the matching
    // note in `execute-tsp-sign.ts`.
    await capturePdfDoc.sign({
      signer: captureSigner,
      fieldName: anchorName,
      signingTime,
      level: 'B-B',
      digestAlgorithm: algo.digestAlgorithm
    });
    if (captureSigner.capturedDigest === null) {
      throw new AppError(AppErrorCode.INVALID_REQUEST, {
        message: 'CscCaptureSigner was not invoked by pdf.sign during prep.'
      });
    }
    items.push({
      envelopeItemId: envelopeItem.id,
      documentDataId: renderedUpload.documentData.id,
      hashB64: Buffer.from(captureSigner.capturedDigest).toString('base64'),
      ordinal: items.length
    });
  }
  const session = await upsertCscSession({
    recipientId: recipient.id,
    envelopeId: envelope.id,
    signingTime,
    items
  });
  await prismaWithReplicas.documentAuditLog.create({
    data: createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_CSC_SIGN_REQUESTED,
      envelopeId: envelope.id,
      user: {
        name: recipient.name,
        email: recipient.email
      },
      requestMetadata,
      data: {
        recipientEmail: recipient.email,
        recipientName: recipient.name,
        recipientId: recipient.id,
        recipientRole: recipient.role,
        providerId: credential.providerId,
        credentialId: credential.credentialId,
        sessionId: session.id,
        numSignatures: items.length
      }
    })
  });
  const redirectUrl = `${NEXT_PUBLIC_WEBAPP_URL()}/api/csc/oauth/authorize?scope=credential&session=${session.id}`;
  return {
    status: 'REDIRECT',
    redirectUrl
  };
};

export { prepareCscRecipientSigning };
//# sourceMappingURL=prepare-recipient-signing.js.map
