import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { INTERNAL_CLAIM_ID } from '../../../lib/types/subscription.js';
import { isOrganisationPendingPayment } from '../../../lib/utils/billing.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { SubscriptionStatus, DocumentSource, EnvelopeType } from '@prisma/client';
import { DateTime } from 'luxon';
import { FREE_PLAN_LIMITS, SELFHOSTED_PLAN_LIMITS, PAID_PLAN_LIMITS, INACTIVE_PLAN_LIMITS } from './constants.js';
import { ERROR_CODES } from './errors.js';

const getServerLimits = async ({
  userId,
  teamId
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: {
      teams: {
        some: {
          id: teamId
        }
      },
      members: {
        some: {
          userId
        }
      }
    },
    include: {
      subscription: true,
      organisationClaim: true
    }
  });
  if (!organisation) {
    throw new Error(ERROR_CODES.USER_FETCH_FAILED);
  }
  const quota = structuredClone(FREE_PLAN_LIMITS);
  const remaining = structuredClone(FREE_PLAN_LIMITS);
  const subscription = organisation.subscription;
  const maximumEnvelopeItemCount = organisation.organisationClaim.envelopeItemCount;
  if (!IS_BILLING_ENABLED()) {
    return {
      quota: SELFHOSTED_PLAN_LIMITS,
      remaining: SELFHOSTED_PLAN_LIMITS,
      maximumEnvelopeItemCount
    };
  }
  // Bypass all limits even if plan expired for ENTERPRISE.
  if (organisation.organisationClaimId === INTERNAL_CLAIM_ID.ENTERPRISE) {
    return {
      quota: PAID_PLAN_LIMITS,
      remaining: PAID_PLAN_LIMITS,
      maximumEnvelopeItemCount
    };
  }
  // Early return for users with an expired subscription.
  if (subscription && subscription.status === SubscriptionStatus.INACTIVE) {
    return {
      quota: INACTIVE_PLAN_LIMITS,
      remaining: INACTIVE_PLAN_LIMITS,
      maximumEnvelopeItemCount
    };
  }
  // Early return for organisations created ahead of a paid checkout that are still awaiting payment.
  if (isOrganisationPendingPayment(organisation)) {
    return {
      quota: INACTIVE_PLAN_LIMITS,
      remaining: INACTIVE_PLAN_LIMITS,
      maximumEnvelopeItemCount
    };
  }
  // Allow unlimited documents for users with an unlimited documents claim.
  // This also allows "free" claim users without subscriptions if they have this flag.
  if (organisation.organisationClaim.flags.unlimitedDocuments) {
    return {
      quota: PAID_PLAN_LIMITS,
      remaining: PAID_PLAN_LIMITS,
      maximumEnvelopeItemCount
    };
  }
  const [documents, directTemplates] = await Promise.all([prismaWithReplicas.envelope.count({
    where: {
      type: EnvelopeType.DOCUMENT,
      team: {
        organisationId: organisation.id
      },
      createdAt: {
        gte: DateTime.utc().startOf('month').toJSDate()
      },
      source: {
        not: DocumentSource.TEMPLATE_DIRECT_LINK
      }
    }
  }), prismaWithReplicas.envelope.count({
    where: {
      type: EnvelopeType.TEMPLATE,
      team: {
        organisationId: organisation.id
      },
      directLink: {
        isNot: null
      }
    }
  })]);
  remaining.documents = Math.max(remaining.documents - documents, 0);
  remaining.directTemplates = Math.max(remaining.directTemplates - directTemplates, 0);
  return {
    quota,
    remaining,
    maximumEnvelopeItemCount
  };
};

export { getServerLimits };
//# sourceMappingURL=server.js.map
