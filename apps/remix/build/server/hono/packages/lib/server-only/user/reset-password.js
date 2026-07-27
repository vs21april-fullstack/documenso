import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { compare, hash } from '@node-rs/bcrypt';
import { UserSecurityAuditLogType } from '@prisma/client';
import { SALT_ROUNDS } from '../../constants/auth.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { jobsClient } from '../../jobs/client.js';

const resetPassword = async ({
  token,
  password,
  requestMetadata
}) => {
  if (!token) {
    throw new AppError('INVALID_TOKEN');
  }
  const foundToken = await prismaWithReplicas.passwordResetToken.findFirst({
    where: {
      token
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          password: true
        }
      }
    }
  });
  if (!foundToken) {
    throw new AppError('INVALID_TOKEN');
  }
  const now = new Date();
  if (now > foundToken.expiry) {
    throw new AppError(AppErrorCode.EXPIRED_CODE);
  }
  const isSamePassword = await compare(password, foundToken.user.password || '');
  if (isSamePassword) {
    throw new AppError('SAME_PASSWORD');
  }
  const hashedPassword = await hash(password, SALT_ROUNDS);
  await prismaWithReplicas.$transaction(async tx => {
    await tx.user.update({
      where: {
        id: foundToken.userId
      },
      data: {
        password: hashedPassword
      }
    });
    await tx.passwordResetToken.deleteMany({
      where: {
        userId: foundToken.userId
      }
    });
    await tx.userSecurityAuditLog.create({
      data: {
        userId: foundToken.userId,
        type: UserSecurityAuditLogType.PASSWORD_RESET,
        userAgent: requestMetadata?.userAgent,
        ipAddress: requestMetadata?.ipAddress
      }
    });
  });
  await jobsClient.triggerJob({
    name: 'send.password.reset.success.email',
    payload: {
      userId: foundToken.userId
    }
  });
  return {
    userId: foundToken.userId
  };
};

export { resetPassword };
//# sourceMappingURL=reset-password.js.map
