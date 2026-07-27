import { OrganisationLeaveEmailTemplate } from '../../../../email/templates/organisation-leave.js';
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
  const oldMember = await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: payload.memberUserId
    },
    select: {
      id: true,
      email: true,
      name: true
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
    if (member.userId === oldMember.id) {
      continue;
    }
    await io.runTask(`send-organisation-member-left-email--${oldMember.id}_${member.id}`, async () => {
      const emailContent = /*#__PURE__*/createElement(OrganisationLeaveEmailTemplate, {
        assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
        baseUrl: NEXT_PUBLIC_WEBAPP_URL(),
        memberName: oldMember.name || '',
        memberEmail: oldMember.email,
        organisationName: organisation.name,
        organisationUrl: organisation.url
      });
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
          id: "x0QQda"
        }),
        html,
        text
      });
    });
  }
};

export { run };
//# sourceMappingURL=send-organisation-member-left-email.handler.js.map
