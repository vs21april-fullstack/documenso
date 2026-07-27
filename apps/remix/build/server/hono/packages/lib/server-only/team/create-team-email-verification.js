import { ConfirmTeamEmailTemplate } from '../../../email/templates/confirm-team-email.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { createTokenVerification } from '../../utils/token-verification.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { Prisma } from '@prisma/client';
import { createElement } from 'react';
import { z } from 'zod';
import { getI18nInstance } from '../../client-only/providers/i18n-server.js';
import { env } from '../../utils/env.js';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getEmailContext } from '../email/get-email-context.js';

const createTeamEmailVerification = async ({
  userId,
  teamId,
  data
}) => {
  try {
    const team = await prismaWithReplicas.team.findFirstOrThrow({
      where: buildTeamWhereQuery({
        teamId,
        userId,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
      }),
      include: {
        teamEmail: true,
        emailVerification: true
      }
    });
    if (team.teamEmail || team.emailVerification) {
      throw new AppError(AppErrorCode.INVALID_REQUEST, {
        message: 'Team already has an email or existing email verification.'
      });
    }
    const {
      token,
      expiresAt
    } = createTokenVerification({
      hours: 1
    });
    await prismaWithReplicas.$transaction(async tx => {
      const existingTeamEmail = await tx.teamEmail.findFirst({
        where: {
          email: data.email
        }
      });
      if (existingTeamEmail) {
        throw new AppError(AppErrorCode.ALREADY_EXISTS, {
          message: 'Email already taken by another team.'
        });
      }
      await tx.teamEmailVerification.create({
        data: {
          token,
          expiresAt,
          email: data.email,
          name: data.name,
          teamId
        }
      });
    });
    // Send email outside the transaction to avoid holding a connection
    // open during network I/O.
    await sendTeamEmailVerificationEmail(data.email, token, team);
  } catch (err) {
    console.error(err);
    if (!(err instanceof Prisma.PrismaClientKnownRequestError)) {
      throw err;
    }
    const target = z.array(z.string()).safeParse(err.meta?.target);
    if (err.code === 'P2002' && target.success && target.data.includes('email')) {
      throw new AppError(AppErrorCode.ALREADY_EXISTS, {
        message: 'Email already taken by another team.'
      });
    }
    throw err;
  }
};
/**
 * Send an email to a user asking them to accept a team email request.
 *
 * @param email The email address to use for the team.
 * @param token The token used to authenticate that the user has granted access.
 * @param teamName The name of the team the user is being invited to.
 * @param teamUrl The url of the team the user is being invited to.
 */
const sendTeamEmailVerificationEmail = async (email, token, team) => {
  const assetBaseUrl = env('NEXT_PUBLIC_WEBAPP_URL') || 'http://localhost:3000';
  const template = /*#__PURE__*/createElement(ConfirmTeamEmailTemplate, {
    assetBaseUrl,
    baseUrl: NEXT_PUBLIC_WEBAPP_URL(),
    teamName: team.name,
    teamUrl: team.url,
    token
  });
  const {
    branding,
    emailLanguage,
    senderEmail,
    emailTransport
  } = await getEmailContext({
    emailType: 'INTERNAL',
    source: {
      type: 'team',
      teamId: team.id
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
      id: "QABzUh",
      values: {
        0: team.name
      }
    }),
    html,
    text
  });
};

export { createTeamEmailVerification, sendTeamEmailVerificationEmail };
//# sourceMappingURL=create-team-email-verification.js.map
