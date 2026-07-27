import { OrganisationJoinEmailTemplate } from '../../../../email/templates/organisation-join.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../../constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../constants/organisations.js';
import { getEmailContext } from '../../../server-only/email/get-email-context.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';

const run = async ({
  payload,
  io
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirstOrThrow({
    where: {
      id: payload.organisationId
    },
    include: {
      members: {
        where: {
          organisationGroupMembers: {
            some: {
              group: {
                organisationRole: {
                  in: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
                }
              }
            }
          }
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          }
        }
      }
    }
  });
  const invitedMember = await prismaWithReplicas.organisationMember.findFirstOrThrow({
    where: {
      userId: payload.memberUserId,
      organisationId: payload.organisationId
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    }
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
      organisationId: organisation.id
    }
  });
  for (const member of organisation.members) {
    if (member.id === invitedMember.id) {
      continue;
    }
    await io.runTask(`send-organisation-member-joined-email--${invitedMember.id}_${member.id}`, async () => {
      const emailContent = /*#__PURE__*/createElement(OrganisationJoinEmailTemplate, {
        assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
        baseUrl: NEXT_PUBLIC_WEBAPP_URL(),
        memberName: invitedMember.user.name || '',
        memberEmail: invitedMember.user.email,
        organisationName: organisation.name,
        organisationUrl: organisation.url
      });
      // !: Replace with the actual language of the recipient later
      const [html, text] = await Promise.all([renderEmailWithI18N(emailContent, {
        lang: emailLanguage,
        branding
      }), renderEmailWithI18N(emailContent, {
        lang: emailLanguage,
        branding,
        plainText: true
      })]);
      const i18n = await getI18nInstance(emailLanguage);
      await emailTransport.sendMail({
        to: member.user.email,
        from: senderEmail,
        subject: i18n._(
        /*i18n*/
        {
          id: "TqYjhl"
        }),
        html,
        text
      });
    });
  }
};

export { run };
//# sourceMappingURL=send-organisation-member-joined-email.handler.js.map
