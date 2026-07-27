import { Hono } from 'hono';
import superjson from 'superjson';
import { getOptionalSession, getActiveSessions } from '../lib/utils/get-session.js';

const sessionRoute = new Hono().get('/session', async c => {
  const session = await getOptionalSession(c);
  return c.json(session);
}).get('/sessions', async c => {
  const sessions = await getActiveSessions(c);
  return c.json(superjson.serialize({
    sessions
  }));
}).get('/session-json', async c => {
  const session = await getOptionalSession(c);
  return c.json(superjson.serialize(session));
});

export { sessionRoute };
//# sourceMappingURL=session.js.map
