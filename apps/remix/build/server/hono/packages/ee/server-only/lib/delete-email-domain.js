import { DeleteEmailIdentityCommand } from '@aws-sdk/client-sesv2';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { getSesClient } from './create-email-domain.js';

/**
 * Delete the email domain and SES email identity.
 *
 * Permission is assumed to be checked in the caller.
 */
const deleteEmailDomain = async ({
  emailDomainId
}) => {
  const emailDomain = await prismaWithReplicas.emailDomain.findUnique({
    where: {
      id: emailDomainId
    }
  });
  if (!emailDomain) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Email domain not found'
    });
  }
  const sesClient = getSesClient();
  await sesClient.send(new DeleteEmailIdentityCommand({
    EmailIdentity: emailDomain.domain
  })).catch(err => {
    console.error(err);
    // Do nothing if it no longer exists in SES.
    if (err.name === 'NotFoundException') {
      return;
    }
  });
  await prismaWithReplicas.emailDomain.delete({
    where: {
      id: emailDomainId
    }
  });
};

export { deleteEmailDomain };
//# sourceMappingURL=delete-email-domain.js.map
