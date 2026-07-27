import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const deleteTemplateField = async ({
  userId,
  teamId,
  fieldId
}) => {
  const field = await prismaWithReplicas.field.findFirst({
    where: {
      id: fieldId,
      envelope: {
        type: EnvelopeType.TEMPLATE,
        team: buildTeamWhereQuery({
          teamId,
          userId
        })
      }
    }
  });
  if (!field) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Field not found'
    });
  }
  // Additional validation to check visibility.
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: field.envelopeId
    },
    type: EnvelopeType.TEMPLATE,
    userId,
    teamId
  });
  await prismaWithReplicas.field.delete({
    where: {
      id: field.id,
      envelope: envelopeWhereInput
    }
  });
};

export { deleteTemplateField };
//# sourceMappingURL=delete-template-field.js.map
