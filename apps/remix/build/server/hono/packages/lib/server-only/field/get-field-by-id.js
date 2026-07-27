import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { mapFieldToLegacyField } from '../../utils/fields.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const getFieldById = async ({
  userId,
  teamId,
  fieldId,
  envelopeType
}) => {
  const field = await prismaWithReplicas.field.findFirst({
    where: {
      id: fieldId,
      envelope: {
        type: envelopeType,
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
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: field.envelopeId
    },
    type: envelopeType ?? null,
    userId,
    teamId
  });
  // Additional validation to check visibility.
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: envelopeWhereInput
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Field not found'
    });
  }
  return mapFieldToLegacyField(field, envelope);
};

export { getFieldById };
//# sourceMappingURL=get-field-by-id.js.map
