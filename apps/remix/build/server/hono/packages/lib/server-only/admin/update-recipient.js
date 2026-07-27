import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { SigningStatus } from '@prisma/client';

const updateRecipient = async ({
  id,
  name,
  email,
  role
}) => {
  const recipient = await prismaWithReplicas.recipient.findFirstOrThrow({
    where: {
      id
    }
  });
  if (recipient.signingStatus === SigningStatus.SIGNED) {
    throw new Error('Cannot update a recipient that has already signed.');
  }
  return await prismaWithReplicas.recipient.update({
    where: {
      id
    },
    data: {
      name,
      email,
      role
    }
  });
};

export { updateRecipient };
//# sourceMappingURL=update-recipient.js.map
