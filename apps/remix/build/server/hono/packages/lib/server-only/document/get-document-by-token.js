import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { mapSecondaryIdToDocumentId } from '../../utils/envelope.js';
import { isRecipientAuthorized } from './is-recipient-authorized.js';

const getDocumentAndSenderByToken = async ({
  token,
  userId,
  accessAuth,
  requireAccessAuth = true
}) => {
  if (!token) {
    throw new Error('Missing token');
  }
  const result = await prismaWithReplicas.envelope.findFirstOrThrow({
    where: {
      type: EnvelopeType.DOCUMENT,
      recipients: {
        some: {
          token
        }
      }
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      documentMeta: true,
      recipients: {
        where: {
          token
        }
      },
      envelopeItems: {
        select: {
          id: true,
          title: true,
          order: true,
          envelopeId: true,
          documentDataId: true,
          documentData: true
        }
      },
      team: {
        select: {
          name: true,
          teamEmail: true,
          url: true,
          teamGlobalSettings: {
            select: {
              brandingEnabled: true,
              brandingLogo: true
            }
          }
        }
      }
    }
  });
  const firstDocumentData = result.envelopeItems[0].documentData;
  if (!firstDocumentData) {
    throw new Error('Missing document data');
  }
  const recipient = result.recipients[0];
  // Sanity check, should not be possible.
  if (!recipient) {
    throw new Error('Missing recipient');
  }
  let documentAccessValid = true;
  if (requireAccessAuth) {
    documentAccessValid = await isRecipientAuthorized({
      type: 'ACCESS',
      documentAuthOptions: result.authOptions,
      recipient,
      userId,
      authOptions: accessAuth
    });
  }
  if (!documentAccessValid) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'Invalid access values'
    });
  }
  const legacyDocumentId = mapSecondaryIdToDocumentId(result.secondaryId);
  return {
    ...result,
    user: {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name
    },
    documentData: firstDocumentData,
    id: legacyDocumentId,
    envelopeId: result.id
  };
};

export { getDocumentAndSenderByToken };
//# sourceMappingURL=get-document-by-token.js.map
