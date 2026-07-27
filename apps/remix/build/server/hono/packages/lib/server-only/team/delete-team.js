import { TeamDeleteEmailTemplate } from '../../../email/templates/team-delete.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationGroupType } from '@prisma/client';
import { createElement } from 'react';
import { uniqueBy } from 'remeda';
import { getI18nInstance } from '../../client-only/providers/i18n-server.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { jobs } from '../../jobs/client.js';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getEmailContext } from '../email/get-email-context.js';

const deleteTeam = async ({
  userId,
  teamId
}) => {
  const team = await prismaWithReplicas.team.findFirst({
    where: buildTeamWhereQuery({
      teamId,
      userId,
      roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['DELETE_TEAM']
    }),
    include: {
      organisation: {
        select: {
          organisationGlobalSettings: true
        }
      },
      teamGroups: {
        include: {
          organisationGroup: {
            include: {
              organisationGroupMembers: {
                include: {
                  organisationMember: {
                    include: {
                      user: {
                        select: {
                          id: true,
                          name: true,
                          email: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
  if (!team) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not authorized to delete this team'
    });
  }
  const membersToNotify = uniqueBy(team.teamGroups.flatMap(group => group.organisationGroup.organisationGroupMembers.map(member => ({
    id: member.organisationMember.user.id,
    name: member.organisationMember.user.name || '',
    email: member.organisationMember.user.email
  }))), member => member.id);
  await prismaWithReplicas.$transaction(async tx => {
    await tx.team.delete({
      where: {
        id: teamId
      }
    });
    // Purge all internal organisation groups that have no teams.
    await tx.organisationGroup.deleteMany({
      where: {
        organisationId: team.organisationId,
        type: OrganisationGroupType.INTERNAL_TEAM,
        teamGroups: {
          none: {}
        }
      }
    });
  });
  await jobs.triggerJob({
    name: 'send.team-deleted.email',
    payload: {
      team: {
        name: team.name,
        url: team.url
      },
      members: membersToNotify,
      organisationId: team.organisationId
    }
  });
};
const sendTeamDeleteEmail = async ({
  email,
  team,
  organisationId
}) => {
  const template = /*#__PURE__*/createElement(TeamDeleteEmailTemplate, {
    assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
    baseUrl: NEXT_PUBLIC_WEBAPP_URL(),
    teamUrl: team.url
  });
  const {
    branding,
    emailLanguage,
    senderEmail,
    emailTransport
  } = await getEmailContext({
    emailType: 'INTERNAL',
    source: {
      type: 'organisation',
      organisationId
    }
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
    to: email,
    from: senderEmail,
    subject: i18n._(
    /*i18n*/
    {
      id: "iefRzN",
      values: {
        0: team.name
      }
    }),
    html,
    text
  });
};

export { deleteTeam, sendTeamDeleteEmail };
//# sourceMappingURL=delete-team.js.map
