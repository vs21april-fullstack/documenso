import { toPublicEmailTransportConfig, decryptEmailTransportConfig } from '../../../../lib/server-only/email/email-transport-config.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { adminProcedure } from '../../trpc.js';
import { ZFindEmailTransportsRequestSchema, ZFindEmailTransportsResponseSchema } from './find-email-transports.types.js';

const findEmailTransportsRoute = adminProcedure.input(ZFindEmailTransportsRequestSchema).output(ZFindEmailTransportsResponseSchema).query(async ({
  input
}) => {
  const {
    query,
    page = 1,
    perPage = 20
  } = input;
  const where = query ? {
    OR: [{
      name: {
        contains: query
      }
    }, {
      fromAddress: {
        contains: query
      }
    }]
  } : {};
  const [transports, count] = await Promise.all([prismaWithReplicas.emailTransport.findMany({
    where,
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      _count: {
        select: {
          subscriptionClaims: true,
          organisationClaims: true
        }
      }
    }
  }), prismaWithReplicas.emailTransport.count({
    where
  })]);
  // Replace the encrypted `config` blob with the non-secret connection
  // settings so the encrypted value (and secrets) never leave the server.
  const data = transports.map(({
    config,
    ...transport
  }) => {
    let publicConfig = null;
    try {
      publicConfig = toPublicEmailTransportConfig(decryptEmailTransportConfig(config));
    } catch {
      publicConfig = null;
    }
    return {
      ...transport,
      config: publicConfig
    };
  });
  return {
    data,
    count,
    currentPage: page,
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
});

export { findEmailTransportsRoute };
//# sourceMappingURL=find-email-transports.js.map
