import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const transferTeamEnvelopes = async ({
  sourceTeamId,
  targetTeamId
}) => {
  await prismaWithReplicas.envelope.updateMany({
    where: {
      teamId: sourceTeamId
    },
    data: {
      teamId: targetTeamId
    }
  });
};

export { transferTeamEnvelopes };
//# sourceMappingURL=transfer-team-envelopes.js.map
