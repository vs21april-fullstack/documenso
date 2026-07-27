import { TeamEmailRemovedTemplate } from '../../../email/templates/team-email-removed.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { createElement } from 'react';
import { getI18nInstance } from '../../client-only/providers/i18n-server.js';
import { env } from '../../utils/env.js';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getEmailContext } from '../email/get-email-context.js';

/**
 * Delete a team email.
 *
 * The user must either be part of the team with the required permissions, or the owner of the email.
 */
const deleteTeamEmail = async ({
  userId,
  userEmail,
  teamId
}) => {
  const {
    branding,
    emailLanguage,
    senderEmail,
    emailTransport
  } = await getEmailContext({
    emailType: 'INTERNAL',
    source: {
      type: 'team',
      teamId
    }
  });
  const team = await prismaWithReplicas.team.findFirstOrThrow({
    where: {
      OR: [buildTeamWhereQuery({
        teamId,
        userId,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
      }), {
        id: teamId,
        teamEmail: {
          email: userEmail
        }
      }]
    },
    include: {
      teamEmail: true,
      organisation: {
        select: {
          owner: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }
    }
  });
  await prismaWithReplicas.teamEmail.delete({
    where: {
      teamId
    }
  });
  try {
    const assetBaseUrl = env('NEXT_PUBLIC_WEBAPP_URL') || 'http://localhost:3000';
    const template = /*#__PURE__*/createElement(TeamEmailRemovedTemplate, {
      assetBaseUrl,
      baseUrl: NEXT_PUBLIC_WEBAPP_URL(),
      teamEmail: team.teamEmail?.email ?? '',
      teamName: team.name,
      teamUrl: team.url
    });
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
      to: {
        address: team.organisation.owner.email,
        name: team.organisation.owner.name ?? ''
      },
      from: senderEmail,
      subject: i18n._(
      /*i18n*/
      {
        id: "3DKfqV",
        values: {
          0: team.name
        }
      }),
      html,
      text
    });
  } catch (e) {
    // Todo: Teams - Alert us.
    // We don't want to prevent a user from revoking access because an email could not be sent.
  }
};

export { deleteTeamEmail };
//# sourceMappingURL=delete-team-email.js.map
