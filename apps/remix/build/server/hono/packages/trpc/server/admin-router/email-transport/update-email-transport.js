import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { decryptEmailTransportConfig, EMAIL_TRANSPORT_SECRET_KEYS, ZEmailTransportConfigSchema, encryptEmailTransportConfig } from '../../../../lib/server-only/email/email-transport-config.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { adminProcedure } from '../../trpc.js';
import { ZUpdateEmailTransportRequestSchema, ZUpdateEmailTransportResponseSchema } from './update-email-transport.types.js';

const updateEmailTransportRoute = adminProcedure.input(ZUpdateEmailTransportRequestSchema).output(ZUpdateEmailTransportResponseSchema).mutation(async ({
  input
}) => {
  const {
    id,
    data
  } = input;
  const existing = await prismaWithReplicas.emailTransport.findUnique({
    where: {
      id
    }
  });
  if (!existing) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Email transport not found'
    });
  }
  const existingConfig = decryptEmailTransportConfig(existing.config);
  // Start from the incoming config; backfill empty secret fields from the existing
  // config (only when the type is unchanged).
  const merged = {
    ...data.config
  };
  if (existingConfig.type === data.config.type) {
    for (const key of EMAIL_TRANSPORT_SECRET_KEYS) {
      const incoming = data.config[key];
      if (incoming === undefined || incoming === '') {
        merged[key] = existingConfig[key];
      }
    }
  }
  const config = ZEmailTransportConfigSchema.parse(merged);
  await prismaWithReplicas.emailTransport.update({
    where: {
      id
    },
    data: {
      name: data.name,
      type: config.type,
      fromName: data.fromName,
      fromAddress: data.fromAddress,
      config: encryptEmailTransportConfig(config)
    }
  });
});

export { updateEmailTransportRoute };
//# sourceMappingURL=update-email-transport.js.map
