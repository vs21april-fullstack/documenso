import { encryptEmailTransportConfig } from '../../../../lib/server-only/email/email-transport-config.js';
import { generateDatabaseId } from '../../../../lib/universal/id.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { adminProcedure } from '../../trpc.js';
import { ZCreateEmailTransportRequestSchema, ZCreateEmailTransportResponseSchema } from './create-email-transport.types.js';

const createEmailTransportRoute = adminProcedure.input(ZCreateEmailTransportRequestSchema).output(ZCreateEmailTransportResponseSchema).mutation(async ({
  input
}) => {
  const {
    name,
    fromName,
    fromAddress,
    config
  } = input;
  const transport = await prismaWithReplicas.emailTransport.create({
    data: {
      id: generateDatabaseId('email_transport'),
      name,
      type: config.type,
      fromName,
      fromAddress,
      config: encryptEmailTransportConfig(config)
    },
    select: {
      id: true
    }
  });
  return {
    id: transport.id
  };
});

export { createEmailTransportRoute };
//# sourceMappingURL=create-email-transport.js.map
