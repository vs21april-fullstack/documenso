import { sendTeamDeleteEmail } from '../../../server-only/team/delete-team.js';

const run = async ({
  payload,
  io
}) => {
  const {
    team,
    members,
    organisationId
  } = payload;
  for (const member of members) {
    await io.runTask(`send-team-deleted-email--${team.url}_${member.id}`, async () => {
      await sendTeamDeleteEmail({
        email: member.email,
        team,
        organisationId
      });
    });
  }
};

export { run };
//# sourceMappingURL=send-team-deleted-email.handler.js.map
