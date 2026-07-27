import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';

const getUserById = async ({
  id
}) => {
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      roles: true,
      disabled: true,
      twoFactorEnabled: true,
      signature: true
    }
  });
  if (!user) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  return user;
};

export { getUserById };
//# sourceMappingURL=get-user-by-id.js.map
