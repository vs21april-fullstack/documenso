import { SALT_ROUNDS } from '../../constants/auth.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { compare, hash } from '@node-rs/bcrypt';
import { UserSecurityAuditLogType } from '@prisma/client';
import { AppError } from '../../errors/app-error.js';

const updatePassword = async ({
  userId,
  password,
  currentPassword,
  requestMetadata
}) => {
  // Existence check
  const user = await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    }
  });
  if (!user.password) {
    throw new AppError('NO_PASSWORD');
  }
  const isCurrentPasswordValid = await compare(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    throw new AppError('INCORRECT_PASSWORD');
  }
  // Compare the new password with the old password
  const isSamePassword = await compare(password, user.password);
  if (isSamePassword) {
    throw new AppError('SAME_PASSWORD');
  }
  const hashedNewPassword = await hash(password, SALT_ROUNDS);
  return await prismaWithReplicas.$transaction(async tx => {
    await tx.userSecurityAuditLog.create({
      data: {
        userId,
        type: UserSecurityAuditLogType.PASSWORD_UPDATE,
        userAgent: requestMetadata?.userAgent,
        ipAddress: requestMetadata?.ipAddress
      }
    });
    await tx.passwordResetToken.deleteMany({
      where: {
        userId
      }
    });
    return await tx.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedNewPassword
      }
    });
  });
};

export { updatePassword };
//# sourceMappingURL=update-password.js.map
