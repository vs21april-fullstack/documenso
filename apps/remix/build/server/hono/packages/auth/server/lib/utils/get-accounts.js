import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { getSession } from './get-session.js';

const getAccounts = async c => {
  const {
    user
  } = await getSession(c);
  return await prismaWithReplicas.account.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      userId: true,
      type: true,
      provider: true,
      providerAccountId: true,
      createdAt: true
    }
  });
};

export { getAccounts };
//# sourceMappingURL=get-accounts.js.map
