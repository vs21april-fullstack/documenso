import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZResetTwoFactorRequestSchema, ZResetTwoFactorResponseSchema } from './reset-two-factor-authentication.types.js';

const resetTwoFactorRoute = adminProcedure.input(ZResetTwoFactorRequestSchema).output(ZResetTwoFactorResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    userId
  } = input;
  ctx.logger.info({
    input: {
      userId
    }
  });
  return await resetTwoFactor({
    userId
  });
});
const resetTwoFactor = async ({
  userId
}) => {
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id: userId
    }
  });
  if (!user) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'User not found'
    });
  }
  await prismaWithReplicas.user.update({
    where: {
      id: user.id
    },
    data: {
      twoFactorEnabled: false,
      twoFactorBackupCodes: null,
      twoFactorSecret: null
    }
  });
};

export { resetTwoFactor, resetTwoFactorRoute };
//# sourceMappingURL=reset-two-factor-authentication.js.map
