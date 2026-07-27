import { assertMemberCountWithinCap, syncMemberCountWithStripeSeatPlan } from '../../../ee/server-only/stripe/update-subscription-item-quantity.js';
import { OrganisationInviteEmailTemplate } from '../../../email/templates/organisation-invite.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/organisations.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { buildOrganisationWhereQuery, isOrganisationRoleWithinUserHierarchy } from '../../utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationMemberInviteStatus } from '@prisma/client';
import { nanoid } from 'nanoid';
import { createElement } from 'react';
import { getI18nInstance } from '../../client-only/providers/i18n-server.js';
import { generateDatabaseId } from '../../universal/id.js';
import { validateIfSubscriptionIsRequired } from '../../utils/billing.js';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n.js';
import { getEmailContext } from '../email/get-email-context.js';
import { getMemberOrganisationRole } from '../team/get-member-roles.js';

/**
 * Invite organisation members via email to join a organisation.
 */
const createOrganisationMemberInvites = async ({
  userId,
  userName,
  organisationId,
  invitations
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    }),
    include: {
      members: {
        select: {
          user: {
            select: {
              id: true,
              email: true
            }
          }
        }
      },
      invites: {
        where: {
          status: OrganisationMemberInviteStatus.PENDING
        }
      },
      organisationGlobalSettings: true,
      organisationClaim: true,
      subscription: true
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  const {
    organisationClaim
  } = organisation;
  const subscription = validateIfSubscriptionIsRequired(organisation.subscription);
  const currentOrganisationMemberRole = await getMemberOrganisationRole({
    organisationId: organisation.id,
    reference: {
      type: 'User',
      id: userId
    }
  });
  const organisationMemberEmails = organisation.members.map(member => member.user.email);
  const organisationMemberInviteEmails = organisation.invites.map(invite => invite.email);
  const usersToInvite = invitations.filter(invitation => {
    // Filter out users that are already members of the organisation.
    if (organisationMemberEmails.includes(invitation.email)) {
      return false;
    }
    // Filter out users that have already been invited to the organisation.
    if (organisationMemberInviteEmails.includes(invitation.email)) {
      return false;
    }
    return true;
  });
  const unauthorizedRoleAccess = usersToInvite.some(({
    organisationRole
  }) => !isOrganisationRoleWithinUserHierarchy(currentOrganisationMemberRole, organisationRole));
  if (unauthorizedRoleAccess) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'User does not have permission to set high level roles'
    });
  }
  const organisationMemberInvites = usersToInvite.map(({
    email,
    organisationRole
  }) => ({
    id: generateDatabaseId('member_invite'),
    email,
    organisationId,
    organisationRole,
    token: nanoid(32)
  }));
  const numberOfCurrentMembers = organisation.members.length;
  const numberOfCurrentInvites = organisation.invites.length;
  const numberOfNewInvites = organisationMemberInvites.length;
  const totalMemberCountWithInvites = numberOfCurrentMembers + numberOfCurrentInvites + numberOfNewInvites;
  // Enforce the seat cap and sync billing for seat based plans.
  if (subscription) {
    await assertMemberCountWithinCap(subscription, organisationClaim, totalMemberCountWithInvites);
    await syncMemberCountWithStripeSeatPlan(subscription, organisationClaim, totalMemberCountWithInvites);
  }
  await prismaWithReplicas.organisationMemberInvite.createMany({
    data: organisationMemberInvites
  });
  const sendEmailResult = await Promise.allSettled(organisationMemberInvites.map(async ({
    email,
    token
  }) => sendOrganisationMemberInviteEmail({
    email,
    token,
    organisation,
    senderName: userName
  })));
  const sendEmailResultErrorList = sendEmailResult.filter(result => result.status === 'rejected');
  if (sendEmailResultErrorList.length > 0) {
    console.error(JSON.stringify(sendEmailResultErrorList));
    throw new AppError('EmailDeliveryFailed', {
      message: 'Failed to send invite emails to one or more users.',
      userMessage: `Failed to send invites to ${sendEmailResultErrorList.length}/${organisationMemberInvites.length} users.`
    });
  }
};
/**
 * Send an email to a user inviting them to join a organisation.
 */
const sendOrganisationMemberInviteEmail = async ({
  email,
  senderName,
  token,
  organisation
}) => {
  const template = /*#__PURE__*/createElement(OrganisationInviteEmailTemplate, {
    assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
    baseUrl: NEXT_PUBLIC_WEBAPP_URL(),
    senderName,
    token,
    organisationName: organisation.name
  });
  const {
    branding,
    emailLanguage,
    senderEmail,
    emailsDisabled,
    emailTransport
  } = await getEmailContext({
    emailType: 'INTERNAL',
    source: {
      type: 'organisation',
      organisationId: organisation.id
    }
  });
  // Member invites can be sent to anyone, so block them when the organisation has email
  // sending disabled.
  if (emailsDisabled) {
    return;
  }
  const [html, text] = await Promise.all([renderEmailWithI18N(template, {
    lang: emailLanguage,
    branding
  }), renderEmailWithI18N(template, {
    lang: emailLanguage,
    branding,
    plainText: true
  })]);
  const i18n = await getI18nInstance(emailLanguage);
  await emailTransport.sendMail({
    to: email,
    from: senderEmail,
    subject: i18n._(
    /*i18n*/
    {
      id: "wodouR",
      values: {
        0: organisation.name
      }
    }),
    html,
    text
  });
};

export { createOrganisationMemberInvites, sendOrganisationMemberInviteEmail };
//# sourceMappingURL=create-organisation-member-invites.js.map
