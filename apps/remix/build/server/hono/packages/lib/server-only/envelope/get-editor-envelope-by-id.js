import { getEnvelopeWhereInput } from './get-envelope-by-id.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';

const getEditorEnvelopeById = async ({
  id,
  userId,
  teamId,
  type
}) => {
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id,
    userId,
    teamId,
    type
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    include: {
      envelopeItems: {
        include: {
          documentData: true
        },
        orderBy: {
          order: 'asc'
        }
      },
      folder: true,
      documentMeta: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      recipients: {
        orderBy: {
          id: 'asc'
        }
      },
      fields: true,
      team: {
        select: {
          id: true,
          url: true,
          organisationId: true
        }
      },
      directLink: {
        select: {
          directTemplateRecipientId: true,
          enabled: true,
          id: true,
          token: true
        }
      },
      envelopeAttachments: {
        select: {
          id: true,
          type: true,
          label: true,
          data: true
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope could not be found'
    });
  }
  return {
    ...envelope,
    attachments: envelope.envelopeAttachments,
    user: {
      id: envelope.user.id,
      name: envelope.user.name || '',
      email: envelope.user.email
    }
  };
};

export { getEditorEnvelopeById };
//# sourceMappingURL=get-editor-envelope-by-id.js.map
