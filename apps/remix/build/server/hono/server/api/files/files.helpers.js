import { getOptionalSession } from '../../../packages/auth/server/lib/utils/get-session.js';
import { AppErrorCode, AppError } from '../../../packages/lib/errors/app-error.js';
import { verifyEmbeddingPresignToken } from '../../../packages/lib/server-only/embedding-presign/verify-embedding-presign-token.js';
import { generatePartialSignedPdf } from '../../../packages/lib/server-only/pdf/generate-partial-signed-pdf.js';
import { getTeamById } from '../../../packages/lib/server-only/team/get-team.js';
import '@noble/ciphers/chacha';
import '@noble/ciphers/utils';
import '@noble/ciphers/webcrypto';
import { sha256 } from '@noble/hashes/sha2';
import { getFileServerSide } from '../../../packages/lib/universal/upload/get-file.server.js';
import { prisma as prismaWithReplicas } from '../../../packages/prisma/index.js';
import { DocumentStatus, EnvelopeType, TemplateType } from '@prisma/client';
import contentDisposition from 'content-disposition';
import { match } from 'ts-pattern';

const resolveFileUploadUserId = async c => {
  const session = await getOptionalSession(c);
  if (session.user?.id) {
    return session.user.id;
  }
  const authorizationHeader = c.req.header('authorization');
  const [bearerToken] = (authorizationHeader || '').split('Bearer ').filter(part => part.length > 0);
  const queryToken = c.req.query('token');
  const presignToken = bearerToken || queryToken;
  if (!presignToken) {
    return null;
  }
  const verifiedToken = await verifyEmbeddingPresignToken({
    token: presignToken
  }).catch(() => undefined);
  return verifiedToken?.userId ?? null;
};
/**
 * Single entry point for envelope item file requests (view and download).
 *
 * Dispatches on `version`:
 * - `signed` / `original`: returns the stored PDF bytes as-is.
 * - `pending`: generates an on-demand PDF with all currently-inserted fields burned in.
 */
const handleEnvelopeItemFileRequest = async options => {
  if (options.version === 'pending') {
    return handlePendingFileRequest(options);
  }
  return handleStaticFileRequest(options);
};
const handleStaticFileRequest = async ({
  title,
  status,
  documentData,
  version,
  isDownload,
  context: c
}) => {
  const documentDataToUse = version === 'signed' ? documentData.data : documentData.initialData;
  const etag = Buffer.from(sha256(documentDataToUse)).toString('hex');
  if (c.req.header('If-None-Match') === etag && !isDownload) {
    return c.body(null, 304);
  }
  const file = await getFileServerSide({
    type: documentData.type,
    data: documentDataToUse
  }).catch(error => {
    console.error(error);
    return null;
  });
  if (!file) {
    return c.json({
      error: 'File not found'
    }, 404);
  }
  c.header('Content-Type', 'application/pdf');
  c.header('ETag', etag);
  if (!isDownload) {
    if (status === DocumentStatus.COMPLETED) {
      c.header('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      c.header('Cache-Control', 'public, max-age=0, must-revalidate');
    }
  }
  if (isDownload) {
    // Generate filename following the pattern from envelope-download-dialog.tsx
    const baseTitle = title.replace(/\.pdf$/, '');
    const suffix = version === 'signed' ? '_signed.pdf' : '.pdf';
    const filename = `${baseTitle}${suffix}`;
    c.header('Content-Disposition', contentDisposition(filename));
    // For downloads, prevent caching to ensure fresh data
    c.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    c.header('Pragma', 'no-cache');
    c.header('Expires', '0');
  }
  return c.body(file);
};
const handlePendingFileRequest = async ({
  title,
  envelopeItemId,
  envelope,
  documentData,
  context: c
}) => {
  if (envelope.status !== DocumentStatus.PENDING) {
    const errorCode = match(envelope.status).with(DocumentStatus.DRAFT, () => AppErrorCode.ENVELOPE_DRAFT).with(DocumentStatus.COMPLETED, () => AppErrorCode.ENVELOPE_COMPLETED).with(DocumentStatus.REJECTED, () => AppErrorCode.ENVELOPE_REJECTED).otherwise(() => AppErrorCode.INVALID_REQUEST);
    throw new AppError(errorCode, {
      message: `Envelope ${envelope.id} must be pending to download a partially signed PDF`,
      statusCode: 400
    });
  }
  if (envelope.internalVersion !== 2) {
    throw new AppError(AppErrorCode.ENVELOPE_LEGACY, {
      message: `Envelope ${envelope.id} is a legacy envelope and does not support partially signed PDF downloads`,
      statusCode: 400
    });
  }
  const fields = await prismaWithReplicas.field.findMany({
    where: {
      envelopeItemId,
      inserted: true
    },
    include: {
      signature: true
    },
    orderBy: {
      id: 'asc'
    }
  });
  const etag = Buffer.from(sha256(JSON.stringify({
    envelopeStatus: envelope.status,
    fields: fields.map(field => ({
      id: field.id,
      customText: field.customText,
      signatureId: field.signature?.id ?? null,
      signatureCreated: field.signature?.created ?? null
    }))
  }))).toString('hex');
  if (c.req.header('If-None-Match') === etag) {
    c.header('ETag', etag);
    c.header('Cache-Control', 'no-store, private');
    return c.body(null, 304);
  }
  const file = await getFileServerSide({
    type: documentData.type,
    data: documentData.initialData
  }).catch(error => {
    console.error(error);
    return null;
  });
  if (!file) {
    return c.json({
      error: 'File not found'
    }, 404);
  }
  const pdf = await generatePartialSignedPdf({
    pdfData: file,
    fields
  });
  c.get('logger').info({
    source: 'pendingPdfDownload',
    envelopeId: envelope.id,
    envelopeItemId,
    insertedFieldCount: fields.length,
    etag
  });
  c.header('Content-Type', 'application/pdf');
  c.header('Cache-Control', 'no-store, private');
  c.header('ETag', etag);
  const baseTitle = title.replace(/\.pdf$/i, '');
  const filename = `${baseTitle}_pending.pdf`;
  c.header('Content-Disposition', contentDisposition(filename));
  return c.body(pdf);
};
/**
 * Check whether a user has access to an envelope's file.
 *
 * First checks team membership. If that fails and the envelope is an
 * ORGANISATION template (not a document), falls back to checking whether
 * the user belongs to any team in the same organisation.
 */
const checkEnvelopeFileAccess = async ({
  userId,
  teamId,
  envelopeType,
  templateType
}) => {
  const team = await getTeamById({
    userId,
    teamId
  }).catch(() => null);
  if (team) {
    return true;
  }
  if (envelopeType === EnvelopeType.TEMPLATE && templateType === TemplateType.ORGANISATION) {
    const orgAccess = await prismaWithReplicas.team.findFirst({
      where: {
        id: teamId,
        organisation: {
          teams: {
            some: {
              teamGroups: {
                some: {
                  organisationGroup: {
                    organisationGroupMembers: {
                      some: {
                        organisationMember: {
                          userId
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      select: {
        id: true
      }
    });
    return orgAccess !== null;
  }
  return false;
};

export { checkEnvelopeFileAccess, handleEnvelopeItemFileRequest, resolveFileUploadUserId };
//# sourceMappingURL=files.helpers.js.map
