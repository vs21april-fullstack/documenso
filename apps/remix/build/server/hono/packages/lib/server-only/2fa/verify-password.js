import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { compare } from '@node-rs/bcrypt';

const verifyPassword = async ({
  userId,
  password
}) => {
  const user = await prismaWithReplicas.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user || !user.password) {
    return false;
  }
  return await compare(password, user.password);
};

export { verifyPassword };
//# sourceMappingURL=verify-password.js.map
