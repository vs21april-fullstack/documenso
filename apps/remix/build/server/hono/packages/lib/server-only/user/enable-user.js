import { AppError } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const enableUser = async ({
  id
}) => {
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id
    }
  });
  if (!user) {
    throw new AppError('There was an error enabling the user');
  }
  await prismaWithReplicas.user.update({
    where: {
      id
    },
    data: {
      disabled: false
    }
  });
};

export { enableUser };
//# sourceMappingURL=enable-user.js.map
