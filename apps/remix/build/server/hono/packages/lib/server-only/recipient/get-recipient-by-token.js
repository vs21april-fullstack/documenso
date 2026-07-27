import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const getRecipientByToken = async ({
  token
}) => {
  return await prismaWithReplicas.recipient.findFirstOrThrow({
    where: {
      token
    },
    include: {
      fields: true
    }
  });
};

export { getRecipientByToken };
//# sourceMappingURL=get-recipient-by-token.js.map
