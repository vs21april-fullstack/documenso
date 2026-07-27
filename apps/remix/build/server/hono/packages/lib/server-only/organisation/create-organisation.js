import { createCustomer } from '../../../ee/server-only/stripe/create-customer.js';
import { getSubscriptionClaim } from '../subscription/get-subscription-claim.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationType, Prisma, OrganisationMemberRole } from '@prisma/client';
import { IS_BILLING_ENABLED } from '../../constants/app.js';
import { ORGANISATION_INTERNAL_GROUPS } from '../../constants/organisations.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { INTERNAL_CLAIM_ID } from '../../types/subscription.js';
import { prefixedId, generateDatabaseId } from '../../universal/id.js';
import { generateDefaultOrganisationSettings } from '../../utils/organisations.js';
import { createTeam } from '../team/create-team.js';

const createOrganisation = async ({
  name,
  url,
  type,
  userId,
  customerId,
  claim
}) => {
  let customerIdToUse = customerId;
  if (!customerId && IS_BILLING_ENABLED()) {
    const user = await prismaWithReplicas.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'User not found'
      });
    }
    customerIdToUse = await createCustomer({
      name: user.name || user.email,
      email: user.email
    }).then(customer => customer.id).catch(err => {
      console.error(err);
      return undefined;
    });
  }
  return await prismaWithReplicas.$transaction(async tx => {
    const organisationSetting = await tx.organisationGlobalSettings.create({
      data: {
        ...generateDefaultOrganisationSettings(),
        defaultRecipients: Prisma.DbNull,
        id: generateDatabaseId('org_setting')
      }
    });
    const organisationClaim = await tx.organisationClaim.create({
      data: {
        id: generateDatabaseId('org_claim'),
        originalSubscriptionClaimId: claim.id,
        ...createOrganisationClaimUpsertData(claim)
      }
    });
    const organisationAuthenticationPortal = await tx.organisationAuthenticationPortal.create({
      data: {
        id: generateDatabaseId('org_sso'),
        enabled: false,
        clientId: '',
        clientSecret: '',
        wellKnownUrl: ''
      }
    });
    const orgIdAndUrl = prefixedId('org');
    const organisation = await tx.organisation.create({
      data: {
        id: orgIdAndUrl,
        name,
        type,
        url: url || orgIdAndUrl,
        ownerUserId: userId,
        organisationGlobalSettingsId: organisationSetting.id,
        organisationClaimId: organisationClaim.id,
        organisationAuthenticationPortalId: organisationAuthenticationPortal.id,
        groups: {
          create: ORGANISATION_INTERNAL_GROUPS.map(group => ({
            ...group,
            id: generateDatabaseId('org_group')
          }))
        },
        customerId: customerIdToUse
      },
      include: {
        groups: true
      }
    }).catch(err => {
      if (err.code === 'P2002') {
        throw new AppError(AppErrorCode.ALREADY_EXISTS, {
          message: 'Organisation URL already exists'
        });
      }
      throw err;
    });
    const adminGroup = organisation.groups.find(group => group.organisationRole === OrganisationMemberRole.ADMIN);
    if (!adminGroup) {
      throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
        message: 'Admin group not found'
      });
    }
    await tx.organisationMember.create({
      data: {
        id: generateDatabaseId('member'),
        userId,
        organisationId: organisation.id,
        organisationGroupMembers: {
          create: {
            id: generateDatabaseId('group_member'),
            groupId: adminGroup.id
          }
        }
      }
    });
    return organisation;
  });
};
const createPersonalOrganisation = async ({
  userId,
  orgUrl,
  throwErrorOnOrganisationCreationFailure = false,
  inheritMembers = true,
  type = OrganisationType.PERSONAL
}) => {
  const freeSubscriptionClaim = await getSubscriptionClaim(INTERNAL_CLAIM_ID.FREE);
  const organisation = await createOrganisation({
    name: 'Personal Organisation',
    userId,
    url: orgUrl,
    type,
    claim: freeSubscriptionClaim
  }).catch(err => {
    console.error(err);
    if (throwErrorOnOrganisationCreationFailure) {
      throw err;
    }
    // Todo: (LOGS)
  });
  if (organisation) {
    await createTeam({
      userId,
      teamName: 'Personal Team',
      teamUrl: prefixedId('personal'),
      organisationId: organisation.id,
      inheritMembers
    }).catch(err => {
      console.error(err);
      // Todo: (LOGS)
    });
  }
  return organisation;
};
const createOrganisationClaimUpsertData = subscriptionClaim => {
  // Done like this to ensure type errors are thrown if items are added.
  const data = {
    flags: {
      ...subscriptionClaim.flags
    },
    envelopeItemCount: subscriptionClaim.envelopeItemCount,
    recipientCount: subscriptionClaim.recipientCount,
    teamCount: subscriptionClaim.teamCount,
    memberCount: subscriptionClaim.memberCount,
    documentRateLimits: subscriptionClaim.documentRateLimits ?? [],
    documentQuota: subscriptionClaim.documentQuota,
    emailRateLimits: subscriptionClaim.emailRateLimits ?? [],
    emailQuota: subscriptionClaim.emailQuota,
    apiRateLimits: subscriptionClaim.apiRateLimits ?? [],
    apiQuota: subscriptionClaim.apiQuota,
    emailTransportId: subscriptionClaim.emailTransportId ?? null
  };
  return {
    ...data
  };
};

export { createOrganisation, createOrganisationClaimUpsertData, createPersonalOrganisation };
//# sourceMappingURL=create-organisation.js.map
