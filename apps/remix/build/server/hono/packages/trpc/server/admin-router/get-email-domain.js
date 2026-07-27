import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZGetEmailDomainRequestSchema, ZGetEmailDomainResponseSchema } from './get-email-domain.types.js';

const getEmailDomainRoute = adminProcedure.input(ZGetEmailDomainRequestSchema).output(ZGetEmailDomainResponseSchema).query(async ({
  input
}) => {
  const {
    emailDomainId
  } = input;
  const emailDomain = await prismaWithReplicas.emailDomain.findUnique({
    where: {
      id: emailDomainId
    },
    omit: {
      privateKey: true
    },
    include: {
      organisation: {
        select: {
          id: true,
          name: true,
          url: true
        }
      },
      emails: true
    }
  });
  if (!emailDomain) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Email domain not found'
    });
  }
  return emailDomain;
});

export { getEmailDomainRoute };
//# sourceMappingURL=get-email-domain.js.map
