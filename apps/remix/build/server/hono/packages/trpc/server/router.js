import { adminRouter } from './admin-router/router.js';
import { apiTokenRouter } from './api-token-router/router.js';
import { authRouter } from './auth-router/router.js';
import { documentRouter } from './document-router/router.js';
import { embeddingPresignRouter } from './embedding-router/_router.js';
import { enterpriseRouter } from './enterprise-router/router.js';
import { envelopeRouter } from './envelope-router/router.js';
import { fieldRouter } from './field-router/router.js';
import { folderRouter } from './folder-router/router.js';
import { organisationRouter } from './organisation-router/router.js';
import { profileRouter } from './profile-router/router.js';
import { recipientRouter } from './recipient-router/router.js';
import { teamRouter } from './team-router/router.js';
import { templateRouter } from './template-router/router.js';
import { router } from './trpc.js';
import { webhookRouter } from './webhook-router/router.js';

const appRouter = router({
  enterprise: enterpriseRouter,
  envelope: envelopeRouter,
  auth: authRouter,
  profile: profileRouter,
  document: documentRouter,
  field: fieldRouter,
  folder: folderRouter,
  recipient: recipientRouter,
  admin: adminRouter,
  organisation: organisationRouter,
  apiToken: apiTokenRouter,
  team: teamRouter,
  template: templateRouter,
  webhook: webhookRouter,
  embeddingPresign: embeddingPresignRouter
});

export { appRouter };
//# sourceMappingURL=router.js.map
