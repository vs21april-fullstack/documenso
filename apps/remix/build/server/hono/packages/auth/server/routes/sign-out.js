import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { sValidator } from '@hono/standard-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { validateSessionToken, invalidateSessions } from '../lib/session/session.js';
import { getSessionCookie, deleteSessionCookie } from '../lib/session/session-cookies.js';

const ZSignoutSessionSchema = z.object({
  sessionId: z.string().trim().min(1)
});
const signOutRoute = new Hono().post('/signout', async c => {
  const metadata = c.get('requestMetadata');
  const sessionToken = await getSessionCookie(c);
  if (!sessionToken) {
    return new Response('No session found', {
      status: 401
    });
  }
  const {
    session
  } = await validateSessionToken(sessionToken);
  if (!session) {
    deleteSessionCookie(c);
    return new Response('No session found', {
      status: 401
    });
  }
  await invalidateSessions({
    userId: session.userId,
    sessionIds: [session.id],
    metadata,
    isRevoke: false
  });
  deleteSessionCookie(c);
  return c.status(200);
}).post('/signout-all', async c => {
  const metadata = c.get('requestMetadata');
  const sessionToken = await getSessionCookie(c);
  if (!sessionToken) {
    return new Response('No session found', {
      status: 401
    });
  }
  const {
    session
  } = await validateSessionToken(sessionToken);
  if (!session) {
    deleteSessionCookie(c);
    return new Response('No session found', {
      status: 401
    });
  }
  const userId = session.userId;
  const userSessionIds = await prismaWithReplicas.session.findMany({
    where: {
      userId,
      id: {
        not: session.id
      }
    },
    select: {
      id: true
    }
  }).then(sessions => sessions.map(session => session.id));
  await invalidateSessions({
    userId,
    sessionIds: userSessionIds,
    metadata,
    isRevoke: true
  });
  return c.status(200);
}).post('/signout-session', sValidator('json', ZSignoutSessionSchema), async c => {
  const metadata = c.get('requestMetadata');
  const {
    sessionId: sessionIdToRevoke
  } = c.req.valid('json');
  const sessionToken = await getSessionCookie(c);
  if (!sessionToken) {
    return new Response('No session found', {
      status: 401
    });
  }
  const {
    session
  } = await validateSessionToken(sessionToken);
  if (!session) {
    deleteSessionCookie(c);
    return new Response('No session found', {
      status: 401
    });
  }
  await invalidateSessions({
    userId: session.userId,
    sessionIds: [sessionIdToRevoke],
    metadata,
    isRevoke: true
  });
  if (session.id === sessionIdToRevoke) {
    deleteSessionCookie(c);
  }
  return c.status(200);
});

export { signOutRoute };
//# sourceMappingURL=sign-out.js.map
