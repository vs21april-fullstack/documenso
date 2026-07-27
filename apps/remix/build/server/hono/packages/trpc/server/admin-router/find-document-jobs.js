import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { unsafeBuildEnvelopeIdQuery, mapSecondaryIdToDocumentId } from '../../../lib/utils/envelope.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { adminProcedure } from '../trpc.js';
import { ZFindDocumentJobsRequestSchema, ZFindDocumentJobsResponseSchema } from './find-document-jobs.types.js';

const findDocumentJobsRoute = adminProcedure.input(ZFindDocumentJobsRequestSchema).output(ZFindDocumentJobsResponseSchema).query(async ({
  input
}) => {
  const {
    envelopeId,
    page = 1,
    perPage = 5
  } = input;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: unsafeBuildEnvelopeIdQuery({
      type: 'envelopeId',
      id: envelopeId
    }, EnvelopeType.DOCUMENT)
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  const [data, count] = await Promise.all([prismaWithReplicas.backgroundJob.findMany({
    where: {
      jobId: 'internal.seal-document',
      payload: {
        path: '$.documentId',
        equals: mapSecondaryIdToDocumentId(envelope.secondaryId)
      }
    },
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      submittedAt: 'desc'
    }
  }), prismaWithReplicas.backgroundJob.count({
    where: {
      jobId: 'internal.seal-document',
      payload: {
        path: '$.documentId',
        equals: mapSecondaryIdToDocumentId(envelope.secondaryId)
      }
    }
  })]);
  return {
    data,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
});

export { findDocumentJobsRoute };
//# sourceMappingURL=find-document-jobs.js.map
