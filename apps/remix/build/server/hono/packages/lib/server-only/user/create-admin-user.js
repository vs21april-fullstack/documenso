import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';

/**
 * Create a user for admin-initiated flows.
 *
 * Unlike normal signup, this function:
 * - Leaves the password unset (`null`); the user must set it later via a password reset/onboarding link
 * - Marks the email as verified immediately because this route is only called by admins
 * - Does NOT create a personal organisation (user will be added to real org)
 * - Returns the user immediately without side effects
 */
const createAdminUser = async ({
  name,
  email
}) => {
  const userExists = await prismaWithReplicas.user.findFirst({
    where: {
      email: email.toLowerCase()
    }
  });
  if (userExists) {
    throw new AppError(AppErrorCode.ALREADY_EXISTS, {
      message: 'User with this email already exists'
    });
  }
  const user = await prismaWithReplicas.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: null,
      // Verifying the email here instead of the password reset flow to reduce the
      // attack surface. This route is only called by admins.
      emailVerified: new Date()
    }
  });
  return user;
};

export { createAdminUser };
//# sourceMappingURL=create-admin-user.js.map
