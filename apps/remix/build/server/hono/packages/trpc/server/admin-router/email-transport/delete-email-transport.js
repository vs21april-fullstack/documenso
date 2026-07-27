import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { adminProcedure } from '../../trpc.js';
import { ZDeleteEmailTransportRequestSchema, ZDeleteEmailTransportResponseSchema } from './delete-email-transport.types.js';

const deleteEmailTransportRoute = adminProcedure.input(ZDeleteEmailTransportRequestSchema).output(ZDeleteEmailTransportResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  ctx.logger.info({
    input: {
      id: input.id
    }
  });
  await prismaWithReplicas.emailTransport.delete({
    where: {
      id: input.id
    }
  });
});

export { deleteEmailTransportRoute };
//# sourceMappingURL=delete-email-transport.js.map
