import { ApiContractV1 } from './v1/contract.js';
import { ApiContractV1Implementation } from './v1/implementation.js';
import { OpenAPIV1 } from './v1/openapi.js';
import { testCredentialsHandler } from '../lib/server-only/public-api/test-credentials.js';
import { listDocumentsHandler } from '../lib/server-only/webhooks/zapier/list-documents.js';
import { subscribeHandler } from '../lib/server-only/webhooks/zapier/subscribe.js';
import { unsubscribeHandler } from '../lib/server-only/webhooks/zapier/unsubscribe.js';
import { fetchRequestHandler, TsRestHttpError } from '@ts-rest/serverless/fetch';
import { Hono } from 'hono';

// This is bad, ts-router will be created on each request.
// But don't really have a choice here.
const tsRestHonoApp = new Hono();
tsRestHonoApp.get('/openapi', c => c.redirect('https://openapi-v1.documenso.com')).get('/openapi.json', c => c.json(OpenAPIV1)).get('/me', async c => testCredentialsHandler(c.req.raw));
// Zapier. Todo: (RR7) Check methods. Are these get/post/update requests?
tsRestHonoApp.all('/zapier/list-documents', async c => listDocumentsHandler(c.req.raw)).all('/zapier/subscribe', async c => subscribeHandler(c.req.raw)).all('/zapier/unsubscribe', async c => unsubscribeHandler(c.req.raw));
tsRestHonoApp.mount('/', async request => {
  return fetchRequestHandler({
    request,
    contract: ApiContractV1,
    router: ApiContractV1Implementation,
    options: {
      errorHandler: err => {
        if (err instanceof TsRestHttpError && err.statusCode === 500) {
          console.error(err);
        }
      }
    }
  });
});

export { tsRestHonoApp };
//# sourceMappingURL=hono.js.map
