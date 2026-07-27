import { assertUserNotDisabledById } from '../../../../lib/server-only/user/assert-user-not-disabled.js';
import { generateSessionToken, createSession } from '../session/session.js';
import { setSessionCookie } from '../session/session-cookies.js';

/**
 * Handles creating a session.
 *
 * Refuses to issue a session for a disabled account. This is the single
 * chokepoint shared by every sign-in path (email/password, passkey, OAuth,
 * OIDC, organisation OIDC), so the guard belongs here rather than in each
 * caller.
 */
const onAuthorize = async (user, c) => {
  await assertUserNotDisabledById({
    userId: user.userId
  });
  const metadata = c.get('requestMetadata');
  const sessionToken = generateSessionToken();
  await createSession(sessionToken, user.userId, metadata);
  await setSessionCookie(c, sessionToken);
};

export { onAuthorize };
//# sourceMappingURL=authorizer.js.map
