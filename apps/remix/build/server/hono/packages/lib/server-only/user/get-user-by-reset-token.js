import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';

const getUserByResetToken = async ({
  token
}) => {
  const result = await prismaWithReplicas.passwordResetToken.findFirst({
    where: {
      token
    },
    include: {
      user: true
    }
  });
  if (!result || !result.user) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  return result.user;
};

export { getUserByResetToken };
//# sourceMappingURL=get-user-by-reset-token.js.map
