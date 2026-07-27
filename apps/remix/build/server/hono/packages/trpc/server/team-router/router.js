import { createTeamEmailVerification } from '../../../lib/server-only/team/create-team-email-verification.js';
import { deleteTeamEmail } from '../../../lib/server-only/team/delete-team-email.js';
import { deleteTeamEmailVerification } from '../../../lib/server-only/team/delete-team-email-verification.js';
import { getTeamEmailByEmail } from '../../../lib/server-only/team/get-team-email-by-email.js';
import { resendTeamEmailVerification } from '../../../lib/server-only/team/resend-team-email-verification.js';
import { updateTeamEmail } from '../../../lib/server-only/team/update-team-email.js';
import { router, authenticatedProcedure } from '../trpc.js';
import { createTeamRoute } from './create-team.js';
import { createTeamGroupsRoute } from './create-team-groups.js';
import { createTeamMembersRoute } from './create-team-members.js';
import { deleteTeamRoute } from './delete-team.js';
import { deleteTeamGroupRoute } from './delete-team-group.js';
import { deleteTeamMemberRoute } from './delete-team-member.js';
import { findTeamGroupsRoute } from './find-team-groups.js';
import { findTeamMembersRoute } from './find-team-members.js';
import { findTeamsRoute } from './find-teams.js';
import { getTeamRoute } from './get-team.js';
import { getTeamMembersRoute } from './get-team-members.js';
import { ZDeleteTeamEmailVerificationMutationSchema, ZResendTeamEmailVerificationMutationSchema, ZCreateTeamEmailVerificationMutationSchema, ZDeleteTeamEmailMutationSchema, ZUpdateTeamEmailMutationSchema } from './schema.js';
import { updateTeamRoute } from './update-team.js';
import { updateTeamBrandingLogoRoute } from './update-team-branding-logo.js';
import { updateTeamGroupRoute } from './update-team-group.js';
import { updateTeamMemberRoute } from './update-team-member.js';
import { updateTeamSettingsRoute } from './update-team-settings.js';

const teamRouter = router({
  find: findTeamsRoute,
  get: getTeamRoute,
  create: createTeamRoute,
  update: updateTeamRoute,
  delete: deleteTeamRoute,
  member: {
    find: findTeamMembersRoute,
    getMany: getTeamMembersRoute,
    createMany: createTeamMembersRoute,
    update: updateTeamMemberRoute,
    delete: deleteTeamMemberRoute
  },
  group: {
    find: findTeamGroupsRoute,
    createMany: createTeamGroupsRoute,
    update: updateTeamGroupRoute,
    delete: deleteTeamGroupRoute
  },
  settings: {
    update: updateTeamSettingsRoute,
    updateBrandingLogo: updateTeamBrandingLogoRoute
  },
  // Old routes (to be migrated)
  // Todo: Refactor into routes.
  email: {
    get: authenticatedProcedure.query(async ({
      ctx
    }) => {
      return await getTeamEmailByEmail({
        email: ctx.user.email
      });
    }),
    update: authenticatedProcedure.input(ZUpdateTeamEmailMutationSchema).mutation(async ({
      input,
      ctx
    }) => {
      ctx.logger.info({
        input: {
          teamId: input.teamId
        }
      });
      return await updateTeamEmail({
        userId: ctx.user.id,
        ...input
      });
    }),
    delete: authenticatedProcedure.input(ZDeleteTeamEmailMutationSchema).mutation(async ({
      input,
      ctx
    }) => {
      const {
        teamId
      } = input;
      ctx.logger.info({
        input: {
          teamId
        }
      });
      return await deleteTeamEmail({
        userId: ctx.user.id,
        userEmail: ctx.user.email,
        teamId
      });
    }),
    verification: {
      send: authenticatedProcedure.input(ZCreateTeamEmailVerificationMutationSchema).mutation(async ({
        input,
        ctx
      }) => {
        const {
          teamId,
          email,
          name
        } = input;
        ctx.logger.info({
          input: {
            teamId
          }
        });
        return await createTeamEmailVerification({
          teamId,
          userId: ctx.user.id,
          data: {
            email,
            name
          }
        });
      }),
      resend: authenticatedProcedure.input(ZResendTeamEmailVerificationMutationSchema).mutation(async ({
        input,
        ctx
      }) => {
        const {
          teamId
        } = input;
        ctx.logger.info({
          input: {
            teamId
          }
        });
        await resendTeamEmailVerification({
          userId: ctx.user.id,
          teamId
        });
      }),
      delete: authenticatedProcedure.input(ZDeleteTeamEmailVerificationMutationSchema).mutation(async ({
        input,
        ctx
      }) => {
        const {
          teamId
        } = input;
        ctx.logger.info({
          input: {
            teamId
          }
        });
        return await deleteTeamEmailVerification({
          userId: ctx.user.id,
          teamId
        });
      })
    }
  }
});

export { teamRouter };
//# sourceMappingURL=router.js.map
