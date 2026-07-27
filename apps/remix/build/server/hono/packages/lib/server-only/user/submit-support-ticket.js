import { plainClient } from '../../plain/client.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../utils/organisations.js';
import { getTeamById } from '../team/get-team.js';

const submitSupportTicket = async ({
  subject,
  message,
  userId,
  organisationId,
  teamId
}) => {
  if (!plainClient) {
    throw new AppError(AppErrorCode.NOT_SETUP, {
      message: 'Support ticket system is not configured'
    });
  }
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      id: userId
    }
  });
  if (!user) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'User not found'
    });
  }
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId
    })
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Organisation not found'
    });
  }
  const team = teamId ? await getTeamById({
    userId,
    teamId
  }) : null;
  // Ensure the customer exists in Plain before creating a thread
  const plainCustomer = await plainClient.upsertCustomer({
    identifier: {
      emailAddress: user.email
    },
    onCreate: {
      // If the user doesn't have a name, default to their email
      fullName: user.name || user.email,
      email: {
        email: user.email,
        isVerified: !!user.emailVerified
      }
    },
    // No need to update the customer if it already exists
    onUpdate: {}
  });
  if (plainCustomer.error) {
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: `Failed to create customer in support system: ${plainCustomer.error.message}`
    });
  }
  const customMessage = `
Organisation: ${organisation.name} (${organisation.id})
Team: ${team ? `${team.name} (${team.id})` : 'No team provided'}

${message}`;
  const res = await plainClient.createThread({
    title: subject,
    customerIdentifier: {
      customerId: plainCustomer.data.customer.id
    },
    components: [{
      componentText: {
        text: customMessage
      }
    }]
  });
  if (res.error) {
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: `Failed to create support ticket: ${res.error.message}`
    });
  }
  return res;
};

export { submitSupportTicket };
//# sourceMappingURL=submit-support-ticket.js.map
