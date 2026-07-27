import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { hash } from '@node-rs/bcrypt';
import { SALT_ROUNDS } from '../../constants/auth.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { createPersonalOrganisation } from '../organisation/create-organisation.js';

const createUser = async ({
  name,
  email,
  password,
  signature
}) => {
  const hashedPassword = await hash(password, SALT_ROUNDS);
  const userExists = await prismaWithReplicas.user.findFirst({
    where: {
      email: email.toLowerCase()
    }
  });
  if (userExists) {
    throw new AppError(AppErrorCode.ALREADY_EXISTS);
  }
  const user = await prismaWithReplicas.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      // Todo: (RR7) Drop password.
      signature
    }
  });
  // Todo: (RR7) Migrate to use this after RR7.
  // Note: If we actually ever proceed with this, there are multiple
  // locations where we will need to update this.
  // const user = await prisma.$transaction(async (tx) => {
  //   const user = await tx.user.create({
  //     data: {
  //       name,
  //       email: email.toLowerCase(),
  //       password: hashedPassword, // Todo: (RR7) Drop password.
  //       signature,
  //     },
  //   });
  //   await tx.account.create({
  //     data: {
  //       userId: user.id,
  //       type: 'emailPassword', // Todo: (RR7)
  //       provider: 'DOCUMENSO', // Todo: (RR7) Enums
  //       providerAccountId: user.id.toString(),
  //       password: hashedPassword,
  //     },
  //   });
  //   return user;
  // });
  // Not used at the moment, uncomment if required.
  await onCreateUserHook(user).catch(err => {
    // Todo: (RR7) Add logging.
    console.error(err);
  });
  return user;
};
/**
 * Should be run after a user is created, example during email password signup or google sign in.
 *
 * @returns User
 */
const onCreateUserHook = async (user, options = {}) => {
  if (!options.skipPersonalOrganisation) {
    await createPersonalOrganisation({
      userId: user.id
    });
  }
  return user;
};

export { createUser, onCreateUserHook };
//# sourceMappingURL=create-user.js.map
