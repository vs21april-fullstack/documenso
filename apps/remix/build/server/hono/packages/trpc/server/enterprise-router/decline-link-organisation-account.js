import { ORGANISATION_ACCOUNT_LINK_VERIFICATION_TOKEN_IDENTIFIER } from '../../../lib/constants/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { procedure } from '../trpc.js';
import { ZDeclineLinkOrganisationAccountRequestSchema, ZDeclineLinkOrganisationAccountResponseSchema } from './decline-link-organisation-account.types.js';

/**
 * Unauthenicated procedure, do not copy paste.
 */
const declineLinkOrganisationAccountRoute = procedure.input(ZDeclineLinkOrganisationAccountRequestSchema).output(ZDeclineLinkOrganisationAccountResponseSchema).mutation(async ({
  input
}) => {
  const {
    token
  } = input;
  await prismaWithReplicas.verificationToken.delete({
    where: {
      token,
      identifier: ORGANISATION_ACCOUNT_LINK_VERIFICATION_TOKEN_IDENTIFIER
    }
  });
});

export { declineLinkOrganisationAccountRoute };
//# sourceMappingURL=decline-link-organisation-account.js.map
