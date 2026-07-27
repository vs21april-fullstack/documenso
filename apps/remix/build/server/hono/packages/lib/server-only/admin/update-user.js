import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const updateUser = async ({
  id,
  name,
  email,
  roles
}) => {
  await prismaWithReplicas.user.update({
    where: {
      id
    },
    data: {
      name,
      email,
      roles
    }
  });
};

export { updateUser };
//# sourceMappingURL=update-user.js.map
