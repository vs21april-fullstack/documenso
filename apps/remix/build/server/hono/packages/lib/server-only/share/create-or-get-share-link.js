import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { match, P } from 'ts-pattern';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { alphaid } from '../../universal/id.js';
import { unsafeBuildEnvelopeIdQuery } from '../../utils/envelope.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const createOrGetShareLink = async ({
  documentId,
  ...options
}) => {
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: unsafeBuildEnvelopeIdQuery({
      type: 'documentId',
      id: documentId
    }, EnvelopeType.DOCUMENT),
    select: {
      id: true,
      teamId: true
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  const email = await match(options).with({
    token: P.string
  }, async ({
    token
  }) => {
    return await prismaWithReplicas.recipient.findFirst({
      where: {
        envelopeId: envelope.id,
        token
      }
    }).then(recipient => recipient?.email);
  }).with({
    userId: P.number
  }, async ({
    userId
  }) => {
    // Ensure the authenticated user actually has visibility-aware access to the
    // envelope before allowing them to create a share link. The share route does
    // not carry a teamId, so we derive it from the envelope and reuse the canonical
    // visibility check (owner OR team member with sufficient visibility).
    const {
      envelopeWhereInput
    } = await getEnvelopeWhereInput({
      id: {
        type: 'documentId',
        id: documentId
      },
      userId,
      teamId: envelope.teamId,
      type: EnvelopeType.DOCUMENT
    });
    const accessibleEnvelope = await prismaWithReplicas.envelope.findFirst({
      where: envelopeWhereInput,
      select: {
        id: true
      }
    });
    if (!accessibleEnvelope) {
      throw new AppError(AppErrorCode.NOT_FOUND);
    }
    return await prismaWithReplicas.user.findFirst({
      where: {
        id: userId
      },
      select: {
        email: true
      }
    }).then(user => user?.email);
  }).exhaustive();
  if (!email) {
    throw new Error('Unable to create share link for document with the given email');
  }
  return await prismaWithReplicas.documentShareLink.upsert({
    where: {
      envelopeId_email: {
        envelopeId: envelope.id,
        email
      }
    },
    create: {
      email,
      envelopeId: envelope.id,
      slug: alphaid(14)
    },
    update: {}
  });
};

export { createOrGetShareLink };
//# sourceMappingURL=create-or-get-share-link.js.map
