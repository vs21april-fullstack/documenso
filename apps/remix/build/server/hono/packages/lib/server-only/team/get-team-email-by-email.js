import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import '../../utils/teams.js';

const getTeamEmailByEmail = async ({
  email
}) => {
  return await prismaWithReplicas.teamEmail.findFirst({
    where: {
      email
    },
    include: {
      team: {
        select: {
          id: true,
          name: true,
          url: true
        }
      }
    }
  });
};

export { getTeamEmailByEmail };
//# sourceMappingURL=get-team-email-by-email.js.map
