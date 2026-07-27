import { AppError } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const disableUser = async ({
  id
}) => {
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id
    },
    include: {
      apiTokens: true,
      webhooks: true,
      passkeys: true,
      verificationTokens: true,
      passwordResetTokens: true
    }
  });
  if (!user) {
    throw new AppError('There was an error disabling the user');
  }
  try {
    await prismaWithReplicas.$transaction(async tx => {
      await tx.user.update({
        where: {
          id
        },
        data: {
          disabled: true
        }
      });
      await tx.apiToken.updateMany({
        where: {
          userId: id
        },
        data: {
          expires: new Date()
        }
      });
      await tx.webhook.updateMany({
        where: {
          userId: id
        },
        data: {
          enabled: false
        }
      });
      await tx.verificationToken.updateMany({
        where: {
          userId: id
        },
        data: {
          expires: new Date()
        }
      });
      await tx.passwordResetToken.updateMany({
        where: {
          userId: id
        },
        data: {
          expiry: new Date()
        }
      });
      await tx.passkey.deleteMany({
        where: {
          userId: id
        }
      });
    });
  } catch (error) {
    console.error('Error disabling user', error);
    throw error;
  }
};

export { disableUser };
//# sourceMappingURL=disable-user.js.map
